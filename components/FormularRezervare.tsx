'use client';

import { useState } from 'react';

// Ore din 30 în 30, 10:00–22:00
const ORE_DISPONIBILE: string[] = [];
for (let h = 10; h <= 22; h++) {
  ORE_DISPONIBILE.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 22) ORE_DISPONIBILE.push(`${String(h).padStart(2, '0')}:30`);
}

const ZILE = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'];
const LUNI = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
               'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

function formatData(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatAfisat(s: string) {
  if (!s) return '';
  const [y, m, z] = s.split('-');
  return `${z} ${LUNI[parseInt(m) - 1]} ${y}`;
}

// Clase reutilizabile
const btnPrimary = 'w-full py-4 text-white font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary = 'flex-1 py-4 font-semibold rounded-xl border transition-colors';
const inputCls = 'w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 placeholder-white/40 text-white';

export default function FormularRezervare() {
  const azi = new Date(); azi.setHours(0, 0, 0, 0);
  const maxData = new Date(azi); maxData.setMonth(maxData.getMonth() + 6);

  const [pas, setPas] = useState(1);
  const [trimis, setTrimis] = useState(false);
  const [eroare, setEroare] = useState('');
  const [incarcare, setIncarcare] = useState(false);
  const [luna, setLuna] = useState(new Date(azi.getFullYear(), azi.getMonth(), 1));

  const [date, setDate] = useState({
    data: '', ora: '', numar_persoane: 2,
    nume: '', email: '', telefon: '',
  });

  const mergeLaPas = (n: number) => { setEroare(''); setPas(n); };

  // Calendar
  const zileLunii = () => {
    const prima = new Date(luna.getFullYear(), luna.getMonth(), 1);
    const ultima = new Date(luna.getFullYear(), luna.getMonth() + 1, 0);
    const start = (prima.getDay() + 6) % 7;
    const zile: (Date | null)[] = Array(start).fill(null);
    for (let i = 1; i <= ultima.getDate(); i++)
      zile.push(new Date(luna.getFullYear(), luna.getMonth(), i));
    return zile;
  };

  const lunaPrev = () => {
    const n = new Date(luna); n.setMonth(n.getMonth() - 1);
    if (n >= new Date(azi.getFullYear(), azi.getMonth(), 1)) setLuna(n);
  };
  const lunaNext = () => {
    const n = new Date(luna); n.setMonth(n.getMonth() + 1);
    if (n <= new Date(maxData.getFullYear(), maxData.getMonth(), 1)) setLuna(n);
  };

  const urmatoarele14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(azi); d.setDate(d.getDate() + i); return d;
  });

  const handleTrimite = async () => {
    setIncarcare(true); setEroare('');
    try {
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nume: date.nume, email: date.email, telefon: date.telefon,
          numar_persoane: date.numar_persoane, data: date.data, ora: date.ora,
        }),
      });
      const r = await res.json();
      if (r.succes) setTrimis(true);
      else setEroare(r.mesaj);
    } catch { setEroare('A apărut o eroare. Încearcă din nou.'); }
    setIncarcare(false);
  };

  const rezervareNoua = () => {
    setTrimis(false); setPas(1); setEroare('');
    setDate({ data: '', ora: '', numar_persoane: 2, nume: '', email: '', telefon: '' });
  };

  // Stiluri glassmorphism
  const glass = {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.15)',
  };

  if (trimis) {
    return (
      <div className="p-10 text-center">
        <div className="text-5xl mb-5">☕</div>
        <h2 className="text-2xl font-bold text-white mb-2">Rezervare confirmată!</h2>
        <p className="text-teal-300 mb-1">
          <strong>{formatAfisat(date.data)}</strong> · <strong>{date.ora}</strong>
        </p>
        <p className="text-teal-300 mb-2">
          <strong>{date.numar_persoane} {date.numar_persoane === 1 ? 'persoană' : 'persoane'}</strong>
        </p>
        <p className="text-white/50 text-sm mb-8">Confirmarea va fi trimisă la <strong className="text-white/70">{date.email}</strong></p>
        <button onClick={rezervareNoua}
          className="px-8 py-3 font-semibold rounded-xl text-white transition-all hover:scale-105"
          style={{ background: 'rgba(249,115,22,0.85)', border: '1px solid rgba(249,115,22,0.5)' }}>
          + Rezervare nouă
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* PAȘI */}
      <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {[{ nr: 1, label: 'Data' }, { nr: 2, label: 'Ora' }, { nr: 3, label: 'Detalii' }].map((p) => (
          <div key={p.nr} className="flex-1 py-4 text-center text-sm font-medium transition-all"
            style={{
              color: pas === p.nr ? '#14B8A6' : pas > p.nr ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
              borderBottom: pas === p.nr ? '2px solid #14B8A6' : '2px solid transparent',
            }}>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-1 font-bold"
              style={{
                background: pas === p.nr ? '#14B8A6' : pas > p.nr ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)',
                color: pas >= p.nr ? 'white' : 'rgba(255,255,255,0.3)',
              }}>{p.nr}</span>
            {p.label}
          </div>
        ))}
      </div>

      <div className="p-6">

        {/* PAS 1 — DATA */}
        {pas === 1 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-5">Alege data</h2>

            {/* Butoane rapide */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
              {urmatoarele14.map((d) => {
                const str = formatData(d);
                const activ = date.data === str;
                return (
                  <button key={str}
                    onClick={() => { setDate({ ...date, data: str }); setLuna(new Date(d.getFullYear(), d.getMonth(), 1)); }}
                    className="flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
                    style={activ
                      ? { background: '#14B8A6', color: 'white' }
                      : { ...glass, color: 'rgba(255,255,255,0.8)' }}>
                    <span className="text-[10px] uppercase">{ZILE[(d.getDay() + 6) % 7]}</span>
                    <span className="text-base font-bold">{d.getDate()}</span>
                    {formatData(d) === formatData(azi) && <span className="text-[9px]">azi</span>}
                  </button>
                );
              })}
            </div>

            {/* Calendar */}
            <div className="rounded-2xl p-4 mb-6" style={glass}>
              <div className="flex items-center justify-between mb-4">
                <button onClick={lunaPrev}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xl">‹</button>
                <span className="font-semibold text-white">{LUNI[luna.getMonth()]} {luna.getFullYear()}</span>
                <button onClick={lunaNext}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xl">›</button>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {ZILE.map((z) => <div key={z} className="text-center text-xs font-medium py-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{z}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {zileLunii().map((d, i) => {
                  if (!d) return <div key={i} />;
                  const str = formatData(d);
                  const disabled = d < azi || d > maxData;
                  const selectat = date.data === str;
                  const eAzi = str === formatData(azi);
                  return (
                    <button key={str} disabled={disabled}
                      onClick={() => setDate({ ...date, data: str })}
                      className="aspect-square rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: selectat ? '#14B8A6' : eAzi ? 'rgba(20,184,166,0.15)' : 'transparent',
                        color: selectat ? 'white' : disabled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.85)',
                        border: eAzi && !selectat ? '1px solid #14B8A6' : '1px solid transparent',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                      }}>
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={() => mergeLaPas(2)} disabled={!date.data}
              className={btnPrimary}
              style={{ background: date.data ? '#14B8A6' : undefined }}>
              Continuă →
            </button>
          </div>
        )}

        {/* PAS 2 — ORA */}
        {pas === 2 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Alege ora</h2>
            <p className="text-sm mb-5" style={{ color: '#5EEAD4' }}>{formatAfisat(date.data)}</p>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {ORE_DISPONIBILE.map((ora) => (
                <button key={ora} onClick={() => setDate({ ...date, ora })}
                  className="py-3 rounded-xl font-medium text-sm transition-all hover:scale-105"
                  style={date.ora === ora
                    ? { background: '#F97316', color: 'white', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }
                    : { ...glass, color: 'rgba(255,255,255,0.8)' }}>
                  {ora}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => mergeLaPas(1)}
                className={btnSecondary}
                style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}>
                ← Înapoi
              </button>
              <button onClick={() => mergeLaPas(3)} disabled={!date.ora}
                className={btnSecondary}
                style={{ background: date.ora ? '#14B8A6' : undefined, color: 'white', borderColor: 'transparent' }}>
                Continuă →
              </button>
            </div>
          </div>
        )}

        {/* PAS 3 — DETALII */}
        {pas === 3 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Detaliile tale</h2>
            <p className="text-sm mb-5" style={{ color: '#5EEAD4' }}>{formatAfisat(date.data)} · {date.ora}</p>

            <div className="space-y-3 mb-5">
              {[
                { key: 'nume', label: 'Nume complet', type: 'text', placeholder: 'ex: Maria Ionescu' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'ex: maria@email.com' },
                { key: 'telefon', label: 'Telefon', type: 'tel', placeholder: 'ex: 0722 123 456' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{label} *</label>
                  <input type={type} placeholder={placeholder}
                    value={date[key as keyof typeof date] as string}
                    onChange={(e) => setDate({ ...date, [key]: e.target.value })}
                    className={inputCls}
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', focusRingColor: '#14B8A6' } as React.CSSProperties} />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Număr de persoane *</label>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <button key={n} onClick={() => setDate({ ...date, numar_persoane: n })}
                      className="py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
                      style={date.numar_persoane === n
                        ? { background: '#F97316', color: 'white' }
                        : { ...glass, color: 'rgba(255,255,255,0.8)' }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {eroare && <p className="text-red-400 text-sm mb-4">{eroare}</p>}

            <div className="flex gap-3">
              <button onClick={() => mergeLaPas(2)}
                className={btnSecondary}
                style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}>
                ← Înapoi
              </button>
              <button onClick={handleTrimite}
                disabled={!date.nume || !date.email || !date.telefon || incarcare}
                className={btnSecondary}
                style={{ background: '#F97316', color: 'white', borderColor: 'transparent', opacity: (!date.nume || !date.email || !date.telefon || incarcare) ? 0.4 : 1 }}>
                {incarcare ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Se trimite...
                  </span>
                ) : 'Confirmă rezervarea'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
