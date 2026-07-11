"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PokemonModal, PokemonDetail } from "./pokemon-modal";

const ITEMS_PER_PAGE = 24;

const TYPES = [
  { id: "all", en: "all", ko: "전체", color: "bg-slate-100 hover:bg-slate-200 text-slate-700 active:bg-slate-300" },
  { id: "normal", en: "normal", ko: "노멀", color: "bg-slate-400 hover:bg-slate-500 text-white" },
  { id: "fire", en: "fire", ko: "불꽃", color: "bg-red-500 hover:bg-red-600 text-white" },
  { id: "water", en: "water", ko: "물", color: "bg-blue-500 hover:bg-blue-600 text-white" },
  { id: "grass", en: "grass", ko: "풀", color: "bg-green-500 hover:bg-green-600 text-white" },
  { id: "electric", en: "electric", ko: "전기", color: "bg-amber-400 hover:bg-amber-500 text-slate-800" },
  { id: "ice", en: "ice", ko: "얼음", color: "bg-cyan-400 hover:bg-cyan-500 text-white" },
  { id: "fighting", en: "fighting", ko: "격투", color: "bg-orange-600 hover:bg-orange-700 text-white" },
  { id: "poison", en: "poison", ko: "독", color: "bg-purple-500 hover:bg-purple-600 text-white" },
  { id: "ground", en: "ground", ko: "땅", color: "bg-amber-700 hover:bg-amber-800 text-white" },
  { id: "flying", en: "flying", ko: "비행", color: "bg-indigo-400 hover:bg-indigo-500 text-white" },
  { id: "psychic", en: "psychic", ko: "에스퍼", color: "bg-pink-500 hover:bg-pink-600 text-white" },
  { id: "bug", en: "bug", ko: "벌레", color: "bg-lime-500 hover:bg-lime-600 text-white" },
  { id: "rock", en: "rock", ko: "바위", color: "bg-stone-500 hover:bg-stone-600 text-white" },
  { id: "ghost", en: "ghost", ko: "고스트", color: "bg-violet-700 hover:bg-violet-850 text-white" },
  { id: "dragon", en: "dragon", ko: "드래곤", color: "bg-indigo-700 hover:bg-indigo-800 text-white" },
  { id: "steel", en: "steel", ko: "강철", color: "bg-zinc-400 hover:bg-zinc-500 text-white" },
  { id: "fairy", en: "fairy", ko: "페어리", color: "bg-rose-400 hover:bg-rose-500 text-white" },
  { id: "dark", en: "dark", ko: "악", color: "bg-slate-800 hover:bg-slate-900 text-white" },
];

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

interface SimplePokemon {
  name: string;
  url: string;
}

export default function DogamPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeType, setActiveType] = useState("all");
  
  const [typePokemonUrls, setTypePokemonUrls] = useState<SimplePokemon[]>([]);
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);

  // Reset pagination when active type filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeType]);

  // Load pokemon list based on page and type
  useEffect(() => {
    let active = true;

    async function loadPokemons() {
      setIsLoading(true);
      setIsError(false);
      try {
        let currentList: SimplePokemon[] = [];
        let count = 0;

        if (activeType === "all") {
          // If All, load general list offset
          const offset = (currentPage - 1) * ITEMS_PER_PAGE;
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
          if (!res.ok) throw new Error("List load error");
          const data = await res.json();
          currentList = data.results;
          count = data.count;
        } else {
          // If filtered type, fetch type pokemon list once, then slice
          let typeUrls = typePokemonUrls;
          if (typePokemonUrls.length === 0 || activeType !== "all") {
            const res = await fetch(`https://pokeapi.co/api/v2/type/${activeType}`);
            if (!res.ok) throw new Error("Type load error");
            const data = await res.json();
            // Map structure
            typeUrls = data.pokemon.map((p: any) => ({
              name: p.pokemon.name,
              url: p.pokemon.url
            }));
            if (active) {
              setTypePokemonUrls(typeUrls);
            }
          }
          
          count = typeUrls.length;
          const offset = (currentPage - 1) * ITEMS_PER_PAGE;
          currentList = typeUrls.slice(offset, offset + ITEMS_PER_PAGE);
        }

        // Fetch detailed information for the 24 pokemons concurrently
        const details = await Promise.all(
          currentList.map(async (p) => {
            const [pokemonRes, speciesRes] = await Promise.all([
              fetch(p.url).then((r) => r.json()),
              // Extract id from url to fetch species (e.g. pokemon-species/3/)
              fetch(p.url.replace("/pokemon/", "/pokemon-species/")).then((r) => r.ok ? r.json() : null).catch(() => null)
            ]);

            const koreanName =
              speciesRes?.names?.find((n: any) => n.language.name === "ko")?.name ||
              pokemonRes.name.charAt(0).toUpperCase() + pokemonRes.name.slice(1);

            return {
              id: pokemonRes.id,
              name: pokemonRes.name,
              koreanName,
              types: pokemonRes.types.map((t: any) => t.type.name),
              imageUrl: pokemonRes.sprites.other["official-artwork"].front_default || pokemonRes.sprites.front_default || "",
              height: pokemonRes.height,
              weight: pokemonRes.weight,
              stats: pokemonRes.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat
              }))
            };
          })
        );

        if (active) {
          setPokemons(details);
          setTotalCount(count);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (active) {
          setIsError(true);
          setIsLoading(false);
        }
      }
    }

    loadPokemons();

    return () => {
      active = false;
    };
  }, [currentPage, activeType]);

  // Handle active filter type change
  const handleTypeChange = (typeEn: string) => {
    setActiveType(typeEn);
    setTypePokemonUrls([]); // Clear cache for new type
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-800 select-none pb-12">
      
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-poke-yellow/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-poke-blue/5 blur-[120px] -z-10" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10 border-b border-slate-100 bg-white/70 backdrop-blur-md sticky top-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-poke-yellow flex items-center justify-center shadow-md shadow-poke-yellow/20 group-hover:scale-105 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="#3B4CCA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-extrabold text-xl md:text-2xl text-poke-blue tracking-tight">
            포켓몬 탐험대
          </span>
        </Link>
        <span className="px-4 py-1.5 bg-poke-blue/10 text-poke-blue text-sm md:text-base font-black rounded-full">
          포켓몬 도감
        </span>
      </header>

      {/* Main content container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-8">
        
        {/* Type Filter Buttons */}
        <div className="mb-8">
          <h2 className="text-xs font-black text-slate-400 mb-3 tracking-widest uppercase">타입 필터</h2>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((type) => {
              const isActive = activeType === type.en;
              return (
                <button
                  key={type.id}
                  onClick={() => handleTypeChange(type.en)}
                  className={`px-4 py-2 text-xs sm:text-sm font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow ${
                    isActive 
                      ? "bg-poke-blue text-white shadow-md shadow-poke-blue/20" 
                      : type.id === "all" 
                        ? "bg-white text-slate-600 border border-slate-200" 
                        : type.color
                  }`}
                >
                  {type.ko}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="w-full py-32 flex flex-col items-center justify-center gap-4">
            {/* Pokeball spinning loader */}
            <div className="w-16 h-16 rounded-full border-[8px] border-slate-200 border-t-poke-red animate-spin relative">
              <div className="absolute top-[20px] left-[20px] w-4 h-4 rounded-full bg-white border-2 border-slate-400" />
            </div>
            <span className="text-lg font-bold text-slate-500 animate-pulse">
              포켓몬 데이터를 불러오는 중이에요...
            </span>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="w-full py-24 flex flex-col items-center justify-center text-center gap-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-800">에러가 발생했습니다!</h3>
              <p className="text-slate-500 font-semibold leading-relaxed">
                네트워크 연결 상태를 확인하고 <br />
                아래 버튼을 눌러 다시 한번 시도해 주세요.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage(currentPage)} // Re-triggers the loading useEffect
              className="px-6 py-3 bg-poke-blue hover:bg-poke-blue-dark text-white font-extrabold rounded-full shadow-md shadow-poke-blue/20 hover:scale-105 active:scale-95 transition-all"
            >
              다시 시도하기
            </button>
          </div>
        )}

        {/* Pokemon Card Grid */}
        {!isLoading && !isError && (
          <>
            {pokemons.length === 0 ? (
              <div className="w-full py-32 text-center text-slate-400 font-bold">
                해당 조건의 포켓몬을 찾을 수 없어요.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemons.map((pokemon) => {
                  const formattedId = `#${String(pokemon.id).padStart(4, "0")}`;
                  
                  return (
                    <div
                      key={pokemon.id}
                      onClick={() => setSelectedPokemon(pokemon)}
                      className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Card Top: Number & Types */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-black text-slate-300">
                          {formattedId}
                        </span>
                        <div className="flex gap-1">
                          {pokemon.types.map((type) => {
                            const info = TYPE_TRANSLATIONS[type] || { ko: type, color: "bg-slate-400" };
                            return (
                              <span
                                key={type}
                                className={`px-2 py-0.5 text-[10px] font-black rounded-full shadow-sm text-white scale-90 ${info.color}`}
                              >
                                {info.ko}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card Center: Image */}
                      <div className="relative w-36 h-36 mx-auto flex items-center justify-center mb-4 overflow-hidden">
                        {/* Soft background light */}
                        <div className="absolute w-[80%] h-[80%] rounded-full bg-slate-50 group-hover:bg-poke-yellow/10 transition-colors" />
                        <Image
                          src={pokemon.imageUrl}
                          alt={pokemon.koreanName}
                          width={150}
                          height={150}
                          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 relative z-10 drop-shadow-md"
                          priority
                        />
                      </div>

                      {/* Card Bottom: Name */}
                      <div className="text-center mt-2">
                        <h3 className="font-black text-lg text-slate-800 group-hover:text-poke-blue transition-colors">
                          {pokemon.koreanName}
                        </h3>
                        <span className="text-xs font-semibold text-slate-400 capitalize">
                          {pokemon.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-6 mt-12 pt-6 border-t border-slate-200/60">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                  aria-label="이전 페이지"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <span className="text-base font-black text-slate-700">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                  aria-label="다음 페이지"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

      </main>

      {/* Details Modal overlay */}
      <PokemonModal 
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
      
    </div>
  );
}
