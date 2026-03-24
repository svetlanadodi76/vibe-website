'use client';

import { useEffect, useState } from 'react';

type Rezervare = {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  numar_persoane: number;
  data: string;
  ora: string;
  status: string;
  created_at: string;
};

type Filtru = 'toate' | 'în așteptare' | 'confirmat' | 'respins';

const LUNI = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatData(s: string) {
  const [y, m, z] = s.split('-');
  return `${z} ${LUNI[parseInt(m) - 1]} ${y}`;
}

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  'în așteptare': { background: 'rgba(234,179,8,0.2)', color: '#FDE047', border: '1px solid rgba(234,179,8,0.3)' },
  'confirmat':    { background: 'rgba(20,184,166,0.2)', color: '#5EEAD4', border: '1px solid rgba(20,184,166,0.3)' },
  'respins':      { background: 'rgba(239,68,68,0.2)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' },
};

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.12)',
};

export default function AdminRezervari() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [incarcare, setIncarcare] = useState(true);
  const [filtru, setFiltru] = useState<Filtru>('toate');
  const [cautare, setCautare] = useState('');
  const [actiune, setActiune] = useState<number | null>(null);

  const incarcaRezervari = async () => {
    setIncarcare(true);
    const res = await fetch('/api/rezervari/lista');
    const { date } = await res.json();
    setRezervari(date || []);
    setIncarcare(false);
  };

  useEffect(() => { incarcaRezervari(); }, []);

  const schimbaStatus = async (id: number, status: string) => {
    setActiune(id);
    await fetch('/api/rezervari', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await incarcaRezervari();
    setActiune(null);
  };

  const sterge = async (id: number) => {
    if (!confirm('Ești sigură că vrei să ștergi această rezervare?')) return;
    setActiune(id);
    await fetch('/api/rezervari', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await incarcaRezervari();
    setActiune(null);
  };

  const filtrate = rezervari
    .filter((r) => filtru === 'toate' || r.status === filtru)
    .filter((r) => r.nume.toLowerCase().includes(cautare.toLowerCase()));

  const numar = (f: Filtru) => f === 'toate' ? rezervari.length : rezervari.filter(r => r.status === f).length;

  return (
    <div>
      {/* FILTRE + CĂUTARE */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Căutare */}
        <input
          type="text"
          placeholder="Caută după nume..."
          value={cautare}
          onChange={(e) => setCautare(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2"
          style={{ ...glass, focusRingColor: '#14B8A6' } as React.CSSProperties}
        />
        {/* Filtre status */}
        <div className="flex gap-2 flex-wrap">
          {(['toate', 'în așteptare', 'confirmat', 'respins'] as Filtru[]).map((f) => (
            <button key={f} onClick={() => setFiltru(f)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize"
              style={filtru === f
                ? { background: '#14B8A6', color: 'white' }
                : { ...glass, color: 'rgba(255,255,255,0.7)' }}>
              {f} <span className="opacity-60 ml-1">({numar(f)})</span>
            </button>
          ))}
        </div>
      </div>

      {incarcare ? (
        <div className="text-center py-20 text-white/50">Se încarcă...</div>
      ) : filtrate.length === 0 ? (
        <div className="text-center py-20 text-white/40">Nicio rezervare găsită.</div>
      ) : (
        <>
          {/* TABEL — desktop */}
          <div className="hidden md:block rounded-2xl overflow-hidden" style={glass}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                  {['Nume', 'Contact', 'Data & Ora', 'Pers.', 'Status', 'Acțiuni'].map((h) => (
                    <th key={h} className="text-left px-5 py-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrate.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4 font-semibold text-white">{r.nume}</td>
                    <td className="px-5 py-4 text-white/60">
                      <div>{r.email}</div>
                      <div>{r.telefon}</div>
                    </td>
                    <td className="px-5 py-4 text-white/80">
                      <div>{formatData(r.data)}</div>
                      <div className="text-white/50">{r.ora.slice(0, 5)}</div>
                    </td>
                    <td className="px-5 py-4 text-white/80 text-center">{r.numar_persoane}</td>
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={STATUS_STYLE[r.status]}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {r.status !== 'confirmat' && (
                          <button onClick={() => schimbaStatus(r.id, 'confirmat')}
                            disabled={actiune === r.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 disabled:opacity-40"
                            style={{ background: 'rgba(20,184,166,0.2)', color: '#5EEAD4', border: '1px solid rgba(20,184,166,0.3)' }}>
                            ✓ Confirmă
                          </button>
                        )}
                        {r.status !== 'respins' && (
                          <button onClick={() => schimbaStatus(r.id, 'respins')}
                            disabled={actiune === r.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 disabled:opacity-40"
                            style={{ background: 'rgba(239,68,68,0.2)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' }}>
                            ✕ Respinge
                          </button>
                        )}
                        <button onClick={() => sterge(r.id)}
                          disabled={actiune === r.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 disabled:opacity-40"
                          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARDURI — mobil */}
          <div className="md:hidden space-y-4">
            {filtrate.map((r) => (
              <div key={r.id} className="rounded-2xl p-5" style={glass}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-white text-lg">{r.nume}</p>
                    <p className="text-white/50 text-sm">{r.email}</p>
                    <p className="text-white/50 text-sm">{r.telefon}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={STATUS_STYLE[r.status]}>
                    {r.status}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-white/70 mb-4">
                  <span>📅 {formatData(r.data)}</span>
                  <span>🕐 {r.ora.slice(0, 5)}</span>
                  <span>👥 {r.numar_persoane}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {r.status !== 'confirmat' && (
                    <button onClick={() => schimbaStatus(r.id, 'confirmat')} disabled={actiune === r.id}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
                      style={{ background: 'rgba(20,184,166,0.2)', color: '#5EEAD4', border: '1px solid rgba(20,184,166,0.3)' }}>
                      ✓ Confirmă
                    </button>
                  )}
                  {r.status !== 'respins' && (
                    <button onClick={() => schimbaStatus(r.id, 'respins')} disabled={actiune === r.id}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
                      style={{ background: 'rgba(239,68,68,0.2)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' }}>
                      ✕ Respinge
                    </button>
                  )}
                  <button onClick={() => sterge(r.id)} disabled={actiune === r.id}
                    className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-40"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
