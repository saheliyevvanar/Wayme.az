"use client";

import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SubCategory {
    title: string;
    skills: string;
    description: string;
    icon: LucideIcon;
}

interface ProfessionData {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    border: string;
    // In the future, this comes from props, but for now we might need to mock it if not present
    subCategories?: SubCategory[];
}

interface ProfessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ProfessionData | null;
}

const ProfessionModal: React.FC<ProfessionModalProps> = ({ isOpen, onClose, data }) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    if (!isOpen || !data) return null;

    // Use actual subcategories from data
    const content = data.subCategories || [];

    // Extract color scheme from profession data
    const colorClass = data.color.replace('text-', ''); // e.g., "blue-400"
    const borderStyle = `border-${colorClass}/20`;
    const hoverBorderStyle = `hover:border-${colorClass}/30`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className={`relative w-full max-w-6xl overflow-hidden rounded-[32px] bg-[#0B172E] border ${borderStyle} shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-8 pb-4 bg-[#0B172E] z-10">
                    <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
                    <h2 className={`text-2xl md:text-3xl font-bold ${data.color} text-center`}>
                        {data.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 pt-2 overflow-y-auto custom-scrollbar">
                    <h3 className="text-lg text-slate-400 font-medium mb-6">Sahələr:</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                        {content.map((item, index) => (
                            <div
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedCard(expandedCard === index ? null : index);
                                }}
                                className={`group relative flex flex-col bg-[#162444] rounded-2xl p-4 border ${data.border} ${hoverBorderStyle} transition-all duration-300 hover:bg-[#1C2C52] cursor-pointer`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${data.bg} ${data.color}`}>
                                        {item.icon && <item.icon size={24} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-white font-bold text-lg truncate pr-2">{item.title}</h4>
                                        </div>
                                        <p className="text-slate-400 text-sm mt-1 mb-2">{item.skills}</p>

                                        {/* Description popup / accordion feeling */}
                                        <div className={`
                                overflow-hidden transition-all duration-300 ease-in-out
                                ${expandedCard === index ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"}
                            `}>
                                            <div className="bg-[#0A1222]/80 rounded-lg p-3 text-sm text-slate-300 border border-white/5">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`mt-1 text-slate-500 group-hover:${data.color} transition-colors`}>
                                        {expandedCard === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionModal;
