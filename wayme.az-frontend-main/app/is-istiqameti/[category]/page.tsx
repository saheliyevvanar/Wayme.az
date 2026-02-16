"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../../Components/Layout/Footer";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { professions } from "../professionsData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://waymeaz-production.up.railway.app/api";

// Map icon string names to lucide-react components
import {
    Code2,
    Database,
    BarChart3,
    Megaphone,
    Brush,
    ShieldCheck,
    Users,
    PenLine,
    Briefcase
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    Code2,
    Database,
    BarChart3,
    Megaphone,
    Brush,
    ShieldCheck,
    Users,
    PenLine,
    Briefcase
};

export default function SubCategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const router = useRouter();

    // In Next.js 15, params is a Promise. We need to unwrap it.
    const { category } = React.use(params);
    const categoryId = category;
    const categoryData = professions.find(p => p.id === categoryId);



    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // If category not found, maybe redirect
    useEffect(() => {
        if (!categoryData) {
            router.replace("/is-istiqameti");
        }
    }, [categoryData, router]);

    // Load from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem("careerDirection");
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.subCategory && data.category === categoryId) {
                    setSelectedSubCategory(data.subCategory);
                }
            } catch (error) {
                console.error("Error loading from localStorage:", error);
            }
        }
    }, [categoryId]);

    // Save to localStorage
    useEffect(() => {
        if (selectedSubCategory) {
            // Update storage while preserving category
            const existing = localStorage.getItem("careerDirection");
            let data = existing ? JSON.parse(existing) : {};
            data.subCategory = selectedSubCategory;
            data.category = categoryId; // Ensure consistency
            localStorage.setItem("careerDirection", JSON.stringify(data));
        }
    }, [selectedSubCategory, categoryId]);


    const handleSelect = (id: string) => {
        if (selectedSubCategory === id) {
            setSelectedSubCategory(null);
            // Optionally clear subCategory from storage but keep category
        } else {
            setSelectedSubCategory(id);
        }
    };

    const handleNext = async () => {
        setIsSaving(true);
        
        try {
            // Get personalInfoId from localStorage
            const personalInfoData = localStorage.getItem("personalInfo");
            const personalInfoId = personalInfoData ? JSON.parse(personalInfoData).id : null;

            if (personalInfoId && selectedSubCategory) {
                // Save career direction to backend
                const response = await fetch(`${API_BASE_URL}/career-directions/save`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        personalInfoId: personalInfoId,
                        directionId: categoryId,
                        subCategoryId: selectedSubCategory
                    }),
                });

                if (!response.ok) {
                    console.error("Failed to save career direction");
                }
            }

            // Save to localStorage for later use
            localStorage.setItem("careerDirection", JSON.stringify({
                category: categoryId,
                subCategory: selectedSubCategory
            }));

            router.push("/test");
        } catch (error) {
            console.error("Error saving career direction:", error);
            // Still navigate even if save fails
            router.push("/test");
        } finally {
            setIsSaving(false);
        }
    };

    if (!categoryData) return null; // Avoid rendering if invalid

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
                            style={{ width: "85%" }}
                        />
                    </div>

                    <div className="space-y-6">
                        {/* Instruction Text */}
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-white">
                                {categoryData.title}: Alt istiqaməti seçin
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {categoryData.description} üzrə konkret sahəni seçə bilərsiniz
                            </p>
                        </div>

                        {/* Directions Grid - Sub Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categoryData.subCategories.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelect(item.id)}
                                    className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group text-left overflow-hidden
                                        ${selectedSubCategory === item.id
                                            ? `${categoryData.bg} ${categoryData.border} shadow-[0_0_15px_rgba(59,130,246,0.2)] ring-1 ring-white/10 scale-[1.01]`
                                            : 'bg-[#152e52]/40 border-white/5 hover:bg-[#1e3b66] hover:border-white/20'
                                        }`}
                                >
                                    {/* Icon Box */}
                                    <div className={`p-3 rounded-xl ${categoryData.bg} ${categoryData.border} border shadow-lg shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                        {(() => {
                                            const Icon = iconMap[item.icon];
                                            return Icon ? <Icon className={`w-6 h-6 ${categoryData.color}`} /> : null;
                                        })()}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-bold text-base leading-tight mb-1 truncate ${selectedSubCategory === item.id ? 'text-white' : 'text-gray-100'}`}>
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 font-medium truncate">
                                            {item.skills}
                                        </p>
                                    </div>

                                    {/* Selection Checkmark */}
                                    {selectedSubCategory === item.id && (
                                        <div className="absolute top-3 right-3 text-white animate-in fade-in zoom-in duration-200">
                                            <div className={`rounded-full p-1 bg-white/20`}>
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-white/5 mt-8">
                            <button
                                onClick={() => router.back()}
                                className="h-[60px] w-[60px] rounded-2xl bg-[#152e52] text-white hover:bg-[#1e3b66] transition-colors border border-white/10 flex items-center justify-center group shrink-0"
                                aria-label="Əvvəlki addım"
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
                                ) : selectedSubCategory ? "Seçilmiş istiqamətlə testə başla" : "Seçmədən testə başla"}
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
