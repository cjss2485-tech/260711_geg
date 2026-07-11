import React, { useEffect } from "react";
import Image from "next/image";

// Type definition for pokemon details passed to modal
export interface PokemonDetail {
  id: number;
  name: string;
  koreanName: string;
  types: string[];
  imageUrl: string;
  height: number; // in decimeters
  weight: number; // in hectograms
  stats: {
    name: string;
    value: number;
  }[];
}

interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  onClose: () => void;
}

const TYPE_TRANSLATIONS: Record<string, { ko: string; color: string }> = {
  normal: { ko: "노멀", color: "bg-slate-400 text-white" },
  fire: { ko: "불꽃", color: "bg-red-500 text-white" },
  water: { ko: "물", color: "bg-blue-500 text-white" },
  grass: { ko: "풀", color: "bg-green-500 text-white" },
  electric: { ko: "전기", color: "bg-amber-400 text-slate-800" },
  ice: { ko: "얼음", color: "bg-cyan-400 text-white" },
  fighting: { ko: "격투", color: "bg-orange-600 text-white" },
  poison: { ko: "독", color: "bg-purple-500 text-white" },
  ground: { ko: "땅", color: "bg-amber-700 text-white" },
  flying: { ko: "비행", color: "bg-indigo-400 text-white" },
  psychic: { ko: "에스퍼", color: "bg-pink-500 text-white" },
  bug: { ko: "벌레", color: "bg-lime-500 text-white" },
  rock: { ko: "바위", color: "bg-stone-500 text-white" },
  ghost: { ko: "고스트", color: "bg-violet-700 text-white" },
  dragon: { ko: "드래곤", color: "bg-indigo-700 text-white" },
  steel: { ko: "강철", color: "bg-zinc-400 text-white" },
  fairy: { ko: "페어리", color: "bg-rose-400 text-white" },
  dark: { ko: "악", color: "bg-slate-800 text-white" },
};

const STAT_TRANSLATIONS: Record<string, string> = {
  hp: "체력 (HP)",
  attack: "공격력",
  defense: "방어력",
  "special-attack": "특수공격",
  "special-defense": "특수방어",
  speed: "스피드",
};

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (pokemon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [pokemon]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!pokemon) return null;

  const formattedId = `#${String(pokemon.id).padStart(4, "0")}`;
  const heightM = pokemon.height / 10;
  const weightKg = pokemon.weight / 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-in max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
          aria-label="닫기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Left Side: Pokemon Image Area */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-poke-lightblue/50 via-poke-lightyellow/20 to-transparent p-8 flex flex-col items-center justify-center relative min-h-[250px] md:min-h-[400px]">
          {/* Decorative radial background shape */}
          <div className="absolute w-[80%] h-[80%] rounded-full bg-white/40 blur-md -z-10" />
          
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.koreanName}
              width={300}
              height={300}
              className="object-contain w-full h-full drop-shadow-xl"
              priority
            />
          </div>
          <span className="mt-4 font-black text-2xl text-poke-blue/40 tracking-wider">
            {formattedId}
          </span>
        </div>

        {/* Right Side: Detailed Info Area */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="mb-4">
              <h2 className="text-3xl font-black text-slate-800 flex items-baseline gap-2">
                {pokemon.koreanName}
              </h2>
              <span className="text-sm font-semibold text-slate-400 capitalize">
                {pokemon.name}
              </span>
            </div>

            {/* Type Badges */}
            <div className="flex gap-2 mb-6">
              {pokemon.types.map((type) => {
                const info = TYPE_TRANSLATIONS[type] || { ko: type, color: "bg-slate-400" };
                return (
                  <span
                    key={type}
                    className={`px-3.5 py-1 text-xs font-black rounded-full shadow-sm ${info.color}`}
                  >
                    {info.ko}
                  </span>
                );
              })}
            </div>

            {/* Physical Traits Card */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
              <div className="text-center">
                <span className="block text-xs font-bold text-slate-400 mb-1">키 (Height)</span>
                <span className="text-lg font-black text-slate-700">{heightM} m</span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="block text-xs font-bold text-slate-400 mb-1">몸무게 (Weight)</span>
                <span className="text-lg font-black text-slate-700">{weightKg} kg</span>
              </div>
            </div>

            {/* Stats list */}
            <div>
              <h3 className="text-sm font-black text-slate-600 mb-3 tracking-wide">기본 능력치</h3>
              <div className="space-y-2.5">
                {pokemon.stats.map((stat) => {
                  const translatedName = STAT_TRANSLATIONS[stat.name] || stat.name;
                  // Cap stats visually at 150 for progression bar percentage calculation
                  const percentage = Math.min(100, (stat.value / 150) * 100);
                  
                  return (
                    <div key={stat.name} className="flex items-center gap-3">
                      <span className="w-20 text-xs font-bold text-slate-500 shrink-0">
                        {translatedName}
                      </span>
                      <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-poke-blue rounded-full transition-all duration-500 shadow-inner"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs font-black text-slate-700">
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Backdrop overlay listener */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
      
    </div>
  );
};
