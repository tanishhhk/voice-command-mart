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
        tagColor: "text-amber-400 dark:text-amber-300",
        title: "Fresh Summer Harvest",
        description: "Get up to 25% off on all organic greens and seasonal fruits.",
        badge: "25% OFF",
        badgeBg: "bg-gradient-to-r from-orange-500 to-red-500",
        cardBg: "linear-gradient(135deg, #2b1810 0%, #1a0f0a 100%)",
        borderColor: "border-amber-500/30",
    },
    {
        id: "flash",
        tag: "FLASH DEAL • ENDS IN 2H",
        tagIcon: Clock,
        tagColor: "text-cyan-400 dark:text-cyan-300",
        title: "Buy 1 Get 1 Free",
        description: "Selected dairy products, cold beverages & fresh juices.",
        badge: "BOGO FREE",
        badgeBg: "bg-gradient-to-r from-cyan-500 to-blue-600",
        cardBg: "linear-gradient(135deg, #0b1e2d 0%, #06111a 100%)",
        borderColor: "border-cyan-500/30",
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
        <div className="w-full relative h-[155px] sm:h-[165px] rounded-2xl overflow-hidden shadow-xl border border-white/10 group transition-all">
            {/* Background transition wrapper */}
            <div 
                className="absolute inset-0 transition-all duration-700 ease-in-out p-4 sm:p-5 flex flex-col justify-between"
                style={{
                    background: slide.cardBg,
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
                }}
            >
                {/* Subtle decorative radial glow */}
                <div 
                    className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-30"
                    style={{
                        background: currentSlide === 0 ? "#f97316" : "#06b6d4",
                    }}
                />

                {/* Top Row: Tag & Pagination Dots */}
                <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                        <TagIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${slide.tagColor}`} />
                        <span className={`${montserrat.className} ${slide.tagColor} font-bold tracking-wider text-[10px] sm:text-xs uppercase`}>
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
                                    currentSlide === idx ? "w-5 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="z-10 pr-16 sm:pr-20">
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                        {slide.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-gray-300 mt-1 line-clamp-2 leading-snug max-w-[95%] opacity-90">
                        {slide.description}
                    </p>
                </div>

                {/* Accent Badge on Bottom Right */}
                <div 
                    className={`absolute right-0 bottom-0 text-white font-black text-[11px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-tl-xl shadow-lg z-20 ${slide.badgeBg}`}
                >
                    {slide.badge}
                </div>
            </div>
        </div>
    );
}
