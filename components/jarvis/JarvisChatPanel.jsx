"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJarvis } from '@/hooks/useJarvis';

const JarvisChatPanel = ({ isOpen, onClose }) => {
  const { messages, isLoading, sendMessage } = useJarvis();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current?.value;
    if (text) {
      sendMessage(text);
      inputRef.current.value = '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="jarvis-panel"
          initial={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-28 right-8 z-[100] w-[350px] sm:w-[400px] h-[500px] bg-void/90 backdrop-blur-xl border border-arc-blue/30 rounded-lg overflow-hidden flex flex-col shadow-[0_0_30px_rgba(79,195,247,0.2)]"
        >
          {/* HUD Header */}
          <div className="p-4 border-b border-arc-blue/20 flex items-center justify-between bg-arc-blue/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-arc-blue rounded-full animate-pulse" />
              <h3 className="font-orbitron text-xs text-arc-blue tracking-[0.2em] uppercase">
                Systems Online / J.A.R.V.I.S.
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="text-arc-blue/50 hover:text-marvel-red transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 border-2 border-arc-blue/20 rounded-full flex items-center justify-center animate-spin-slow">
                  <div className="w-8 h-8 border border-arc-blue/40 rounded-full" />
                </div>
                <p className="font-rajdhani text-text-secondary text-sm">
                  &quot;Welcome back, sir. How can I assist you with Keerthi&apos;s portfolio today?&quot;
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-sm font-rajdhani text-sm relative ${
                  msg.role === 'user' 
                    ? 'bg-arc-blue/10 border-r-2 border-arc-blue text-arc-blue' 
                    : 'bg-surface-raised border-l-2 border-stark-gold text-text-primary'
                }`}>
                  {/* Corner Accents for JARVIS messages */}
                  {msg.role === 'model' && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-stark-gold/50" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-stark-gold/50" />
                    </>
                  )}
                  <p className="leading-relaxed">
                    {msg.parts[0].text}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-raised p-3 rounded-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-arc-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-arc-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-arc-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* HUD Footer / Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-arc-blue/20 bg-arc-blue/5">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command..."
                className="w-full bg-deep/50 border border-arc-blue/30 rounded-sm py-2 px-4 font-rajdhani text-sm text-arc-blue focus:outline-none focus:border-arc-blue focus:ring-1 focus:ring-arc-blue/50 placeholder:text-arc-blue/30"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 text-arc-blue hover:text-white disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center text-[8px] font-orbitron text-arc-blue/40 tracking-tighter">
              <span>ENCRYPTION: AES-256</span>
              <span>STARK_OS_v4.2</span>
            </div>
          </form>

          {/* Corner Brackets Decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-arc-blue/20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-arc-blue/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-arc-blue/20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-arc-blue/20 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JarvisChatPanel;
