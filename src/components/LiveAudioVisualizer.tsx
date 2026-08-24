"use client";

import React, { useEffect, useRef, useState } from 'react';

export const LiveAudioVisualizer = ({ isListening }: { isListening: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let isActive = true;

    const startVisualizer = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (!isActive) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        
        streamRef.current = stream;
        
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64; // Smaller for fewer bars
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;
        
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        sourceRef.current = source;

        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
          if (!isActive) return;
          
          const width = canvas.width;
          const height = canvas.height;
          
          animationFrameRef.current = requestAnimationFrame(draw);
          
          analyser.getByteFrequencyData(dataArray);
          
          ctx.clearRect(0, 0, width, height);
          
          // We will draw ~6-8 bars in the center
          const numBars = 8;
          const barWidth = 4;
          const spacing = 4;
          const totalWidth = (barWidth * numBars) + (spacing * (numBars - 1));
          
          let startX = (width - totalWidth) / 2;
          
          const BAR_COLORS = [
            '#ec4899', // Pink
            '#f59e0b', // Amber/Yellow
            '#10b981', // Emerald
            '#00f0ff', // Cyan
            '#10b981', // Emerald
            '#f59e0b', // Amber/Yellow
            '#ec4899', // Pink
            '#00f0ff'  // Cyan
          ];
          
          for (let i = 0; i < numBars; i++) {
            // Pick some distinct frequencies
            const dataIndex = Math.floor((i / numBars) * (bufferLength / 2));
            const value = dataArray[dataIndex];
            
            // value is 0-255, map to height (min 4px, max 28px)
            const percent = value / 255;
            const barHeight = Math.max(4, percent * height);
            
            const y = (height - barHeight) / 2;
            
            ctx.fillStyle = BAR_COLORS[i % BAR_COLORS.length];
            ctx.beginPath();
            ctx.roundRect(startX, y, barWidth, barHeight, 2);
            ctx.fill();
            
            startX += barWidth + spacing;
          }
        };
        
        draw();
      } catch (err) {
        console.error("Error accessing microphone for visualizer:", err);
      }
    };

    if (isListening) {
      startVisualizer();
    } else {
      isActive = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      // Draw resting soundwave dots/bars
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          const numBars = 8;
          const barWidth = 4;
          const spacing = 4;
          const totalWidth = (barWidth * numBars) + (spacing * (numBars - 1));
          let startX = (canvasRef.current.width - totalWidth) / 2;
          const BAR_COLORS = ['#ec4899', '#f59e0b', '#10b981', '#00f0ff', '#10b981', '#f59e0b', '#ec4899', '#00f0ff'];
          const heights = [4, 6, 10, 16, 12, 8, 5, 4];
          
          for (let i = 0; i < numBars; i++) {
            const h = heights[i % heights.length];
            const y = (canvasRef.current.height - h) / 2;
            ctx.fillStyle = BAR_COLORS[i % BAR_COLORS.length];
            ctx.beginPath();
            ctx.roundRect(startX, y, barWidth, h, 2);
            ctx.fill();
            startX += barWidth + spacing;
          }
        }
      }
    }

    return () => {
      isActive = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [isListening]);

  return (
    <canvas 
      ref={canvasRef} 
      width={100} 
      height={32} 
      className="block my-2" 
    />
  );
};
