export default function HeroStarter() {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/coffee-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(61,31,10,0.50) 0%, rgba(139,94,60,0.35) 100%)" }} />

      {/* CONTINUT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">

        {/* VIDEO MIC - stanga */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/30 aspect-square">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* TEXT - dreapta */}
        <div className="text-center md:text-left">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "#FDF6EC", textShadow: "0 2px 8px rgba(61,31,10,0.6)" }}
          >
            Începe ziua cu un moment pentru tine.
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium" style={{ color: "#FDF6EC", textShadow: "0 2px 6px rgba(61,31,10,0.5)" }}>
            Unde fiecare vizită devine o poveste de spus
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#meniu"
              className="btn-shimmer inline-block px-8 py-4 font-semibold rounded-xl transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              Savurează momentul
            </a>
            <a
              href="#contact"
              className="btn-shimmer inline-block px-8 py-4 font-semibold rounded-xl transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              Contactează-ne
            </a>
            <a
              href="/rezervari"
              className="inline-block px-8 py-4 font-semibold rounded-xl transition-transform duration-150 hover:scale-105 active:scale-95 border-2"
              style={{ color: "#FDF6EC", borderColor: "rgba(253,246,236,0.6)", background: "rgba(253,246,236,0.1)" }}
            >
              Rezervă o masă
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}