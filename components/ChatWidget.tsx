'use client';

import { useState, useRef, useEffect } from 'react';

type Mesaj = {
  rol: 'user' | 'assistant';
  text: string;
};

export default function ChatWidget() {
  const [deschis, setDeschis] = useState(false);
  const [mesaje, setMesaje] = useState<Mesaj[]>([
    { rol: 'assistant', text: 'Salut! Sunt Alex, barista tău virtual ☕ Cu ce te pot ajuta azi?' },
  ]);
  const [input, setInput] = useState('');
  const [incarcare, setIncarcare] = useState(false);
  const mesajeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mesajeRef.current) {
      mesajeRef.current.scrollTop = mesajeRef.current.scrollHeight;
    }
  }, [mesaje]);

  const trimite = async () => {
    const text = input.trim();
    if (!text || incarcare) return;

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
    } catch {
      setMesaje([...mesajeNoi, { rol: 'assistant', text: 'Ups, ceva nu a mers 😅 Încearcă din nou!' }]);
    } finally {
      setIncarcare(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      trimite();
    }
  };

  return (
    <>
      {/* FEREASTRA CHAT */}
      {deschis && (
        <div
          className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: '480px',
            background: 'rgba(15, 20, 30, 0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(20,184,166,0.3)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(20,184,166,0.12)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'rgba(20,184,166,0.25)', border: '1px solid rgba(20,184,166,0.4)' }}>
                ☕
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Alex</p>
                <p className="text-xs" style={{ color: '#5EEAD4' }}>Barista virtual • Online</p>
              </div>
            </div>
            <button
              onClick={() => setDeschis(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
              ✕
            </button>
          </div>

          {/* MESAJE */}
          <div ref={mesajeRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(20,184,166,0.3) transparent' }}>
            {mesaje.map((m, i) => (
              <div key={i} className={`flex ${m.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={m.rol === 'user'
                    ? { background: '#14B8A6', color: 'white', borderBottomRightRadius: '4px' }
                    : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.9)', borderBottomLeftRadius: '4px' }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {incarcare && (
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl text-sm" style={{ background: 'rgba(255,255,255,0.08)', borderBottomLeftRadius: '4px' }}>
                  <span className="flex gap-1 items-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>•</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>•</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>•</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="px-4 py-3 flex gap-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <button
              onClick={trimite}
              disabled={!input.trim() || incarcare}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
              style={{ background: '#14B8A6' }}>
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
        onClick={() => setDeschis(!deschis)}
        className="fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
        style={{
          background: deschis ? '#0D9488' : '#14B8A6',
          boxShadow: deschis
            ? '0 4px 20px rgba(20,184,166,0.4)'
            : '0 4px 20px rgba(20,184,166,0.5)',
          animation: deschis ? 'none' : 'pulse-chat 2s ease-in-out infinite',
        }}
        aria-label="Deschide chat"
      >
        {deschis ? '✕' : '☕'}
      </button>

      <style>{`
        @keyframes pulse-chat {
          0%, 100% { box-shadow: 0 4px 20px rgba(20,184,166,0.5), 0 0 0 0 rgba(20,184,166,0.4); }
          50% { box-shadow: 0 4px 20px rgba(20,184,166,0.5), 0 0 0 10px rgba(20,184,166,0); }
        }
      `}</style>
    </>
  );
}
