export default function FooterStarter() {
  return (
    <footer id="contact" className="bg-amber-950 text-white" style={{ scrollMarginTop: '80px' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h3 className="text-2xl font-bold text-amber-300 mb-4">Vibe Caffè</h3>
          <p className="text-amber-100/70 leading-relaxed text-sm">
            Specialty coffee shop in inima orasului. Pasiune in fiecare ceasca, din 2012.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-amber-300 mb-4 uppercase tracking-widest text-sm">
            Program
          </h4>
          <div className="space-y-2 text-sm text-amber-100/70">
            <div className="flex justify-between"><span>Luni - Vineri</span><span>08:00 - 22:00</span></div>
            <div className="flex justify-between"><span>Sambata</span><span>09:00 - 23:00</span></div>
            <div className="flex justify-between"><span>Duminica</span><span>09:00 - 21:00</span></div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-amber-300 mb-4 uppercase tracking-widest text-sm">
            Contact
          </h4>
          <div className="space-y-3 text-sm text-amber-100/70">
            <div>📍 Str. Exemplu nr. 42, Chisinau</div>
            <div>📞 +373 22 123 456</div>
            <div>✉️ hello@vibecaffe.md</div>
          </div>
        </div>

      </div>
      <div className="border-t border-amber-900 py-6 text-center text-amber-100/40 text-sm">
        © 2026 Vibe Caffè. Construit cu Next.js + Tailwind CSS.
      </div>
    </footer>
  );
}