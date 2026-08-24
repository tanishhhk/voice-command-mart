"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Mic, Square, Search, Plus, Minus, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useShopping } from '@/context/ShoppingContext';
import { parseCommand } from '@/lib/nlpEngine';
import { getRunningLowProducts } from '@/lib/recommendationEngine';
import { LiveAudioVisualizer } from './LiveAudioVisualizer';

const QUICK_ACTIONS = [
  { label: "Add 2L milk", type: "add", command: "add 2L milk" },
  { label: "Remove 1kg apples", type: "remove", command: "remove 1kg apples" },
  { label: "Add bread", type: "add", command: "add bread" },
  { label: "Add eggs", type: "add", command: "add eggs" },
];

export const VoiceAssistant = () => {
  const { dispatch, isCartOpen, toggleCart } = useShopping();
  const [feedback, setFeedback] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [typedInput, setTypedInput] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const runningLowItems = getRunningLowProducts();

  const handleCommand = useCallback(async (transcriptText: string) => {
    if (!transcriptText || !transcriptText.trim()) return;
    setIsProcessing(true);
    setFeedback('Processing command...');
    
    try {
      const result = await parseCommand(transcriptText);
      if (result.type === 'INTENT') {
        if (result.action.type === 'CHANGE_LANGUAGE') {
          document.cookie = `NEXT_LOCALE=${result.action.payload.langCode}; path=/; max-age=31536000`;
          setFeedback('Changing language...');
          window.location.reload();
          return;
        }

        if (result.action.type !== 'OPEN_CART') {
          dispatch(result.action);
        }
        
        let msg = 'Action recognized.';
        if (result.action.type === 'ADD_ITEM') {
          const { quantity, unit, name } = result.action.payload;
          let unitString = unit;
          if (quantity === 1 && unit.startsWith('1 ')) {
             unitString = unit;
             msg = `Added ${unitString} of ${name}`;
          } else if (unit) {
             msg = `Added ${quantity} x ${unit} of ${name}`;
          } else {
             msg = `Added ${quantity} of ${name}`;
          }
        } else if (result.action.type === 'REMOVE_ITEM') {
          msg = `Removed ${result.action.payload}`;
        } else if (result.action.type === 'OPEN_CART') {
          msg = 'Opening cart...';
          if (!isCartOpen) toggleCart();
        } else if (result.action.type === 'SET_SEARCH_QUERY') {
          const p = result.action.payload;
          if (!p.term && !p.brand && p.maxPrice === undefined) {
             msg = 'Cleared search';
          } else {
             const filters = [];
             if (p.term) filters.push(`"${p.term}"`);
             if (p.brand) filters.push(`brand ${p.brand}`);
             if (p.maxPrice !== undefined) filters.push(`under ${p.maxPrice}`);
             msg = `Searching for ${filters.join(' ')}`;
          }
        } else if (result.action.type === 'CLEAR_LIST') {
          msg = 'Cleared shopping list';
        }
        
        setFeedback(msg);
      } else if (result.type === 'ERROR') {
        setFeedback(`API Error: ${result.message}`);
      } else {
        setFeedback(result.originalText || `Could not understand: "${transcriptText}"`);
      }
    } catch (err) {
      setFeedback(`Error processing command: "${transcriptText}"`);
    } finally {
      setIsProcessing(false);
      setTypedInput('');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFeedback('');
      }, 4000);
    }
  }, [dispatch, isCartOpen, toggleCart]);

  const { isListening, transcript, startListening, stopListening, error, isSupported } = useSpeechRecognition('en-US', handleCommand);

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      setFeedback('');
      startListening();
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedInput.trim()) {
      handleCommand(typedInput.trim());
    }
  };

  const handleAddAllRunningLow = () => {
    runningLowItems.forEach(({ product }) => {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          name: product.name,
          category: product.category,
          quantity: 1,
          unit: product.quantity || "1 pc"
        }
      });
    });
    setFeedback(`Added ${runningLowItems.length} running-low items to your list!`);
  };

  return (
    <div className="w-full flex flex-col items-start gap-3.5">
      <style>{`
        @keyframes rgbTraceContinuous {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes soundwavePingHero {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.45); opacity: 0; }
        }
      `}</style>

      {/* ── Main Hero Row: Mic + Search Bar ─────────────────────── */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 lg:gap-8">
        
        {/* ── LEFT: The Continuous RGB Orbit Mic ─────────────────── */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative group cursor-pointer flex items-center justify-center" onClick={toggleListen}>
            {/* Soundwave expanding aura when listening */}
            {isListening && (
              <div 
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, rgba(168, 85, 247, 0.25) 50%, transparent 70%)",
                  animation: "soundwavePingHero 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
            )}

            {/* Ambient glowing blurred RGB aura */}
            <div
              className="absolute -inset-1.5 rounded-full pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, #ff0055, #ff7700, #ffee00, #00ff66, #00e5ff, #7c3aed, #ff0055)",
                filter: isListening ? "blur(16px)" : "blur(10px)",
                opacity: isListening ? 0.95 : 0.65,
                animation: isListening 
                  ? "rgbTraceContinuous 1.2s linear infinite" 
                  : "rgbTraceContinuous 3.5s linear infinite",
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Sharp RGB Tracing Border Container */}
            <div
              className="relative rounded-full p-[3.5px] overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Rotating Conic Gradient Layer creating continuous RGB line trace */}
              <div
                className="absolute -inset-[100%] pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, #ff0055, #ff7700, #ffee00, #00ff66, #00e5ff, #9333ea, #ff0055)",
                  animation: isListening 
                    ? "rgbTraceContinuous 1.2s linear infinite" 
                    : "rgbTraceContinuous 3.5s linear infinite",
                }}
              />

              {/* Center Button Disk with metallic dark obsidian glassmorphism */}
              <button
                className={`
                  relative z-10 h-22 w-22 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full flex items-center justify-center transition-all duration-300
                  ${isListening 
                      ? 'bg-gradient-to-br from-[#1f0a14] via-[#120710] to-[#0a0508] shadow-[inset_0_2px_12px_rgba(255,0,85,0.4)]' 
                      : 'bg-gradient-to-br from-[#141b2b] via-[#0d131f] to-[#070a10] shadow-[inset_0_2px_8px_rgba(255,255,255,0.18)] hover:from-[#1a2336] hover:to-[#0a0f18]'
                  }
                `}
                aria-label={isListening ? "Stop listening" : "Start voice shopping"}
              >
                {/* Specular light reflection on top half */}
                <div 
                  className="absolute top-1 left-2.5 right-2.5 h-[32%] rounded-t-full pointer-events-none opacity-25"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)" }}
                />

                {isListening ? (
                  <Square className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 text-red-500 fill-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                ) : (
                  <Mic className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] transition-all duration-300 group-hover:text-[#00f0ff] group-hover:drop-shadow-[0_0_16px_rgba(0,240,255,0.95)]" />
                )}
              </button>
            </div>
          </div>

          {/* Text underneath mic - Clean bold text with NO background box */}
          <p className="mt-2 text-xs sm:text-[13px] font-bold text-gray-800 dark:text-gray-200 tracking-wide text-center drop-shadow-xs">
            {isListening ? (
              <span className="text-emerald-500 font-bold animate-pulse">Listening... Speak now</span>
            ) : (
              "Tap the mic to speak"
            )}
          </p>

          {/* Multi-colored Audio Visualizer directly under text */}
          <div className="mt-1 flex justify-center">
            <LiveAudioVisualizer isListening={isListening} />
          </div>
        </div>

        {/* ── CENTER: Voice Command & Search Control Hub ─────────── */}
        <div className="flex-1 w-full max-w-[500px] xl:max-w-[560px] flex flex-col justify-center">
          {/* Header Text */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              What would you like to add or remove?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 font-medium">
              Just speak or type your command
            </p>
          </div>

          {/* Command Search Bar Input */}
          <form onSubmit={handleInputSubmit} className="mt-3 relative w-full group">
            <div className="relative flex items-center w-full rounded-2xl bg-white/90 dark:bg-[#071d15]/80 border-2 border-emerald-500 hover:border-emerald-400 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all">
              <div className="pl-4 pr-2 flex items-center pointer-events-none text-emerald-500 dark:text-emerald-400">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </div>

              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Try: Add 2L milk, Remove 1kg apples, Add bread..."
                className="w-full py-2.5 sm:py-3 pr-12 bg-transparent text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 outline-none"
              />

              {/* Mic trigger inside search bar */}
              <button
                type="button"
                onClick={toggleListen}
                aria-label="Speak command"
                className="absolute right-3 p-1 rounded-lg text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Action Suggestion Pills */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCommand(action.command)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#071d15]/90 border border-emerald-500/60 hover:border-emerald-400 hover:bg-emerald-500/10 text-gray-900 dark:text-gray-100 font-bold text-xs sm:text-[13px] shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                {action.type === "add" ? (
                  <span className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-500 text-xs font-black">
                    +
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-500 text-xs font-black">
                    -
                  </span>
                )}
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Action Feedback Message */}
          {feedback && (
            <div className="mt-2 flex items-center gap-2 animate-in fade-in duration-200">
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {feedback}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
