import React from 'react';
import { Sparkles, Tag, Clock } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"] });

export default function OffersBanner() {
    return (
        <div className="w-full flex gap-6 mt-4">
            {/* Main Offer Banner */}
            <div style={{
                flex: 2,
                position: "relative",
                borderRadius: "16px",
                background: "linear-gradient(135deg, var(--shelf-top-start) 0%, var(--shelf-front-end) 100%)",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.1)",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden"
            }}>
                {/* Decorative overlay */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                    pointerEvents: "none"
                }} />
                
                <div className="flex items-center gap-3 mb-2 relative z-10">
                    <Sparkles className="text-yellow-400 dark:text-amber-700 w-5 h-5 transition-colors" />
                    <span className={`${montserrat.className} text-yellow-400 dark:text-amber-700 font-bold tracking-widest text-xs uppercase transition-colors`}>
                        Seasonal Special
                    </span>
                </div>
                
                <h3 className="text-2xl font-extrabold mb-1 relative z-10 transition-colors" style={{ color: "var(--banner-text)" }}>
                    Fresh Summer Harvest
                </h3>
                <p className="text-sm relative z-10 opacity-90 transition-colors" style={{ color: "var(--banner-subtext)" }}>
                    Get up to 25% off on all organic greens and seasonal fruits.
                </p>
                
                {/* Accent Ribbon */}
                <div style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    background: "var(--red-glow, #ef4444)",
                    color: "white",
                    padding: "8px 24px",
                    borderTopLeftRadius: "16px",
                    fontWeight: 800,
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
                    zIndex: 20
                }}>
                    25% OFF
                </div>
            </div>

            {/* Side Offer */}
            <div style={{
                flex: 1,
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-colors" />
                        <span className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-colors">Flash Deal</span>
                    </div>
                    <h4 className="text-lg font-bold leading-tight transition-colors" style={{ color: "var(--text-primary, #1e293b)" }}>
                        Buy 1 Get 1 Free
                    </h4>
                    <p className="text-xs mt-1 transition-colors" style={{ color: "var(--text-secondary, #475569)" }}>
                        Selected dairy products
                    </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-bold transition-colors" style={{ color: "var(--text-primary, #1e293b)" }}>Ends in 2h</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded-full transition-colors shadow-sm">
                        Claim
                    </button>
                </div>
            </div>
        </div>
    );
}
