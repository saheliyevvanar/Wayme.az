"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../Components/Layout/Footer";
import { ArrowLeft, Check, Code2, BarChart3, Megaphone, Brush, Briefcase, TrendingUp, ShieldAlert, BookOpen, Database, ShieldCheck, Users, PenLine, Loader2 } from "lucide-react";
import { professions } from "./professionsData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://waymeaz-production.up.railway.app/api";

interface CareerDirection {
    id: number;
    directionId: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    bg: string;
    border: string;
    subCategories?: CareerSubCategory[];
}

interface CareerSubCategory {
    id: number;
    subCategoryId: string;
    title: string;
    skills: string;
    description: string;
    icon: string;
}

export default function CareerDirectionPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
    const [view, setView] = useState<'categories' | 'subcategories'>('categories');
    const [careerDirections, setCareerDirections] = useState<CareerDirection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch career directions from backend
    useEffect(() => {
        const fetchCareerDirections = async () => {
            try {
                setLoading(true);
                
                // Always use local data for speed - backend is too slow
                // Convert id to directionId for main, id to subCategoryId for subs
                const convertedData = professions.map((prof: any) => ({
                    ...prof,
                    directionId: prof.id,
                    id: undefined,
                    subCategories: prof.subCategories?.map((sub: any) => ({
                        ...sub,
                        subCategoryId: sub.id,
                        id: undefined
                    }))
                })) as CareerDirection[];
                setCareerDirections(convertedData);
                setError(null);
            } catch (err) {
                console.error("Error loading career directions:", err);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCareerDirections();
    }, []);

    // Load from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("careerDirection");
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.category) {
                    setSelectedCategory(data.category);
                }
                if (data.subCategory) {
                    setSelectedSubCategory(data.subCategory);
                }
            } catch (error) {
                console.error("Error loading from localStorage:", error);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        const data = {
            category: selectedCategory,
            subCategory: selectedSubCategory
        };
        if (selectedCategory) {
            localStorage.setItem("careerDirection", JSON.stringify(data));
        } else {
            localStorage.removeItem("careerDirection");
        }
    }, [selectedCategory, selectedSubCategory]);

    const handleCategorySelect = (id: string) => {
        setSelectedCategory(id);
        setSelectedSubCategory(null); // Reset sub when category changes
        // Navigate to dynamic route
        router.push(`/is-istiqameti/${id}`);
    };

    const handleSubCategorySelect = (id: string) => {
        if (selectedSubCategory === id) {
            setSelectedSubCategory(null);
        } else {
            setSelectedSubCategory(id);
        }
    };

    const handleBack = () => {
        if (view === 'subcategories') {
            setView('categories');
            setSelectedCategory(null);
            setSelectedSubCategory(null);
        } else {
            router.back();
        }
    };

    const [isSaving, setIsSaving] = useState(false);

    const saveCareerDirection = async () => {
        const personalInfoData = localStorage.getItem("personalInfo");
        const personalInfoId = personalInfoData ? JSON.parse(personalInfoData).id : null;

        if (!personalInfoId) {
            console.log("No personalInfoId found, skipping save");
            return;
        }

        try {
            const requestBody = {
                personalInfoId: personalInfoId,
                directionId: selectedCategory,
                subCategoryId: selectedSubCategory || null
            };
            console.log("Saving career direction:", requestBody);

            const response = await fetch(`${API_BASE_URL}/career-directions/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to save career direction:", errorText);
            } else {
                const data = await response.json();
                console.log("Career direction saved successfully:", data);
            }
        } catch (error) {
            console.error("Error saving career direction:", error);
        }
    };

    const handleNext = async () => {
        if (view === 'categories') {
            if (selectedCategory) {
                // Save to localStorage
                localStorage.setItem("careerDirection", JSON.stringify({
                    category: selectedCategory,
                    subCategory: selectedSubCategory
                }));
                setView('subcategories');
            } else {
                router.push("/test");
            }
        } else {
            // In subcategories view - save to backend and navigate
            setIsSaving(true);
            try {
                await saveCareerDirection();
            } finally {
                setIsSaving(false);
            }
            router.push("/test");
        }
    };

    // Get current category data for subcategories view
    const currentCategoryData = careerDirections.find(p => p.directionId === selectedCategory);

    // Icon mapper
    const getIcon = (iconName: string) => {
        const iconMap: Record<string, React.ReactNode> = {
            'Code2': <Code2 className="w-6 h-6" />,
            'Database': <Database className="w-6 h-6" />,
            'BarChart3': <BarChart3 className="w-6 h-6" />,
            'Megaphone': <Megaphone className="w-6 h-6" />,
            'Brush': <Brush className="w-6 h-6" />,
            'Briefcase': <Briefcase className="w-6 h-6" />,
            'TrendingUp': <TrendingUp className="w-6 h-6" />,
            'ShieldAlert': <ShieldAlert className="w-6 h-6" />,
            'BookOpen': <BookOpen className="w-6 h-6" />,
            'ShieldCheck': <ShieldCheck className="w-6 h-6" />,
            'Users': <Users className="w-6 h-6" />,
            'PenLine': <PenLine className="w-6 h-6" />,
        };
        return iconMap[iconName] || <Code2 className="w-6 h-6" />;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#091E3E] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">Yüklənir...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#091E3E] text-white flex flex-col font-inter selection:bg-blue-500/30">

            <main className="flex-grow flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />
                    <div className="absolute -right-[10%] bottom-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow" />
                </div>

                <div className="w-full max-w-[1000px] z-10 glass-card rounded-[32px] p-6 md:p-10 relative border border-white/10 shadow-2xl bg-[#102A4D]/40 backdrop-blur-xl">

                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            İş istiqamətinin müəyyən edilməsi
                        </h1>
                        <span className="text-gray-400 font-medium whitespace-nowrap">Addım 3/4</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#1e3b66] rounded-full h-2 mb-8 overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{ width: view === 'categories' ? "75%" : "85%" }}
                        />
                    </div>

                    <div className="space-y-6">
                        {/* Instruction Text */}
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-white">
                                {view === 'categories' ? 'İstiqaməti seçin (məcburi deyil)' : `${currentCategoryData?.title || 'İstiqamət'}: Alt istiqaməti seçin`}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {view === 'categories'
                                    ? 'Sizi maraqlandıran iş istiqamətini seçə bilərsiniz vəya keçə bilərsiniz'
                                    : `${currentCategoryData?.description || ''} üzrə konkret sahəni seçə bilərsiniz`
                                }
                            </p>
                        </div>

                        {/* Content Grid */}
                        <div className={`grid grid-cols-1 ${view === 'categories' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                            {view === 'categories' ? (
                                // Main Categories
                                careerDirections.map((item) => (
                                    <button
                                        key={item.directionId}
                                        onClick={() => handleCategorySelect(item.directionId)}
                                        className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group text-left
                                            ${selectedCategory === item.directionId
                                                ? `${item.bg} ${item.border} shadow-[0_0_15px_rgba(59,130,246,0.2)] ring-1 ring-white/10 scale-[1.02]`
                                                : 'bg-[#152e52]/40 border-white/5 hover:bg-[#1e3b66] hover:border-white/20'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl ${item.bg} ${item.border} border shadow-lg shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                            <div className={item.color}>
                                                {getIcon(item.icon)}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-bold text-base leading-tight mb-1 truncate ${selectedCategory === item.directionId ? 'text-white' : 'text-gray-100'}`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-medium truncate">
                                                {item.description}
                                            </p>
                                        </div>

                                        {selectedCategory === item.directionId && (
                                            <div className="absolute top-3 right-3 text-white animate-in fade-in zoom-in duration-200">
                                                <div className={`rounded-full p-1 ${item.bg}`}>
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))
                            ) : (
                                // Sub Categories
                                currentCategoryData?.subCategories?.map((item) => (
                                    <button
                                        key={item.subCategoryId}
                                        onClick={() => handleSubCategorySelect(item.subCategoryId)}
                                        className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group text-left overflow-hidden
                                            ${selectedSubCategory === item.subCategoryId
                                                ? `${currentCategoryData.bg} ${currentCategoryData.border} shadow-[0_0_15px_rgba(59,130,246,0.2)] ring-1 ring-white/10 scale-[1.01]`
                                                : 'bg-[#152e52]/40 border-white/5 hover:bg-[#1e3b66] hover:border-white/20'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl ${currentCategoryData.bg} ${currentCategoryData.border} border shadow-lg shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                            <div className={currentCategoryData.color}>
                                                {getIcon(item.icon)}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-bold text-base leading-tight mb-1 truncate ${selectedSubCategory === item.subCategoryId ? 'text-white' : 'text-gray-100'}`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-medium truncate">
                                                {item.skills}
                                            </p>
                                        </div>

                                        {selectedSubCategory === item.subCategoryId && (
                                            <div className="absolute top-3 right-3 text-white animate-in fade-in zoom-in duration-200">
                                                <div className={`rounded-full p-1 bg-white/20`}>
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-white/5 mt-8">
                            <button
                                onClick={handleBack}
                                className="h-[60px] w-[60px] rounded-2xl bg-[#152e52] text-white hover:bg-[#1e3b66] transition-colors border border-white/10 flex items-center justify-center group shrink-0"
                                aria-label="Geri"
                            >
                                <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={isSaving}
                                className="flex-1 h-[60px] rounded-2xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Saxlanılır...
                                    </>
                                ) : view === 'categories'
                                    ? (selectedCategory ? "Davam et" : "Seçmədən testə başla")
                                    : (selectedSubCategory ? "Seçilmiş istiqamətlə testə başla" : "Seçmədən testə başla")
                                }
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
