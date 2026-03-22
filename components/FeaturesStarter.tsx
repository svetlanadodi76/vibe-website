'use client';

import { useEffect, useRef, useState } from 'react';

export default function FeaturesStarter() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* TITLU */}
        <h2 className="text-5xl font-bold text-center text-amber-900 mb-4">
          De ce Vibe Coffee?
        </h2>
        <p className="text-center text-amber-700 text-lg mb-14">
          Experiență unică, ingrediente premium, atmosferă perfectă
        </p>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD MARE - stanga */}
          <div
            className="md:row-span-2 bg-white rounded-3xl overflow-hidden shadow-sm border border-amber-100 hover:shadow-xl transition-all duration-300 group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 600ms ease, transform 600ms ease',
              transitionDelay: '0ms',
            }}
          >
            <div className="h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop"
                alt="Cafea Gourmet"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-8">
              <span className="text-4xl mb-4 block">☕</span>
              <h3 className="text-3xl font-bold text-amber-900 mb-3">Cafea Gourmet</h3>
              <p className="text-amber-700 text-lg leading-relaxed">
                Selectăm manual boabele din cele mai bune origini single estate.
                Fiecare lot este prăjit săptămânal pentru a păstra prospețimea și
                complexitatea aromelor.
              </p>
            </div>
          </div>

          {/* CARD MIC - sus dreapta */}
          <div
            className="bg-amber-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 600ms ease, transform 600ms ease',
              transitionDelay: '150ms',
            }}
          >
            <div className="h-40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop"
                alt="Bunătăți de Casă"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <span className="text-3xl mb-3 block">🥐</span>
              <h3 className="text-2xl font-bold text-white mb-2">Bunătăți de Casă</h3>
              <p className="text-amber-200 leading-relaxed">
                Coapte zilnic din ingrediente naturale, fără conservanți.
              </p>
            </div>
          </div>

          {/* CARD MIC - jos dreapta */}
          <div
            className="bg-amber-50 rounded-3xl overflow-hidden shadow-sm border border-amber-200 hover:shadow-xl transition-all duration-300 group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 600ms ease, transform 600ms ease',
              transitionDelay: '300ms',
            }}
          >
            <div className="h-40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop"
                alt="Refugiu Zilnic"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <span className="text-3xl mb-3 block">🌿</span>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Refugiu Zilnic</h3>
              <p className="text-amber-700 leading-relaxed">
                Lumină caldă, muzică selectată și colțuri confortabile pentru lucru sau relaxare.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
