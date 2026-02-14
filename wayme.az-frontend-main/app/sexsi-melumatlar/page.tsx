"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../Components/Layout/Footer";
import { User, Calendar, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export default function PersonalInfoPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [surnameError, setSurnameError] = useState<string | null>(null);
    const [birthDateError, setBirthDateError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [personalInfoId, setPersonalInfoId] = useState<number | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage on mount (runs before render)
    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem("personalInfo");
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    setName(data.name || "");
                    setSurname(data.surname || "");
                    setBirthDate(data.birthDate || "");
                    if (data.id) {
                        setPersonalInfoId(data.id);
                    }
                    if (data.birthDate) {
                        const [day, month, year] = data.birthDate.split(".");
                        if (day && month && year) {
                            setSelectedDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
                        }
                    }
                } catch (error) {
                    console.error("Error loading from localStorage:", error);
                }
            }
            setIsHydrated(true);
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (isHydrated) {
            const data = {
                id: personalInfoId,
                name,
                surname,
                birthDate,
            };
            localStorage.setItem("personalInfo", JSON.stringify(data));
        }
    }, [name, surname, birthDate, personalInfoId, isHydrated]);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [showCalendar]);

    const handleDateSelect = (day: number) => {
        const date = new Date(calendarYear, calendarMonth, day);
        setSelectedDate(date);
        const formattedDate = `${String(day).padStart(2, "0")}.${String(calendarMonth + 1).padStart(2, "0")}.${calendarYear}`;
        setBirthDate(formattedDate);
        setShowCalendar(false);
    };

    const handlePrevMonth = () => {
        if (calendarMonth === 0) {
            setCalendarMonth(11);
            setCalendarYear(calendarYear - 1);
        } else {
            setCalendarMonth(calendarMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (calendarMonth === 11) {
            setCalendarMonth(0);
            setCalendarYear(calendarYear + 1);
        } else {
            setCalendarMonth(calendarMonth + 1);
        }
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        // Adjust to start week on Monday (0 = Monday, 6 = Sunday)
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const monthNames = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
        "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ];

    const weekDays = ["B", "Ç", "Ç", "C", "C", "Ş", "B"]; // Bazar ertəsi, Çərşənbə axşamı, Çərşənbə, Cümə axşamı, Cümə, Şənbə, Bazar

    // Years for quick selection (you can adjust the range if needed)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 70 }, (_, i) => currentYear - i); // last 70 years

    const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
    const firstDay = getFirstDayOfMonth(calendarMonth, calendarYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    // Validation function for name and surname
    const validateName = (value: string, label: string): string | null => {
        const trimmed = value.trim();
        if (!trimmed) return `${label} boş qala bilməz`;
        if (trimmed.length > 30) return `${label} maksimum 30 simvol ola bilər`;
        // Check for numbers
        if (/\d/.test(trimmed)) return `${label} yalnız hərflər və bir tire (-) daxil edə bilərsiniz`;
        // Check for more than one dash
        const dashCount = (trimmed.match(/-/g) || []).length;
        if (dashCount > 1) return `${label} daxilində yalnız bir tire (-) ola bilər`;
        return null;
    };

    // Deep validation for birth date
    const validateBirthDate = (value: string): string | null => {
        const trimmed = value.trim();
        if (!trimmed) return "Doğum tarixi boş qala bilməz";

        const match = trimmed.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
        if (!match) {
            return "Tarixi gün.ay.il formatında yazın (məs: 05.09.2004)";
        }

        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);

        // Basic range checks
        if (month < 1 || month > 12) {
            return "Ay 01 ilə 12 arasında olmalıdır";
        }

        const daysInThisMonth = getDaysInMonth(month - 1, year);
        if (day < 1 || day > daysInThisMonth) {
            return "Gün seçilmiş aya uyğun deyil";
        }

        const today = new Date();
        const selected = new Date(year, month - 1, day);

        if (selected > today) {
            return "Gələcək tarix seçilə bilməz";
        }

        // Optional age check (14 - 80)
        const age =
            today.getFullYear() -
            year -
            (today.getMonth() < month - 1 ||
                (today.getMonth() === month - 1 && today.getDate() < day)
                ? 1
                : 0);

        if (age < 14) {
            return "Minimum yaş 14 olmalıdır";
        }

        if (age > 80) {
            return "Maksimum yaş 80 olmalıdır";
        }

        return null;
    };

    // Handle name input with validation and auto-capitalize first letter
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove numbers
        value = value.replace(/\d/g, '');

        // Prevent more than one dash
        const dashCount = (value.match(/-/g) || []).length;
        if (dashCount > 1) {
            // Keep only the first dash
            const firstDashIndex = value.indexOf('-');
            if (firstDashIndex !== -1) {
                value = value.substring(0, firstDashIndex + 1) + value.substring(firstDashIndex + 1).replace(/-/g, '');
            }
        }

        // Limit to 30 characters
        if (value.length > 30) {
            value = value.substring(0, 30);
        }

        // Auto-capitalize first letter
        if (value.length > 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }

        setName(value);
        setNameError(validateName(value, "Ad"));
    };

    // Handle surname input with validation and auto-capitalize first letter
    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove numbers
        value = value.replace(/\d/g, '');

        // Prevent more than one dash
        const dashCount = (value.match(/-/g) || []).length;
        if (dashCount > 1) {
            // Keep only the first dash
            const firstDashIndex = value.indexOf('-');
            if (firstDashIndex !== -1) {
                value = value.substring(0, firstDashIndex + 1) + value.substring(firstDashIndex + 1).replace(/-/g, '');
            }
        }

        // Limit to 30 characters
        if (value.length > 30) {
            value = value.substring(0, 30);
        }

        // Auto-capitalize first letter
        if (value.length > 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }

        setSurname(value);
        setSurnameError(validateName(value, "Soyad"));
    };

    // API call to save personal info
    const savePersonalInfo = async () => {
        const requestData = {
            name: name.trim(),
            surname: surname.trim(),
            birthDate: birthDate.trim(),
        };

        try {
            let response;
            if (personalInfoId) {
                // Update existing record
                response = await fetch(`${API_BASE_URL}/personal-info/${personalInfoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });
            } else {
                // Create new record
                response = await fetch(`${API_BASE_URL}/personal-info`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Xəta baş verdi");
            }

            const data = await response.json();
            setPersonalInfoId(data.id);
            
            // Update localStorage with the new ID
            const savedData = {
                id: data.id,
                name: data.name,
                surname: data.surname,
                birthDate: data.birthDateFormatted,
            };
            localStorage.setItem("personalInfo", JSON.stringify(savedData));

            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Serverə qoşulmaq mümkün olmadı");
        }
    };

    const handleNext = async () => {
        let hasError = false;
        setApiError(null);

        // Validate name
        const nameValidationError = validateName(name, "Ad");
        if (nameValidationError) {
            setNameError(nameValidationError);
            hasError = true;
        } else {
            setNameError(null);
        }

        // Validate surname
        const surnameValidationError = validateName(surname, "Soyad");
        if (surnameValidationError) {
            setSurnameError(surnameValidationError);
            hasError = true;
        } else {
            setSurnameError(null);
        }

        // Validate birth date
        const birthValidationError = validateBirthDate(birthDate);
        if (birthValidationError) {
            setBirthDateError(birthValidationError);
            hasError = true;
        } else {
            setBirthDateError(null);
        }

        if (!hasError) {
            setIsLoading(true);
            try {
                await savePersonalInfo();
                router.push("/sexsi-bacariqlar");
            } catch (error) {
                if (error instanceof Error) {
                    setApiError(error.message);
                } else {
                    setApiError("Xəta baş verdi");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const isFormValid =
        !nameError &&
        !surnameError &&
        !birthDateError &&
        !!name.trim() &&
        !!surname.trim() &&
        !!birthDate.trim();

    const isToday = (day: number | null) => {
        if (day === null) return false;
        const today = new Date();
        return (
            day === today.getDate() &&
            calendarMonth === today.getMonth() &&
            calendarYear === today.getFullYear()
        );
    };

    const isSelected = (day: number | null) => {
        if (day === null || !selectedDate) return false;
        return (
            day === selectedDate.getDate() &&
            calendarMonth === selectedDate.getMonth() &&
            calendarYear === selectedDate.getFullYear()
        );
    };

    return (
        <div className="min-h-screen bg-[#091E3E] text-white flex flex-col font-inter selection:bg-blue-500/30">
            <main className="flex-grow flex items-center justify-center py-12 px-4 relative">
                {/* Background Elements */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />
                    <div className="absolute -right-[10%] bottom-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow" />
                </div>

                <div className="w-full max-w-[800px] z-10 glass-card rounded-[32px] p-8 md:p-12 relative border border-white/10 shadow-2xl bg-[#102A4D]/40 backdrop-blur-xl">
                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            İş istiqamətinin müəyyən edilməsi
                        </h1>
                        <span className="text-gray-400 font-medium">Addım 1/6</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2 mb-10 overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                            style={{ width: "16.67%" }}
                        />
                    </div>

                    <div className="space-y-8">
                        {/* Title & Description */}
                        <div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold mb-2 text-white">Şəxsi məlumatlar</h2>
                                {(nameError || surnameError || birthDateError) && (
                                    <span className="text-xs text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                                        {[nameError, surnameError, birthDateError].filter(Boolean).length} xəta
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-400 text-sm">
                                Zəhmət olmasa məlumatlarınızı düzgün daxil edin
                            </p>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-6">
                            {/* Ad (Name) Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">Ad</label>
                                {nameError && (
                                    <p className="text-xs text-red-400 ml-1">{nameError}</p>
                                )}
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder="Məsələn: Əbülfəz"
                                        className={`w-full bg-[#152e52] border rounded-2xl pl-14 pr-12 py-4 text-white placeholder:text-gray-600 focus:outline-none transition-all font-medium ${nameError
                                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                            : "border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                            }`}
                                    />
                                    {name && (
                                        <button
                                            onClick={() => {
                                                setName("");
                                                setNameError(null);
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                            aria-label="Adı sil"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 ml-1 mt-1">0-30 simvol, yalnız hərflər və tire</p>
                            </div>

                            {/* Soyad (Surname) Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">Soyad</label>
                                {surnameError && (
                                    <p className="text-xs text-red-400 ml-1">{surnameError}</p>
                                )}
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={surname}
                                        onChange={handleSurnameChange}
                                        placeholder="Məsələn: İskəndərov"
                                        className={`w-full bg-[#152e52] border rounded-2xl pl-14 pr-12 py-4 text-white placeholder:text-gray-600 focus:outline-none transition-all font-medium ${surnameError
                                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                            : "border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                            }`}
                                    />
                                    {surname && (
                                        <button
                                            onClick={() => {
                                                setSurname("");
                                                setSurnameError(null);
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                            aria-label="Soyadı sil"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 ml-1 mt-1">0-30 simvol, yalnız hərflər və tire</p>
                            </div>

                            {/* Doğum tarixi (Date of Birth) Input */}
                            <div className="space-y-1 relative">
                                <label className="text-sm font-medium text-gray-300 ml-1">Doğum tarixi</label>
                                {birthDateError && (
                                    <p className="text-xs text-red-400 ml-1">{birthDateError}</p>
                                )}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowCalendar((prev) => !prev)}
                                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                        aria-label="Tarix seçicisini aç"
                                    >
                                        <Calendar size={20} />
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={birthDate}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBirthDate(value);
                                            setBirthDateError(validateBirthDate(value));
                                        }}
                                        placeholder="gün.ay.il"
                                        className={`w-full bg-[#152e52] border rounded-2xl pl-14 pr-5 py-4 text-white placeholder:text-gray-600 focus:outline-none transition-all font-medium ${birthDateError
                                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                            : "border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                                            }`}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 ml-1 mt-1">dd.MM.yyyy formatında (məs: 15.03.1995)</p>

                                {/* Custom Calendar Picker */}
                                {showCalendar && (
                                    <div
                                        ref={calendarRef}
                                        className="absolute top-full left-0 mt-2 w-[280px] sm:w-[320px] bg-[#152e52] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-xl"
                                    >
                                        {/* Calendar Header */}
                                        <div className="flex items-center justify-between mb-3 gap-2">
                                            <button
                                                onClick={handlePrevMonth}
                                                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white flex-shrink-0"
                                                aria-label="Əvvəlki ay"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>

                                            <div className="flex-1 flex items-center justify-center gap-2">
                                                {/* Month select for quick jump */}
                                                <select
                                                    aria-label="Ay seçin"
                                                    value={calendarMonth}
                                                    onChange={(e) => setCalendarMonth(Number(e.target.value))}
                                                    className="bg-[#102241] border border-white/10 rounded-xl px-2 py-1 text-xs sm:text-sm text-gray-100 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 cursor-pointer"
                                                >
                                                    {monthNames.map((month, index) => (
                                                        <option key={month} value={index}>
                                                            {month}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Year select for easy year navigation */}
                                                <select
                                                    aria-label="İl seçin"
                                                    value={calendarYear}
                                                    onChange={(e) => setCalendarYear(Number(e.target.value))}
                                                    className="bg-[#102241] border border-white/10 rounded-xl px-2 py-1 text-xs sm:text-sm text-gray-100 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 cursor-pointer"
                                                >
                                                    {years.map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <button
                                                onClick={handleNextMonth}
                                                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white flex-shrink-0"
                                                aria-label="Növbəti ay"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>

                                        {/* Week Days Header */}
                                        <div className="grid grid-cols-7 gap-1.5 mb-3">
                                            {weekDays.map((day, index) => (
                                                <div
                                                    key={index}
                                                    className="text-center text-[11px] sm:text-xs font-medium text-gray-400 py-1"
                                                >
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Calendar Days */}
                                        <div className="grid grid-cols-7 gap-1.5">
                                            {days.map((day, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => day !== null && handleDateSelect(day)}
                                                    disabled={day === null}
                                                    className={`
                                                        aspect-square rounded-lg text-xs sm:text-sm font-medium transition-all
                                                        ${day === null
                                                            ? "cursor-default"
                                                            : isSelected(day)
                                                                ? "bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white shadow-lg"
                                                                : isToday(day)
                                                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                                                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                                        }
                                                    `}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* API Error Message */}
                    {apiError && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                            <p className="text-red-400 text-sm text-center">{apiError}</p>
                        </div>
                    )}

                    {/* Footer Navigation */}
                    <div className="flex gap-4 mt-12 pt-8 border-t border-white/5">
                        <button
                            onClick={handleNext}
                            disabled={!isFormValid || isLoading}
                            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Yüklənir...
                                </>
                            ) : (
                                "Növbəti"
                            )}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
