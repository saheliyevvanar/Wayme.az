"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../Components/Layout/Footer";
import { ArrowLeft, X } from "lucide-react";

export default function PersonalSkillsPage() {
    const router = useRouter();
    const [skills, setSkills] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [easyChoices, setEasyChoices] = useState<string[]>([
        "Problemləri həll etmə", "Kommunikasiya", "Komanda işi",
        "Liderlik", "Analitik düşüncə", "Yaradıcılıq",
        "Təşkilatçılıq", "Təqdimat", "Video montaj",
        "MS Office", "Photoshop", "Sosial media",
        "Phyton", "Dizayn", "Marketinq",
        "Satış", "Mühasibat", "Rus dili",
        "İngilis dili", "Mətn yazma"
    ]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("personalSkills");
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.skills && Array.isArray(data.skills)) {
                    setSkills(data.skills);
                }
            } catch (error) {
                console.error("Error loading from localStorage:", error);
            }
        }
    }, []);

    // Save to localStorage whenever skills change
    useEffect(() => {
        const data = {
            skills,
        };
        localStorage.setItem("personalSkills", JSON.stringify(data));
    }, [skills]);

    const handleAddSkill = () => {
        if (inputValue.trim() && !skills.includes(inputValue.trim())) {
            setSkills([...skills, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    const toggleSkill = (skill: string) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter((s) => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const handleStopTest = () => {
        // Clear all stored data for the test
        localStorage.removeItem("personalInfo");
        localStorage.removeItem("personalSkills");

        // Reset local state for this step
        setSkills([]);
        setInputValue("");
    };

    return (
        <div className="min-h-screen bg-[#091E3E] text-white flex flex-col font-inter selection:bg-blue-500/30">

            <main className="flex-grow flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Background Elements similar to Home page */}
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
                        <span className="text-gray-400 font-medium">Addım 2/4</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2 mb-10 overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                            style={{ width: "50%" }}
                        />
                    </div>

                    <div className="space-y-8">
                        {/* Title & Description */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-2 text-white">Bacarıqlarınız</h2>
                            <p className="text-gray-400 text-sm">
                                Hansı bacarıqlara sahibsiniz? (Minimum 3 bacarıq)
                            </p>
                        </div>

                        {/* Custom Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-300 ml-1">
                                Öz bacarıqlarınızı əlavə edin
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Məsələn: Figma"
                                    className="flex-1 bg-[#152e52] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                />
                                <button
                                    onClick={handleAddSkill}
                                    disabled={!inputValue.trim()}
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold whitespace-nowrap hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                >
                                    +Əlavə et
                                </button>
                            </div>
                        </div>

                        {/* Selected Skills Display (if any) */}
                        {skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                {skills.map((skill) => (
                                    <div key={skill} className="flex items-center gap-2 bg-gradient-to-r from-[#2B7FFF]/20 to-[#AD46FF]/20 border border-blue-400/30 px-4 py-2 rounded-xl">
                                        <span className="text-sm font-medium text-white">{skill}</span>
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            aria-label={`${skill} bacarığını sil`}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Easy Choices */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-300 mb-4 ml-1">Asan seçimlər</h3>
                            <div className="flex flex-wrap gap-3">
                                {easyChoices.filter(choice => !skills.includes(choice)).map((choice) => (
                                    <button
                                        key={choice}
                                        onClick={() => toggleSkill(choice)}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#152e52] border border-white/5 text-gray-400 hover:bg-[#1e3b66] hover:text-white hover:border-white/20 transition-all duration-200"
                                    >
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex gap-4 mt-12 pt-8 border-t border-white/5">
                        <button
                            onClick={() => router.push("/sexsi-melumatlar")}
                            className="p-4 rounded-xl bg-[#152e52] text-white hover:bg-[#1e3b66] transition-colors border border-white/5 group"
                            aria-label="Əvvəlki addım"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </button>
                        <button
                            onClick={() => {
                                if (skills.length >= 3) {
                                    router.push("/is-istiqameti");
                                } else {
                                    alert("Minimum 3 bacarıq seçməlisiniz");
                                }
                            }}
                            disabled={skills.length < 3}
                            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            Növbəti
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
