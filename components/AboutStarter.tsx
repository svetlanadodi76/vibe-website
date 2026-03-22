export default function AboutStarter() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Imagine */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src="/hero-bg.png"
            alt="Barista Vibe Caffe"
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-amber-600 text-sm uppercase tracking-widest font-medium mb-3">
            Povestea noastra
          </p>
          <h2 className="text-4xl font-bold text-amber-900 mb-6 leading-tight">
            Mai mult decât o cafea
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Vibe Caffè s-a născut din dragostea pentru cafea autentică — nu doar ca băutură, ci ca experiență. Din 2012, suntem locul unde oamenii se întâlnesc, creează, lucrează și se reconectează.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Credem că o cafea bună nu se grăbește. De aceea, fiecare ceașcă este pregătită cu atenție, respectând procesul și povestea din spatele fiecărei boabe.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Selectăm cafeaua direct de la ferme certificate, unde calitatea nu este compromisă. O prăjim săptămânal, în loturi mici, pentru a păstra prospețimea și a evidenția aromele reale — exact așa cum au fost gândite de natură.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dar Vibe Caffè nu este doar despre cafea. Este despre momentul în care încetinești, despre conversații sincere și despre acel „ceva" care te face să revii.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 italic font-medium text-amber-800">
            Vibe Caffè — locul unde cafeaua devine ritual.
          </p>

          {/* 3 valori */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { numar: "12+", label: "Ani experienta" },
              { numar: "500+", label: "Clienti zilnic" },
              { numar: "4.9", label: "Rating mediu" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-amber-50 rounded-xl">
                <div className="text-2xl font-bold text-amber-800">{stat.numar}</div>
                <div className="text-xs text-amber-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
