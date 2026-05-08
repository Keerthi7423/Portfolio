"use client";

import { useState, useCallback, useEffect, useRef } from 'react';

export const useJarvis = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onerror = (event) => {
          console.error("Speech Recognition Error:", event.error);
          setIsListening(false);
        };
      }
      
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text) => {
    if (!synthRef.current || !text) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // JARVIS Persona: British Male (if available)
    const voices = synthRef.current.getVoices();
    const jarvisVoice = voices.find(v => 
      v.name.includes('Google UK English Male') || 
      v.name.includes('Male') || 
      v.lang === 'en-GB'
    );

    if (jarvisVoice) utterance.voice = jarvisVoice;
    utterance.pitch = 0.9; // Slightly deeper
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, []);

  const sendMessage = useCallback(async (text, shouldSpeak = true) => {
    if (!text.trim()) return;

    // Add user message to state
    const userMessage = { role: "user", parts: [{ text }] };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msg.parts
      }));

      const response = await fetch('/api/jarvis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Transmission Failure');

      const jarvisMessage = { role: "model", parts: [{ text: data.text }] };
      setMessages((prev) => [...prev, jarvisMessage]);
      
      if (shouldSpeak) {
        speak(data.text);
      }
    } catch (err) {
      console.error("JARVIS Error:", err);
      setError(err.message);
      const errorMsg = "Mission Failure. My core processing unit is offline. Please try again later.";
      setMessages((prev) => [...prev, { role: "model", parts: [{ text: errorMsg }] }]);
      if (shouldSpeak) speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [messages, speak]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          sendMessage(transcript);
        }
      };
    }
  }, [isListening, sendMessage]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    stopSpeaking();
  }, [stopSpeaking]);

  return {
    messages,
    isLoading,
    error,
    isListening,
    isSpeaking,
    sendMessage,
    startListening,
    stopSpeaking,
    clearChat,
  };
};

