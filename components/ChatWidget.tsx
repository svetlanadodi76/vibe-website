'use client';

import { useState, useRef, useEffect } from 'react';

type Mesaj = {
  rol: 'user' | 'assistant';
  text: string;
};

type Context = 'initial' | 'meniu' | 'rezervari' | 'none';

function renderText(text: string) {
  // Convertește [text](url) în <a> clickabil
  const parts = text.split(/(\[([^\]]+)\]\(([^)]+)\))/g);
  const result: React.ReactNode[] = [];
  let i = 0;
  while (i < parts.length) {
    if (parts[i].match(/^\[([^\]]+)\]\(([^)]+)\)$/)) {
      const match = parts[i].match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      result.push(
        <a key={i} href={match[2]}
          className="underline font-medium"
          style={{ color: '#F0C98A' }}>
          {match[1]}
        </a>
      );
    } else if (parts[i]) {
      result.push(<span key={i}>{parts[i]}</span>);
    }
    i++;
  }
  return result;
}

const QUICK_REPLIES: Record<Context, { label: string; mesaj: string }[]> = {
  initial: [
    { label: '🍽 Vezi meniu',    mesaj: 'Ce produse aveți în meniu?' },
    { label: '⭐ Recomandări',   mesaj: 'Ce îmi recomandați?' },
    { label: '📅 Rezervări',     mesaj: 'Cum pot face o rezervare?' },
    { label: '🕐 Program',       mesaj: 'Ce program aveți?' },
  ],
  meniu: [
    { label: '🌱 Opțiuni vegane', mesaj: 'Aveți opțiuni vegane?' },
    { label: '🍰 Deserturi',      mesaj: 'Ce deserturi aveți?' },
    { label: '🧊 Cafea rece',     mesaj: 'Ce băuturi reci aveți?' },
  ],
  rezervari: [
    { label: '📝 Fă o rezervare', mesaj: 'Vreau să fac o rezervare' },
    { label: '🕐 Program',        mesaj: 'Ce program aveți?' },
  ],
  none: [],
};

function detectContext(text: string): Context {
  const t = text.toLowerCase();
  if (t.includes('meniu') || t.includes('produs') || t.includes('cafea') || t.includes('desert') || t.includes('vegan') || t.includes('rece') || t.includes('cold') || t.includes('espresso') || t.includes('cappuccino') || t.includes('latte')) return 'meniu';
  if (t.includes('rezerv') || t.includes('masă') || t.includes('loc') || t.includes('book')) return 'rezervari';
  return 'none';
}

export default function ChatWidget() {
  const [deschis, setDeschis] = useState(false);
  const [minimizat, setMinimizat] = useState(false);
  const [mesaje, setMesaje] = useState<Mesaj[]>([
    { rol: 'assistant', text: 'Salut! Sunt Alex, barista tău virtual ☕ Cu ce te pot ajuta azi?' },
  ]);
  const [input, setInput] = useState('');
  const [incarcare, setIncarcare] = useState(false);
  const [context, setContext] = useState<Context>('initial');
  const [userAScris, setUserAScris] = useState(false);
  const mesajeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mesajeRef.current) {
      mesajeRef.current.scrollTop = mesajeRef.current.scrollHeight;
    }
  }, [mesaje]);

  const trimiteText = async (text: string, esteQuickReply = false) => {
    if (!text || incarcare) return;

    // Dacă userul scrie manual, ascunde butoanele
    if (!esteQuickReply) setUserAScris(true);

    const mesajeNoi: Mesaj[] = [...mesaje, { rol: 'user', text }];
    setMesaje(mesajeNoi);
    setInput('');
    setIncarcare(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mesaje: mesajeNoi }),
      });
      const data = await res.json();
      setMesaje([...mesajeNoi, { rol: 'assistant', text: data.raspuns }]);

      // Detectează context din mesajul userului pentru butoane contextuale
      const ctx = detectContext(text);
      setContext(ctx === 'none' ? 'none' : ctx);
    } catch {
      setMesaje([...mesajeNoi, { rol: 'assistant', text: 'Ups, ceva nu a mers 😅 Încearcă din nou!' }]);
    } finally {
      setIncarcare(false);
    }
  };

  const trimite = () => {
    const text = input.trim();
    if (!text) return;
    trimiteText(text, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      trimite();
    }
  };

  const quickReplies = userAScris ? QUICK_REPLIES[context] : QUICK_REPLIES['initial'];

  return (
    <>
      {/* FEREASTRA CHAT */}
      {deschis && !minimizat && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden
            inset-0 rounded-none
            md:inset-auto md:bottom-24 md:right-6 md:w-96 md:rounded-2xl"
          style={{
            height: undefined,
            background: 'rgba(10, 15, 25, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid #B8824F',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,130,79,0.15)',
          }}
        >
          {/* HEADER — gradient cu culoarea primară */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              background: 'linear-gradient(135deg, #8B5E3C 0%, #B8824F 100%)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white/20 border border-white/30">
                ☕
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>Alex</p>
                <p className="text-white/70 text-xs">Barista virtual • Online</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMinimizat(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Minimizează">
                ＿
              </button>
              <button
                onClick={() => { setDeschis(false); setMinimizat(false); }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Închide">
                ✕
              </button>
            </div>
          </div>

          {/* MESAJE */}
          <div
            ref={mesajeRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(184,130,79,0.3) transparent' }}
          >
            {mesaje.map((m, i) => (
              <div key={i} className={`flex ${m.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
                  style={m.rol === 'user'
                    ? {
                        background: '#B8824F',
                        color: 'white',
                        borderRadius: '18px 18px 4px 18px',
                        fontFamily: 'var(--font-inter)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.9)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '18px 18px 18px 4px',
                        fontFamily: 'var(--font-inter)',
                      }
                  }
                >
                  {m.rol === 'assistant' ? renderText(m.text) : m.text}
                </div>
              </div>
            ))}
            {incarcare && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-[18px_18px_18px_4px]"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#B8824F', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#B8824F', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#B8824F', animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* QUICK REPLIES */}
          {quickReplies.length > 0 && !incarcare && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
              {quickReplies.map((qr) => (
                <button
                  key={qr.label}
                  onClick={() => trimiteText(qr.mesaj, true)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: 'rgba(184,130,79,0.1)',
                    border: '1px solid #B8824F',
                    color: '#F0C98A',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div
            className="px-4 py-3 flex gap-2 shrink-0"
            style={{ borderTop: '1px solid rgba(184,130,79,0.2)' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(184,130,79,0.25)',
                fontFamily: 'var(--font-inter)',
              }}
            />
            <button
              onClick={trimite}
              disabled={!input.trim() || incarcare}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
              style={{ background: '#B8824F' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* BUTON FLOTANT */}
      <button
        onClick={() => { setDeschis(true); setMinimizat(false); }}
        className="fixed bottom-5 right-5 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
        style={{
          background: deschis && !minimizat
            ? '#8B5E3C'
            : '#B8824F',
          boxShadow: '0 4px 20px rgba(20,184,166,0.5)',
          animation: deschis && !minimizat ? 'none' : 'pulse-chat 2s ease-in-out infinite',
        }}
        aria-label="Deschide chat"
      >
        ☕
        {minimizat && (
          <span
            className="fixed bottom-14 right-3 md:right-5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
            style={{ background: '#F97316', color: 'white' }}
          >
            {mesaje.filter(m => m.rol === 'user').length}
          </span>
        )}
      </button>

      <style>{`
        @keyframes pulse-chat {
          0%, 100% { box-shadow: 0 4px 20px rgba(20,184,166,0.5), 0 0 0 0 rgba(20,184,166,0.4); }
          50%       { box-shadow: 0 4px 20px rgba(20,184,166,0.5), 0 0 0 10px rgba(20,184,166,0); }
        }
      `}</style>
    </>
  );
}
