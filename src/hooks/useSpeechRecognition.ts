"use client";

import { useState, useEffect, useCallback } from 'react';

// Extend window object to include SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useSpeechRecognition = (
  language = 'en-US',
  onCommand?: (text: string) => void
) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false; // Stop when user finishes phrase to prevent stuck loops
        recog.interimResults = true; // Real-time feedback
        recog.lang = language;

        recog.onstart = () => {
          setIsListening(true);
          setError(null);
        };

        recog.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          setTranscript(interimTranscript || finalTranscript);

          if (finalTranscript.trim()) {
            if (onCommand) {
              onCommand(finalTranscript.trim());
            }
          }
        };

        recog.onerror = (event: any) => {
          if (event.error !== 'no-speech') {
            console.error("Speech recognition error", event.error);
            setError(event.error === 'not-allowed' ? 'Microphone permission denied' : event.error);
          }
          setIsListening(false);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        setRecognition(recog);
      } else {
        setError("Speech Recognition API is not supported in this browser.");
      }
    }
  }, [language, onCommand]);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript('');
      setError(null);
      try {
        recognition.start();
      } catch (e) {
        console.warn("Recognition already running", e);
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        // Ignore
      }
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    isSupported: !!recognition,
  };
};
