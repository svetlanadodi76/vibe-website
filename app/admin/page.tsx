import AdminRezervari from '@/components/AdminRezervari';

export default function PaginaAdmin() {
  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{
        backgroundImage: "url('/coffee-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 fixed" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-1">Admin — Rezervări</h1>
          <p style={{ color: '#5EEAD4' }}>Gestionează toate rezervările Vibe Caffè</p>
        </div>
        <AdminRezervari />
      </div>
    </main>
  );
}
