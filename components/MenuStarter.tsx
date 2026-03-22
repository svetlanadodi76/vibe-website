'use client';

import { useState, useEffect } from 'react';

const menuItems = [
  { name: "Espresso", price: 12, description: "Shot dublu intens, aromat", category: "Cafea",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop" },
  { name: "Cappuccino", price: 18, description: "Espresso cu spuma cremoasa de lapte", category: "Cafea",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop" },
  { name: "Latte", price: 20, description: "Espresso delicat cu lapte texturizat", category: "Cafea",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop" },
  { name: "Flat White", price: 22, description: "Ristretto cu microspuma cremoasa", category: "Cafea",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop" },
  { name: "Cold Brew", price: 22, description: "Extractie la rece 18 ore", category: "Cold",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop" },
  { name: "Iced Latte", price: 22, description: "Latte racit cu gheata", category: "Cold",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop" },
  { name: "Cold Brew Tonic", price: 26, description: "Cold brew cu apa tonica", category: "Cold",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&auto=format&fit=crop" },
  { name: "Croissant", price: 16, description: "Proaspat copt in fiecare dimineata", category: "Patiserie",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop" },
  { name: "Tiramisu", price: 28, description: "Reteta italiana clasica", category: "Patiserie",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop" },
  { name: "Cheesecake", price: 30, description: "Cremos cu fructe de padure", category: "Patiserie",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop" },
  { name: "Cinnamon Roll", price: 22, description: "Rulou nordic cu scortisoara", category: "Patiserie",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&auto=format&fit=crop" },
];

const categories = [
  { label: "Toate", emoji: "✨" },
  { label: "Cafea", emoji: "☕" },
  { label: "Cold", emoji: "🧊" },
  { label: "Patiserie", emoji: "🥐" },
];

export default function MenuStarter() {
  const [active, setActive] = useState("Toate");
  const [fadeIn, setFadeIn] = useState(true);

  const filtered = active === "Toate"
    ? menuItems
    : menuItems.filter((item) => item.category === active);

  const handleCategoryChange = (label: string) => {
    setFadeIn(false);
    setTimeout(() => {
      setActive(label);
      setFadeIn(true);
    }, 150);
  };

  return (
    <section id="meniu" className="py-20 px-6 bg-amber-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-amber-900 mb-4">
          Meniul nostru
        </h2>
        <p className="text-center text-amber-700 mb-10">
          Preparate cu pasiune, servite cu drag
        </p>

        {/* TAB-URI */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryChange(cat.label)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                active === cat.label
                  ? "bg-amber-800 text-white shadow-md scale-105"
                  : "bg-white text-amber-800 border border-amber-300 hover:bg-gray-100"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* CARDURI PRODUSE */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* IMAGINE */}
              <div className="aspect-[4/3] overflow-hidden rounded-xl m-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* TEXT + PRET */}
              <div className="px-5 pb-5 flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-lg text-amber-900">{item.name}</h3>
                  <p className="text-amber-600 text-sm mt-1">{item.description}</p>
                </div>
                <span className="font-bold text-amber-800 text-lg ml-4 whitespace-nowrap bg-amber-100 px-3 py-1 rounded-full">
                  {item.price} lei
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
