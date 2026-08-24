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
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 lg:gap-6">
        
        {/* ── LEFT: The Blue Skeleton Mic ──────────────────────── */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative group cursor-pointer flex items-center justify-center" onClick={toggleListen}>
            {/* Soundwave expanding aura when listening */}
            {isListening && (
              <div 
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 70%)",
                  animation: "soundwavePingHero 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
            )}

            {/* Ambient glowing blurred RGB aura */}
            <div
              className="absolute -inset-1.5 rounded-full pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, #3b82f6, #00f0ff, #7c3aed, #ec4899, #f59e0b, #10b981, #3b82f6)",
                filter: isListening ? "blur(14px)" : "blur(8px)",
                opacity: isListening ? 0.95 : 0.65,
                animation: isListening 
                  ? "rgbTraceContinuous 1.2s linear infinite" 
                  : "rgbTraceContinuous 3.5s linear infinite",
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Sharp RGB Tracing Border Container */}
            <div
              className="relative rounded-full p-[3px] overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Rotating Conic Gradient Layer */}
              <div
                className="absolute -inset-[100%] pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, #2563eb, #00f0ff, #7c3aed, #ec4899, #f59e0b, #10b981, #2563eb)",
                  animation: isListening 
                    ? "rgbTraceContinuous 1.2s linear infinite" 
                    : "rgbTraceContinuous 3.5s linear infinite",
                }}
              />

              {/* Center Button Disk */}
              <button
                className={`
                  relative z-10 h-18 w-18 sm:h-20 sm:w-20 md:h-22 md:w-22 rounded-full flex items-center justify-center transition-all duration-300
                  ${isListening 
                      ? 'bg-rose-50 dark:bg-[#1a0f14] shadow-[inset_0_2px_8px_rgba(239,68,68,0.2)]' 
                      : 'bg-white dark:bg-[#0d131f] shadow-[inset_0_1px_4px_rgba(0,0,0,0.08)] hover:bg-blue-50/50 dark:hover:bg-[#111928]'
                  }
                `}
                aria-label={isListening ? "Stop listening" : "Start voice shopping"}
              >
                {isListening ? (
                  <Square className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 text-red-500 fill-red-500 drop-shadow-md" />
                ) : (
                  <Mic className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 text-[#2563eb] dark:text-[#38bdf8] drop-shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all duration-300 group-hover:scale-110" />
                )}
              </button>
            </div>
          </div>

          {/* Text underneath mic */}
          <p className="mt-1.5 text-xs font-black text-gray-900 dark:text-gray-100 tracking-wide text-center drop-shadow-sm">
            {isListening ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold animate-pulse">Listening...</span>
            ) : (
              "Tap to speak"
            )}
          </p>

          {/* Audio Visualizer */}
          {isListening && (
            <div className="mt-1 flex justify-center">
              <LiveAudioVisualizer isListening={isListening} />
            </div>
          )}
        </div>

        {/* ── CENTER: Clean, Enhanced Search & Voice Hub ─────────── */}
        <div className="w-full max-w-[400px] xl:max-w-[440px] flex flex-col justify-center">
          {/* Header Text - Sleek & Uncluttered */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-snug">
              What would you like to buy?
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Speak or type your items
            </p>
          </div>

          {/* Command Search Bar Input */}
          <form onSubmit={handleInputSubmit} className="mt-2.5 relative w-full group">
            <div className="relative flex items-center w-full rounded-xl bg-white dark:bg-gray-900 border-2 border-emerald-600/70 dark:border-emerald-500/60 hover:border-emerald-600 dark:hover:border-emerald-500 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-500/20 shadow-xs transition-all">
              <div className="pl-3 pr-2 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
                <Search className="w-4 h-4" />
              </div>

              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Try: 2L milk, 1kg apples, bread..."
                className="w-full py-2 pr-9 bg-transparent text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
              />

              {/* Mic trigger inside search bar */}
              <button
                type="button"
                onClick={toggleListen}
                aria-label="Speak command"
                className="absolute right-2 p-1 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Quick Action Suggestion Pills */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCommand(action.command)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-gray-900 dark:text-gray-100 font-bold text-[11px] shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                {action.type === "add" ? (
                  <Plus className="w-3 h-3 text-emerald-600 font-extrabold" />
                ) : (
                  <Minus className="w-3 h-3 text-rose-600 font-extrabold" />
                )}
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Action Feedback Message */}
          {feedback && (
            <div className="mt-1.5 flex items-center gap-2 animate-in fade-in duration-200">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {feedback}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
