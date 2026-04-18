// ============================================================
// VIBE CAFFÈ — Knowledge Base pentru Barista Bot
// ============================================================

export const menuItems = [
  { name: 'Espresso',         price: 12, category: 'Cafea',     vegan: true,  ingredients: 'Cafea arabica single origin, 18g extract dublu',         description: 'Shot dublu intens, aromat' },
  { name: 'Cappuccino',       price: 18, category: 'Cafea',     vegan: false, ingredients: 'Espresso dublu, lapte integral, spuma cremoasa',          description: 'Espresso cu spuma cremoasa de lapte' },
  { name: 'Latte',            price: 20, category: 'Cafea',     vegan: false, ingredients: 'Espresso dublu, lapte texturizat 200ml',                  description: 'Espresso delicat cu lapte texturizat' },
  { name: 'Flat White',       price: 22, category: 'Cafea',     vegan: false, ingredients: 'Ristretto dublu, microspuma lapte integral',              description: 'Ristretto cu microspuma cremoasa' },
  { name: 'Cold Brew',        price: 22, category: 'Cold',      vegan: true,  ingredients: 'Cafea arabica extractie la rece 18 ore, apa filtrata',    description: 'Extractie la rece 18 ore' },
  { name: 'Iced Latte',       price: 22, category: 'Cold',      vegan: false, ingredients: 'Espresso dublu, lapte rece, gheata',                      description: 'Latte racit cu gheata' },
  { name: 'Cold Brew Tonic',  price: 26, category: 'Cold',      vegan: true,  ingredients: 'Cold brew, apa tonica premium, lamaie',                  description: 'Cold brew cu apa tonica' },
  { name: 'Croissant',        price: 16, category: 'Patiserie', vegan: false, ingredients: 'Faina, unt, lapte, oua — copt proaspat in fiecare dimineata', description: 'Proaspat copt in fiecare dimineata' },
  { name: 'Tiramisu',         price: 28, category: 'Patiserie', vegan: false, ingredients: 'Mascarpone, piscoturi, cafea, oua, cacao',                description: 'Reteta italiana clasica' },
  { name: 'Cheesecake',       price: 30, category: 'Patiserie', vegan: false, ingredients: 'Crema de branza, biscuiti, unt, fructe de padure',        description: 'Cremos cu fructe de padure' },
  { name: 'Cinnamon Roll',    price: 22, category: 'Patiserie', vegan: false, ingredients: 'Aluat dospit, unt, zahar brun, scortisoara, glazura',     description: 'Rulou nordic cu scortisoara' },
];

export const categories = [
  { label: 'Toate',     emoji: '✨' },
  { label: 'Cafea',     emoji: '☕' },
  { label: 'Cold',      emoji: '🧊' },
  { label: 'Patiserie', emoji: '🥐' },
];

export const cafeneaInfo = {
  nume: 'Vibe Caffè',
  slogan: 'Locul unde cafeaua devine ritual',
  program: {
    zilnic: '08:00 – 22:00',
    observatii: 'Deschis 7 zile din 7, inclusiv sărbători legale',
  },
  locatie: {
    adresa: 'Strada Cafelei 12, Chișinău',
    indicatii: 'Lângă Parcul Central, la parterul clădirii cu vitrine mari',
  },
  facilitati: [
    'WiFi gratuit de mare viteză',
    'Pet-friendly — animăluțele sunt binevenite',
    'Prize și spații de lucru',
    'Loc de joacă pentru copii în weekend',
    'Terasă în aer liber (sezon mai–octombrie)',
    'Plată cu cardul',
  ],
  contact: {
    telefon: '+373 69 000 000',
    email: 'hello@vibecaffe.md',
    instagram: '@vibecaffe',
  },
  rezervari: {
    online: 'vibe-website-two.vercel.app/rezervari',
    observatii: 'Rezervările se fac cu maxim 6 luni în avans, minim 1 persoană, maxim 12',
  },
};

// ============================================================
// RECOMANDĂRI
// ============================================================

const pretMin = Math.min(...menuItems.map(i => i.price));
const pretMax = Math.max(...menuItems.map(i => i.price));

export const recomandari = {
  cel_mai_popular:  menuItems.find(i => i.name === 'Cappuccino')!,
  cel_mai_ieftin:   menuItems.find(i => i.price === pretMin)!,
  cel_mai_scump:    menuItems.find(i => i.price === pretMax)!,
  optiuni_vegane:   menuItems.filter(i => i.vegan),
  sub_20_lei:       menuItems.filter(i => i.price < 20),
};

// ============================================================
// KNOWLEDGE BASE — string complet pentru system prompt
// ============================================================

export const KNOWLEDGE_BASE = `
Ești Alex, barista și asistentul virtual al cafenelei ${cafeneaInfo.nume}.
Personalitate: casual, jovial, ca un prieten care știe cafea. Folosești ocazional emoji-uri.
Răspunzi DOAR în română, ești scurt și direct — maxim 3-4 propoziții per răspuns.
Pui câte o întrebare scurtă la final când e natural (ex: "Vii prima dată la noi?").
Nu inventezi informații, prețuri sau opțiuni care nu sunt în meniu — dacă nu știi ceva, spui sincer că nu ești sigur.

=== DESPRE CAFENEA ===
Nume: ${cafeneaInfo.nume}
Slogan: "${cafeneaInfo.slogan}"
Adresă: ${cafeneaInfo.locatie.adresa}
Indicații: ${cafeneaInfo.locatie.indicatii}
Program: ${cafeneaInfo.program.zilnic} (${cafeneaInfo.program.observatii})
Telefon: ${cafeneaInfo.contact.telefon}
Email: ${cafeneaInfo.contact.email}
Instagram: ${cafeneaInfo.contact.instagram}

=== FACILITĂȚI ===
${cafeneaInfo.facilitati.map(f => `• ${f}`).join('\n')}

=== REZERVĂRI ===
Rezervări online: ${cafeneaInfo.rezervari.online}
${cafeneaInfo.rezervari.observatii}

=== MENIU COMPLET ===
${menuItems.map(i =>
  `• ${i.name} — ${i.price} lei | ${i.category}${i.vegan ? ' 🌱 vegan' : ''}
   Descriere: ${i.description}
   Ingrediente: ${i.ingredients}`
).join('\n')}

=== CATEGORII ===
${categories.map(c => `${c.emoji} ${c.label}`).join(' | ')}

=== RECOMANDĂRI ===
• Cel mai popular: ${recomandari.cel_mai_popular.name} (${recomandari.cel_mai_popular.price} lei)
• Cel mai ieftin: ${recomandari.cel_mai_ieftin.name} (${recomandari.cel_mai_ieftin.price} lei)
• Cel mai scump: ${recomandari.cel_mai_scump.name} (${recomandari.cel_mai_scump.price} lei)
• Opțiuni vegane: ${recomandari.optiuni_vegane.map(i => i.name).join(', ')}
• Sub 20 lei: ${recomandari.sub_20_lei.map(i => `${i.name} (${i.price} lei)`).join(', ')}
`.trim();
