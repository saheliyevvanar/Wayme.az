"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../Components/Layout/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { questions } from "./questions";

const QUESTIONS_PER_PAGE = 5;

export default function TestPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    // Derived state
    const totalQuestions = questions.length;
    const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    const isLastPage = currentPage === totalPages - 1;

    // Check if all questions on current page are answered
    const isCurrentPageComplete = currentQuestions.every(q => answers[q.id]);

    // Load answers from localStorage on mount (optional, good for UX if user refreshes)
    useEffect(() => {
        const savedAnswers = localStorage.getItem("testAnswers");
        if (savedAnswers) {
            try {
                setAnswers(JSON.parse(savedAnswers));
            } catch (e) {
                console.error("Error parsing test answers", e);
            }
        }
    }, []);

    // Save answers to localStorage
    useEffect(() => {
        if (Object.keys(answers).length > 0) {
            localStorage.setItem("testAnswers", JSON.stringify(answers));
        }
    }, [answers]);

    const handleOptionSelect = (questionId: number, optionId: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleNext = () => {
        if (isLastPage) {
            // Submit test / Go to results
            // In a real app, we would send 'answers' to an API here.
            // For now, we simulate success and go to the results page.
            router.push("/netice");
        } else {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo(0, 0);
        } else {
            router.back();
        }
    };

    const nextButtonText = isLastPage
        ? "Nəticəyə bax"
        : `Sual ${Math.min((currentPage + 1) * QUESTIONS_PER_PAGE + 1, totalQuestions)}-${Math.min((currentPage + 2) * QUESTIONS_PER_PAGE, totalQuestions)}`;

    return (
        <div className="min-h-screen bg-[#091E3E] text-white flex flex-col font-inter selection:bg-blue-500/30">

            <main className="flex-grow flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />
                    <div className="absolute -right-[10%] bottom-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow" />
                </div>

                <div className="w-full max-w-[800px] z-10 glass-card rounded-[32px] p-6 md:p-8 relative border border-white/10 shadow-2xl bg-[#102A4D]/40 backdrop-blur-xl">

                    {/* Step Indicator Header */}
                    <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-white">
                            İş istiqamətinin müəyyən edilməsi
                        </h1>
                        <span className="text-gray-400 font-medium whitespace-nowrap text-sm">Addım 4/4</span>
                    </div>

                    {/* Progress Bar (Overall Test Progress) */}
                    <div className="w-full bg-[#1e3b66] rounded-full h-2 mb-8 overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{ width: `${((Object.keys(answers).length) / totalQuestions) * 100}%` }}
                        />
                    </div>

                    {/* Test Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-white">Karyera Testi ({totalQuestions} sual)</h2>
                            <p className="text-sm text-gray-400">Hər suala ən uyğun cavabı seçin</p>
                        </div>
                        <div className="bg-[#152e52] px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-gray-300">
                            Sual {startIndex + 1}-{Math.min(startIndex + QUESTIONS_PER_PAGE, totalQuestions)}
                        </div>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-6">
                        {currentQuestions.map((q, index) => (
                            <div key={q.id} className="bg-[#152e52]/40 rounded-xl p-4 border border-white/5">
                                <h3 className="text-base font-semibold text-white mb-3">
                                    {q.id}. {q.question}
                                </h3>

                                <div className="space-y-3">
                                    {q.options.map((opt) => {
                                        const isSelected = answers[q.id] === opt.id;
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleOptionSelect(q.id, opt.id)}
                                                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center gap-3
                                                    ${isSelected
                                                        ? 'bg-[#1e3b66] border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                                                        : 'bg-[#0B1D36]/50 border-white/5 hover:bg-[#152e52] hover:border-white/20'
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors
                                                    ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-500'}`}>
                                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                </div>
                                                <span className={`text-xs md:text-sm ${isSelected ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                    {opt.text}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-white/5 mt-8">
                        <button
                            onClick={handleBack}
                            className="h-[56px] w-[56px] rounded-xl bg-[#152e52] text-white hover:bg-[#1e3b66] transition-colors border border-white/10 flex items-center justify-center group shrink-0"
                            aria-label="Geri"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!isCurrentPageComplete}
                            className="flex-1 h-[56px] rounded-xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            {nextButtonText}
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
