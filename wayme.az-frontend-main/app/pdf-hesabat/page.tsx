"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../../Components/Layout/Footer'
import { ArrowLeft, User, Info } from 'lucide-react'

export default function PdfReportPage() {
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        alert("Sorğunuz qəbul edildi! PDF hesabat qısa zamanda email ünvanınıza göndəriləcək.")
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-[#091E3E] text-white flex flex-col font-inter selection:bg-blue-500/30">

            <main className="flex-grow flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />
                    <div className="absolute -right-[10%] bottom-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow" />
                </div>

                <div className="w-full max-w-[600px] z-10 animate-in fade-in duration-700 slide-in-from-bottom-4">
                    <div className="glass-card rounded-[32px] p-6 md:p-10 border border-white/10 shadow-2xl bg-[#102A4D]/40 backdrop-blur-xl relative overflow-hidden">

                        {/* Decorative Top Gradient Border (optional, matching style) */}
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>

                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                PDF hesabat alımı
                            </h1>
                            <p className="text-gray-400">
                                PDF formatında ətraflı hesabat almaq üçün email ünvanınızı daxil edin
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="bg-[#153e75]/60 border border-blue-400/30 rounded-xl p-4 flex gap-3 mb-8">
                            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-200 leading-relaxed">
                                Sizə nəticələrinizin ətraflı təhlili, inkişaf tövsiyyələri və fərdi öyrənmə planı olan PDF fayl göndərəcəyik
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
                                    Email ünvanı
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="user@email.com"
                                        className="w-full bg-[#152e52]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#1e3b66]/50 transition-all font-medium"
                                        required
                                    />
                                </div>

                                {/* PDF Download Link */}
                                <div className="flex justify-center pt-2">
                                    <button type="button" className="text-sm font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
                                        PDF yüklə
                                    </button>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-white/5 mt-8">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="h-[56px] w-[64px] rounded-xl bg-[#152e52] text-white hover:bg-[#1e3b66] transition-colors border border-white/10 flex items-center justify-center shrink-0"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 h-[56px] rounded-xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center"
                                >
                                    Mailə göndər
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
