import FormularRezervare from '@/components/FormularRezervare';

export default function PaginaRezervari() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{
        backgroundImage: "url('/coffee-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay blur */}
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.35)' }} />

      <div className="relative z-10 w-full max-w-lg">

        {/* Titlu */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Rezervă o masă
          </h1>
          <p style={{ color: '#5EEAD4' }} className="text-lg font-medium">
            Îți rezervăm locul în 3 pași simpli
          </p>
        </div>

        {/* Card formular cu glassmorphism */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <FormularRezervare />
        </div>

      </div>
    </main>
  );
}
