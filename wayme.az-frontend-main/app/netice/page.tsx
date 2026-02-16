"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../../Components/Layout/Footer'
import {
    Award,
    Code2,
    Database,
    Palette,
    ArrowLeft,
    Share2,
    Download
} from 'lucide-react'

export default function ResultPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate analyzing process
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#091E3E] flex flex-col items-center justify-center text-white relative overflow-hidden font-inter">
                {/* Background Gradients */}
                <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />
                <div className="absolute -right-[10%] bottom-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow" />

                <div className="z-10 flex flex-col items-center gap-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">Nəticələr hazırlanır...</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#091E3E] text-white flex flex-col font-inter selection:bg-blue-500/30">

            <main className="flex-grow flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />
                    <div className="absolute -right-[10%] bottom-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow" />
                </div>

                <div className="w-full max-w-[800px] z-10 space-y-6 animate-in fade-in duration-700 slide-in-from-bottom-4">

                    <div className="glass-card rounded-[32px] p-6 md:p-10 border border-white/10 shadow-2xl bg-[#102A4D]/40 backdrop-blur-xl">

                        {/* Title Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <Award className="text-yellow-400 w-8 h-8" />
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    Nəticələriniz
                                </h1>
                            </div>
                            <p className="text-gray-400 text-base md:text-lg">
                                Sizin üçün ən uyğun karyera istiqamətləri
                            </p>
                        </div>

                        {/* Results List */}
                        <div className="bg-[#152e52]/50 rounded-2xl p-6 border border-white/5 mb-6">
                            <h2 className="text-xl font-bold text-white mb-4">Testin nəticəsi</h2>
                            <div className="space-y-4">
                                {/* Result 1 */}
                                <div className="bg-[#0B1D36] p-4 rounded-xl flex items-center justify-between group hover:border-white/10 border border-transparent transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold shrink-0">
                                            1
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                                                <Palette size={20} />
                                            </div>
                                            <span className="font-bold text-lg">UX/UI Dizayn</span>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-white">60%</span>
                                </div>

                                {/* Result 2 */}
                                <div className="bg-[#0B1D36] p-4 rounded-xl flex items-center justify-between group hover:border-white/10 border border-transparent transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-400/20 flex items-center justify-center text-gray-400 font-bold shrink-0">
                                            2
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                                <Code2 size={20} />
                                            </div>
                                            <span className="font-bold text-lg">Frontend Developer</span>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-white">40%</span>
                                </div>

                                {/* Result 3 */}
                                <div className="bg-[#0B1D36] p-4 rounded-xl flex items-center justify-between group hover:border-white/10 border border-transparent transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-600/20 flex items-center justify-center text-orange-600 font-bold shrink-0">
                                            3
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                                                <Database size={20} />
                                            </div>
                                            <span className="font-bold text-lg">Backend Developer</span>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-white">20%</span>
                                </div>
                            </div>
                        </div>

                        {/* Skill Compatibility */}
                        <div className="bg-[#152e52]/50 rounded-2xl p-6 border border-white/5 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-white text-lg">UX/UI üçün bacarıq uyğunluğu</h3>
                                <span className="text-white font-bold">40%</span>
                            </div>
                            <div className="w-full bg-[#0B1D36] rounded-full h-2.5 mb-6 overflow-hidden">
                                <div className="h-full bg-white rounded-full w-[40%]" />
                            </div>

                            <div className="bg-[#0B1D36] p-4 rounded-xl">
                                <h4 className="font-bold text-white mb-3">Çatışmayan bacarıqlar</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["Wireframing", "UX prinsipləri", "Kreativlik"].map((skill, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-[#152e52] text-gray-300 text-sm font-medium border border-white/5">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="bg-[#152e52]/50 rounded-2xl p-6 border border-white/5 mb-8">
                            <h2 className="text-xl font-bold text-white mb-4">Tövsiyyə olunan resurslar</h2>
                            <div className="space-y-3">
                                <div className="bg-[#0B1D36] p-4 rounded-xl">
                                    <h3 className="font-bold text-white mb-2">Online kurslar</h3>
                                    <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc">
                                        <li>Kurs adı - <a href="#" className="text-blue-400 hover:underline">Link</a></li>
                                        <li>Kurs adı - <a href="#" className="text-blue-400 hover:underline">Link</a></li>
                                    </ul>
                                </div>
                                <div className="bg-[#0B1D36] p-4 rounded-xl">
                                    <h3 className="font-bold text-white mb-2">Youtube kanalları</h3>
                                    <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc">
                                        <li>Kanal adı - <a href="#" className="text-blue-400 hover:underline">Link</a></li>
                                        <li>Kanal adı - <a href="#" className="text-blue-400 hover:underline">Link</a></li>
                                    </ul>
                                </div>
                                <div className="bg-[#0B1D36] p-4 rounded-xl">
                                    <h3 className="font-bold text-white mb-2">Kitab tövsiyyələri</h3>
                                    <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc">
                                        <li>Kitab adı - <a href="#" className="text-blue-400 hover:underline">Link</a></li>
                                        <li>Kitab adı - <a href="#" className="text-blue-400 hover:underline">Link</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => router.back()}
                                className="h-[56px] w-[64px] rounded-xl bg-[#152e52] text-white hover:bg-[#1e3b66] transition-colors border border-white/10 flex items-center justify-center shrink-0"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => router.push('/pdf-hesabat')}
                                className="flex-1 h-[56px] rounded-xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center"
                            >
                                PDF hesabat almaq
                            </button>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
