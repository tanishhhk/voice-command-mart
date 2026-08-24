"use client";

import { Mic } from "lucide-react";
import { useShopping } from "@/context/ShoppingContext";

export default function Microphone() {
    const { simulateVoiceCommand } = useShopping();

    return (
        <section className="flex flex-col items-center mt-8 relative">
            <button
                className="
                    h-32 w-32 rounded-full border-4 border-red-500
                    flex items-center justify-center transition-all duration-300
                    shadow-[0_0_35px_rgba(239,68,68,0.45)]
                "
            >
                <Mic size={54} />
            </button>
            <p className="mt-5 text-xl font-medium">Tap to Speak</p>
            
            {/* Simulation Controls */}
            <div className="absolute top-0 right-12 flex flex-col items-end gap-2">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Demo Mode</span>
                <button 
                    onClick={simulateVoiceCommand}
                    className="px-4 py-2 bg-[#2f7cff]/10 hover:bg-[#2f7cff]/20 text-[#2f7cff] border border-[#2f7cff]/30 rounded-lg text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(47,124,255,0.2)]"
                >
                    Simulate "Add 2 Milk"
                </button>
            </div>
        </section>
    );
}