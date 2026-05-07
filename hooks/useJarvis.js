"use client";

import { useState, useCallback } from 'react';

export const useJarvis = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Add user message to state
    const userMessage = { role: "user", parts: [{ text }] };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Prepare history for the API (Gemini format)
      // We exclude the last message which is the current one
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msg.parts
      }));

      const response = await fetch('/api/jarvis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Transmission Failure');
      }

      // Add JARVIS response to state
      const jarvisMessage = { role: "model", parts: [{ text: data.text }] };
      setMessages((prev) => [...prev, jarvisMessage]);
    } catch (err) {
      console.error("JARVIS Error:", err);
      setError(err.message);
      
      // Add error message to chat
      const errorMessage = { 
        role: "model", 
        parts: [{ text: "Mission Failure. My core processing unit is offline. Please try again later." }] 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};
