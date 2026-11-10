'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchWithTimeout } from '@/lib/fetch-timeout';

interface AiAdvisorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiAdvisorDialog({ isOpen, onClose }: AiAdvisorDialogProps) {
  const [messages, setMessages] = useState<Array<{ role: 'assistant' | 'user'; content: string }>>([
    {
      role: 'assistant',
      content:
        'Olá, Lucas! Sou seu copiloto de inteligência financeira. Posso analisar seus limites de crédito, prever despesas do mês e sugerir alocações. Como posso ajudar?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsStreaming(true);

    // Placeholder para a resposta em streaming
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetchWithTimeout('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText }),
        timeoutMs: 15000,
      });

      if (!res.body) throw new Error('Sem stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: accumulated,
          };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Desculpe, ocorreu um erro ao gerar a análise. Tente novamente.' },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-[28px] bg-white dark:bg-card border border-slate-100 dark:border-border shadow-2xl overflow-hidden flex flex-col h-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-border bg-slate-50/50 dark:bg-card/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FF5722] text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Centrior AI Advisor
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Streaming Token a Token (Regra 13)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Messages Canvas */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                'flex gap-2.5 max-w-[88%]',
                m.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              )}
            >
              <div
                className={cn(
                  'h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-xs',
                  m.role === 'assistant'
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-slate-900 text-white dark:bg-primary'
                )}
              >
                {m.role === 'assistant' ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
              </div>
              <div
                className={cn(
                  'p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap',
                  m.role === 'assistant'
                    ? 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-border'
                    : 'bg-slate-900 text-white dark:bg-primary'
                )}
              >
                {m.content || (
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Gerando resposta...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-border bg-slate-50/30 dark:bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre seus saldos, orçamentos ou faturas..."
              disabled={isStreaming}
              className="flex-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-border px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] shadow-xs"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF5722] text-white disabled:opacity-50 hover:opacity-90 shadow-xs transition-opacity"
            >
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

