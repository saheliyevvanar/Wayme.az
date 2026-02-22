"use client"
import React, { useState, useEffect } from 'react'
import Footer from '../../Components/Layout/Footer'
import Container from '../../Components/Container/page'
import {
    Target,
    Lightbulb,
    BrainCircuit,
    ClipboardCheck,
    TrendingUp,
    Bot,
    Heart,
    Award,
    Mail,
    LucideIcon
} from 'lucide-react'

interface AboutUsItem {
    id: number
    sectionType: string
    title: string
    description: string
    iconName: string
    displayOrder: number
}

const iconMap: { [key: string]: LucideIcon } = {
    Target,
    Lightbulb,
    BrainCircuit,
    ClipboardCheck,
    TrendingUp,
    Bot,
    Heart,
    Award,
    Mail
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://wayme-az.railway.app'

export default function AboutPage() {
    const [aboutData, setAboutData] = useState<AboutUsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/about-us`)
                if (response.ok) {
                    const data = await response.json()
                    setAboutData(data)
                }
            } catch (error) {
                console.error('Məlumat yüklənərkən xəta:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const getDataBySection = (section: string) => aboutData.filter(item => item.sectionType === section)
    const getIcon = (iconName: string): LucideIcon => iconMap[iconName] || Target

    const mission = getDataBySection('mission')[0]
    const vision = getDataBySection('vision')[0]
    const services = getDataBySection('services')
    const values = getDataBySection('values')
    const contact = getDataBySection('contact')[0]

    if (loading) {
        return (
            <div className="min-h-screen bg-[#091E3E] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Məlumatlar yüklənir...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#091E3E] text-white flex flex-col font-inter selection:bg-blue-500/30">
            {/* Subtle Background */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-white/5">
                <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <main className="flex-grow pt-32 pb-0 relative z-10 px-4">
                <Container>
                    {/* Hero Header */}
                    <div className="text-center mb-20 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight inline-block" style={{ background: 'linear-gradient(to right, #2B7FFF, #AD46FF, #F6339A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: '5px' }}>
                            Haqqımızda
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            Wayme.Az - karyera inkişafınızda etibarlı partnyorunuz
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-24">
                        {/* Mission */}
                        {mission && (
                            <div className="bg-[#102A4D]/50 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
                                        {React.createElement(getIcon(mission.iconName), { size: 28, className: "text-white", strokeWidth: 1.5 })}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-3 text-white">{mission.title}</h2>
                                        <p className="text-gray-400 text-sm leading-relaxed">{mission.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vision */}
                        {vision && (
                            <div className="bg-[#102A4D]/50 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-pink-900/20">
                                        {React.createElement(getIcon(vision.iconName), { size: 28, className: "text-white", strokeWidth: 1.5 })}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold mb-3 text-white">{vision.title}</h2>
                                        <p className="text-gray-400 text-sm leading-relaxed">{vision.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* What we offer */}
                    {services.length > 0 && (
                        <div className="mb-24">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold inline-block" style={{ background: 'linear-gradient(to right, #2B7FFF, #AD46FF, #F6339A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: '5px' }}>
                                    Nə təklif edirik
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {services.map((service, i) => {
                                    const gradients = [
                                        "bg-gradient-to-br from-blue-500 to-cyan-500",
                                        "bg-gradient-to-br from-emerald-500 to-green-500",
                                        "bg-gradient-to-br from-purple-500 to-violet-500",
                                        "bg-gradient-to-br from-amber-500 to-orange-500"
                                    ]
                                    const IconComponent = getIcon(service.iconName)
                                    return (
                                        <div key={service.id} className="bg-[#102A4D]/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-[#102A4D]/60 group">
                                            <div className={`w-12 h-12 rounded-xl ${gradients[i % gradients.length]} flex items-center justify-center mb-4 shadow-lg`}>
                                                <IconComponent size={24} className="text-white" strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Our Values */}
                    {values.length > 0 && (
                        <div className="mb-24">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold inline-block" style={{ background: 'linear-gradient(to right, #2B7FFF, #AD46FF, #F6339A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: '5px' }}>
                                    Dəyərlərimiz
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {values.map((value, i) => {
                                    const colors = [
                                        { text: "text-blue-400", bg: "bg-blue-500/10" },
                                        { text: "text-emerald-400", bg: "bg-emerald-500/10" },
                                        { text: "text-amber-400", bg: "bg-amber-500/10" }
                                    ]
                                    const IconComponent = getIcon(value.iconName)
                                    const colorSet = colors[i % colors.length]
                                    return (
                                        <div key={value.id} className="bg-[#102A4D]/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:bg-[#102A4D]/60 transition-colors duration-300">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`p-2 rounded-lg ${colorSet.bg}`}>
                                                    <IconComponent size={24} className={colorSet.text} strokeWidth={1.5} />
                                                </div>
                                                <h3 className="text-lg font-bold text-white">{value.title}</h3>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Contact */}
                    {contact && (
                        <div className="max-w-2xl mx-auto mb-4">
                            <div className="bg-gradient-to-b from-[#102A4D]/80 to-[#0B1D36]/80 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center hover:border-blue-500/20 transition-all duration-300">
                                <h2 className="text-2xl font-bold text-white mb-3">{contact.title}</h2>
                                <p className="text-gray-400 mb-6 text-sm max-w-sm mx-auto">{contact.description}</p>
                                <a
                                    href="mailto:Wayme.az@gmail.com"
                                    className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
                                >
                                    Wayme.az@gmail.com
                                </a>
                            </div>
                        </div>
                    )}

                </Container>
            </main>

            <Footer />
        </div>
    )
}
