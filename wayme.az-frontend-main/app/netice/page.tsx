"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '../../Components/Layout/Footer'
import {
    Award,
    Code2,
    Database,
    Palette,
    ArrowLeft,
    Share2,
    Download,
    FileDown,
    X
} from 'lucide-react'

interface CareerAnalysis {
    primaryCareerField: {
        name: string
        matchPercentage: number
        description: string
    }
    topCareerFields: Array<{
        rank: number
        name: string
        matchPercentage: number
        reason: string
    }>
    strengths: string[]
    areasToImprove: string[]
    recommendedSkills: Array<{
        skill: string
        importance: string
        description: string
    }>
    suggestedJobRoles: Array<{
        title: string
        description: string
        salaryRange: string
        demandLevel: string
    }>
}

export default function ResultPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        // Load analysis from localStorage
        const savedAnalysis = localStorage.getItem("careerAnalysis")
        const savedPdfUrl = localStorage.getItem("pdfUrl")
        
        if (savedAnalysis) {
            try {
                const analysisData = JSON.parse(savedAnalysis)
                setAnalysis(analysisData.data?.analysis || analysisData)
                setPdfUrl(savedPdfUrl || analysisData.data?.pdfUrl)
            } catch (e) {
                console.error("Error parsing analysis", e)
            }
        }
        
        // Simulate analyzing process
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const handleDownloadPdf = async () => {
        if (!pdfUrl) return
        
        setIsDownloading(true)
        try {
            const link = document.createElement('a')
            link.href = pdfUrl
            link.download = 'career-report.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error("Error downloading PDF:", error)
            alert("PDF yüklənərkən xəta baş verdi")
        } finally {
            setIsDownloading(false)
        }
    }

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

                {/* Left Navigation Button */}
                <Link href="/">
                    <button className='absolute left-6 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-transparent relative overflow-hidden group cursor-pointer'>
                        <span className='absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A]'>
                            <span className='flex h-full w-full rounded-xl bg-[#091E3E]'></span>
                        </span>
                        <span className='relative z-10 flex items-center gap-2 text-sm font-medium'>
                            <ArrowLeft size={18} /> Ana səhifəyə qayıt
                        </span>
                    </button>
                </Link>

                <div className="w-full max-w-[800px] z-10 space-y-6 animate-in fade-in duration-700 slide-in-from-bottom-4">

                    <div className="glass-card rounded-[32px] p-6 md:p-10 border border-white/10 shadow-2xl bg-[#102A4D]/40 backdrop-blur-xl">

                        {/* Title Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <Award className="text-yellow-400 w-8 h-8" />
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    {analysis?.primaryCareerField?.name || 'Nəticələriniz'}
                                </h1>
                            </div>
                            <p className="text-gray-400 text-base md:text-lg">
                                {analysis?.primaryCareerField?.description || 'Sizin üçün ən uyğun karyera istiqamətləri'}
                            </p>
                        </div>

                        {/* Match Percentage */}
                        {analysis?.primaryCareerField && (
                            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30 mb-6">
                                <div className="text-center">
                                    <p className="text-gray-300 text-sm mb-2">Uyğunluq Faizi</p>
                                    <h2 className="text-5xl font-bold text-white mb-2">
                                        {analysis.primaryCareerField.matchPercentage}%
                                    </h2>
                                    <p className="text-gray-400">Sizin profiliniz bu sahə üçün çox uyğundur</p>
                                </div>
                            </div>
                        )}

                        {/* Top Career Fields */}
                        <div className="bg-[#152e52]/50 rounded-2xl p-6 border border-white/5 mb-6">
                            <h2 className="text-xl font-bold text-white mb-4">Top Karyera Sahələri</h2>
                            <div className="space-y-4">
                                {analysis?.topCareerFields?.map((field, idx) => (
                                    <div key={idx} className="bg-[#0B1D36] p-4 rounded-xl flex items-center justify-between group hover:border-white/10 border border-transparent transition-all">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
                                                idx === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                idx === 1 ? 'bg-gray-400/20 text-gray-400' :
                                                'bg-orange-600/20 text-orange-600'
                                            }`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <span className="font-bold text-lg text-white block">{field.name}</span>
                                                <p className="text-sm text-gray-400">{field.reason}</p>
                                            </div>
                                        </div>
                                        <span className="text-2xl font-bold text-white ml-4">{field.matchPercentage}%</span>
                                    </div>
                                )) || (
                                    <p className="text-gray-400">Nəticələr yüklənir...</p>
                                )}
                            </div>
                        </div>

                        {/* Strengths */}
                        {analysis?.strengths && (
                            <div className="bg-[#152e52]/50 rounded-2xl p-6 border border-white/5 mb-6">
                                <h3 className="font-bold text-white text-lg mb-4">Sizin Güçlü Tərəfləriniz</h3>
                                <div className="space-y-2">
                                    {analysis.strengths.map((strength, idx) => (
                                        <div key={idx} className="bg-[#0B1D36] p-3 rounded-lg text-gray-300 text-sm">
                                            ✓ {strength}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recommended Skills */}
                        {analysis?.recommendedSkills && (
                            <div className="bg-[#152e52]/50 rounded-2xl p-6 border border-white/5 mb-6">
                                <h3 className="font-bold text-white text-lg mb-4">İnkişaf Etdirəcəyiniz Bacarıqlar</h3>
                                <div className="space-y-3">
                                    {analysis.recommendedSkills.slice(0, 4).map((skill, idx) => (
                                        <div key={idx} className="bg-[#0B1D36] p-3 rounded-lg">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-white text-sm">{skill.skill}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    skill.importance === 'Yüksək' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {skill.importance}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400">{skill.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => router.back()}
                                className="h-[56px] w-[64px] rounded-xl bg-[#152e52] text-white hover:bg-[#1e3b66] transition-colors border border-white/10 flex items-center justify-center shrink-0"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            
                            {pdfUrl && (
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isDownloading}
                                    className="flex-1 h-[56px] rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg hover:shadow-lg hover:shadow-green-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FileDown className="w-5 h-5 mr-2" />
                                    {isDownloading ? 'Yüklənir...' : 'PDF Yüklə'}
                                </button>
                            )}
                            
                            <button
                                onClick={() => router.push('/pdf-hesabat')}
                                className="flex-1 h-[56px] rounded-xl bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center"
                            >
                                <Award className="w-5 h-5 mr-2" />
                                Tam Hesabat
                            </button>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
