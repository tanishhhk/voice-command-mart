"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useShopping } from '@/context/ShoppingContext';
import { parseCommand } from '@/lib/nlpEngine';
import { LiveAudioVisualizer } from './LiveAudioVisualizer';

export const VoiceAssistant = () => {
  const { dispatch, isCartOpen, toggleCart } = useShopping();
  const [feedback, setFeedback] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCommand = useCallback(async (transcriptText: string) => {
    setIsProcessing(true);
    setFeedback('Processing your command...');
    
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
        
        // Show feedback
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
      startListening();
      setFeedback('Listening...');
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-500/10 text-red-500 rounded-lg text-sm text-center border border-red-500/20">
        Voice recognition is not supported in your browser.
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center mt-8 relative w-full">
      <div className="relative group cursor-pointer" onClick={toggleListen}>
        <button
          className={`
            relative z-10 h-32 w-32 rounded-full border-4 flex items-center justify-center transition-all duration-300
            ${isListening 
                ? 'border-red-500 shadow-[0_0_55px_rgba(239,68,68,0.7)] bg-red-500/10' 
                : 'border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.45)] hover:bg-red-500/5 bg-transparent'
            }
          `}
        >
          {isListening ? (
            <Square size={44} className="text-red-500 fill-red-500" />
          ) : (
            <Mic size={54} className="text-red-500" />
          )}
        </button>
      </div>
      
      <div className="mt-5 text-xl font-medium min-h-[3rem] text-center w-full flex flex-col items-center justify-center">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : isListening ? (
          <>
            <LiveAudioVisualizer isListening={isListening} />
            <p className="text-emerald-500 mt-2">{transcript || (isProcessing ? "Processing..." : "Listening...")}</p>
          </>
        ) : feedback ? (
          <p className="text-emerald-500">{feedback}</p>
        ) : (
          <p>Tap to Speak</p>
        )}
      </div>
    </section>
  );
};
