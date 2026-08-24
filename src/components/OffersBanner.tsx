"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, ChevronRight } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"] });

const SLIDES = [
    {
        id: "seasonal",
        tag: "SEASONAL SPECIAL",
        tagIcon: Sparkles,
        tagColor: "text-amber-800",
        title: "Fresh Summer Harvest",
        description: "Get up to 25% off on all organic greens and seasonal fruits.",
        badge: "25% OFF",
        badgeBg: "bg-gradient-to-r from-orange-500 to-red-500",
        cardBg: "linear-gradient(135deg, #e8d0a9 0%, #dfbe8d 100%)",
        textColor: "text-[#1c1917]",
        subtextColor: "text-[#44403c]",
        hasWatermark: true,
    },
    {
        id: "flash",
        tag: "FLASH DEAL • ENDS IN 2H",
        tagIcon: Clock,
        tagColor: "text-cyan-400",
        title: "Buy 1 Get 1 Free",
        description: "Selected dairy products, cold beverages & fresh juices.",
        badge: "BOGO FREE",
        badgeBg: "bg-gradient-to-r from-cyan-500 to-blue-600",
        cardBg: "linear-gradient(135deg, #0b1e2d 0%, #06111a 100%)",
        textColor: "text-white",
        subtextColor: "text-gray-300",
        hasWatermark: false,
    }
];

export default function OffersBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-transition every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = SLIDES[currentSlide];
    const TagIcon = slide.tagIcon;

    return (
        <div className="w-full relative h-[155px] sm:h-[165px] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 group transition-all">
            {/* Background transition wrapper */}
            <div 
                className="absolute inset-0 transition-all duration-700 ease-in-out p-4 sm:p-5 flex flex-col justify-between"
                style={{
                    background: slide.cardBg,
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25)",
                }}
            >
                {/* Organic Leaf Watermark on Right for Seasonal Special */}
                {slide.hasWatermark && (
                    <div className="absolute right-0 top-0 bottom-0 w-44 pointer-events-none opacity-20 flex items-center justify-end pr-2">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-[#4a3518] fill-current" preserveAspectRatio="none">
                            <path d="M70,10 C80,30 90,50 85,80 C60,85 40,75 35,50 C30,25 50,10 70,10 Z M50,40 C55,50 60,60 65,70 M40,60 C50,62 60,64 70,66" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M85,25 C95,45 85,70 70,85 C55,75 45,55 50,35 C55,15 75,10 85,25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M92,5 C98,25 90,45 80,60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                        </svg>
                    </div>
                )}

                {/* Top Row: Tag & Pagination Dots */}
                <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                        <TagIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${slide.tagColor}`} />
                        <span className={`${montserrat.className} ${slide.tagColor} font-black tracking-widest text-[10px] sm:text-xs uppercase`}>
                            {slide.tag}
                        </span>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex items-center gap-1.5">
                        {SLIDES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    currentSlide === idx 
                                        ? (currentSlide === 0 ? "w-5 bg-[#2a1d12]" : "w-5 bg-white") 
                                        : (currentSlide === 0 ? "w-1.5 bg-[#2a1d12]/30" : "w-1.5 bg-white/30")
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="z-10 pr-16 sm:pr-20">
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-black ${slide.textColor} leading-tight tracking-tight drop-shadow-xs`}>
                        {slide.title}
                    </h3>
                    <p className={`text-xs sm:text-[13px] ${slide.subtextColor} mt-1 line-clamp-2 leading-snug max-w-[90%] font-medium`}>
                        {slide.description}
                    </p>
                </div>

                {/* Accent Badge on Bottom Right */}
                <div 
                    className={`absolute right-0 bottom-0 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-tl-2xl shadow-xl z-20 ${slide.badgeBg}`}
                >
                    {slide.badge}
                </div>
            </div>
        </div>
    );
}
