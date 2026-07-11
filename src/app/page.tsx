import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen lg:h-screen lg:overflow-hidden flex flex-col bg-radial from-white via-poke-lightblue/30 to-poke-lightyellow/20 select-none">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-poke-yellow/20 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-poke-blue/15 blur-[100px] -z-10" />
      
      {/* Floating Sparkles / Lightnings in Background */}
      <div className="absolute top-1/4 left-10 opacity-30 animate-pulse hidden md:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#FFDE00" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 right-12 opacity-25 animate-pulse delay-700 hidden md:block">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21L12 12H7L15 3L12 12H17L9 21Z" fill="#3B4CCA" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/3 opacity-20 hidden lg:block">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="#FFDE00" />
        </svg>
      </div>

      {/* 1. Header (상단 메뉴) */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-9 h-9 rounded-full bg-poke-yellow flex items-center justify-center shadow-md shadow-poke-yellow/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="#3B4CCA" />
            </svg>
          </div>
          <span className="font-extrabold text-xl md:text-2xl text-poke-blue tracking-tight">
            포켓몬 탐험대
          </span>
        </div>
        
        {/* Simplified Navigation for Mobile */}
        <nav className="flex items-center gap-4 md:gap-8">
          <a href="#" className="text-sm md:text-base font-semibold text-slate-600 hover:text-poke-blue transition-colors hidden sm:block">
            포켓몬 소개
          </a>
          <a href="#" className="text-sm md:text-base font-semibold text-slate-600 hover:text-poke-blue transition-colors hidden sm:block">
            포켓몬 도감
          </a>
          <a href="#" className="px-4 py-2 text-sm md:text-base font-bold text-white bg-poke-blue rounded-full shadow-md shadow-poke-blue/20 hover:bg-poke-blue-dark transition-all hover:scale-105 active:scale-95">
            모험 시작
          </a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 pb-12 lg:pb-0">
        
        {/* Left Side: Main Texts and Buttons */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-10">
          <div className="space-y-6">
            
            {/* Title with Fade-In Animation */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-slate-800 leading-tight tracking-tight opacity-0 animate-fade-in-up">
              오늘, 어떤 포켓몬을 <br className="hidden sm:inline" />
              <span className="text-poke-blue relative inline-block">
                만나 볼래?
                <span className="absolute bottom-1 left-0 w-full h-[6px] md:h-[8px] bg-poke-yellow/60 -z-10 rounded-full"></span>
              </span>
            </h1>
            
            {/* Description with delayed Fade-In Animation */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-0 animate-fade-in-up-delay">
              서로 다른 모습과 특별한 능력을 가진 포켓몬을 만나 보세요. 
              <br className="hidden md:inline" />
              새로운 포켓몬과 함께 신나는 모험을 시작해요!
            </p>
            
            {/* Action Buttons with delayed Fade-In Animation */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4 pt-4 opacity-0 animate-fade-in-up-delay-2">
              <button className="px-6 sm:px-8 py-3.5 sm:py-4 bg-poke-yellow text-slate-800 hover:text-slate-900 font-extrabold text-base sm:text-lg rounded-full shadow-lg shadow-poke-yellow/30 hover:bg-[#ffe733] border-b-4 border-poke-yellow-dark active:border-b-0 active:translate-y-[4px] transition-all hover:scale-[1.05] active:scale-[0.98]">
                포켓몬 만나기
              </button>
              <button className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-poke-blue hover:text-poke-blue-dark font-extrabold text-base sm:text-lg rounded-full shadow-md hover:shadow-lg border-2 border-poke-blue/15 hover:border-poke-blue/30 active:translate-y-[2px] transition-all hover:scale-[1.05] active:scale-[0.98]">
                포켓몬 알아보기
              </button>
            </div>
            
          </div>
        </div>

        {/* Right Side: Hero Pokemon Image Area */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] aspect-square flex items-center justify-center animate-float">
            
            {/* Sunburst background effect */}
            <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-poke-yellow/30 to-poke-blue/10 blur-[10px] -z-10" />
            
            {/* Circular frame background */}
            <div className="absolute w-[80%] h-[80%] rounded-full border-4 border-dashed border-poke-blue/10 animate-[spin_60s_linear_infinite]" />
            
            {/* The Main Hero Image */}
            <Image
              src="/pokemon_hero.png"
              alt="Pikachu Illustration"
              width={500}
              height={500}
              className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(254,205,5,0.25)] select-none"
              priority
            />
            
          </div>
        </div>

      </main>

      {/* Footer / Copyright */}
      <footer className="w-full text-center py-4 text-xs font-semibold text-slate-400 select-none">
        © {new Date().getFullYear()} 포켓몬 탐험대. All Rights Reserved.
      </footer>
      
    </div>
  );
}
