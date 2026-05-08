import BackgroundScene from "@/components/BackgroundScene";
import SmoothScroll from "@/components/SmoothScroll";
import TiltCard from "@/components/TiltCard";
import Navbar from "@/components/Navbar";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* 3D Background */}
        <BackgroundScene />

        {/* Interactive Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-8">
          <div className="w-full max-w-[1600px] flex flex-col items-end pr-[5%]">
            <h1 className="flex flex-col items-end w-full font-serif font-normal leading-[0.85] tracking-[-0.01em]">
              {/* Staggered Typography matching the layout perfectly */}
              <span className="text-[clamp(4.5rem,10vw,12rem)] glass-text-light mr-0">
                GITANSH
              </span>
              <span className="text-[clamp(4.5rem,10vw,12rem)] glass-text-light mr-[15vw]">
                BHANGE
              </span>
            </h1>
            <p className="mt-6 text-[clamp(1rem,1.5vw,1.3rem)] text-[var(--color-glassy-white)] opacity-80 max-w-[400px] mr-[25vw] leading-relaxed">
              Full Stack Developer for the Modern Web
            </p>
          </div>

          <div className="absolute bottom-10 left-10 flex items-center gap-4 text-xs tracking-widest uppercase opacity-60 mix-blend-difference text-white">
            <span>SCROLL DOWN</span>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative w-full py-32 px-8 md:px-16 flex flex-col items-center z-10">
          <div className="w-full max-w-6xl mb-20">
            <h2 className="font-serif text-5xl md:text-7xl glass-text-light mb-6">SELECTED<br/>WORKS</h2>
            <div className="w-full h-px bg-white/10"></div>
          </div>

          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
            <TiltCard>
              <div className="w-16 h-16 rounded-full border border-white/20 mb-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/40 to-transparent blur-[2px]"></div>
              </div>
              <h3 className="font-serif text-4xl glass-text-light mb-4">RETOUCHIFY</h3>
              <p className="opacity-70 text-sm mb-8 leading-relaxed max-w-[250px]">
                Full stack photo editing service.
              </p>
              <a href="https://retouchify.vercel.app/" target="_blank" rel="noreferrer" className="text-xs tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                VIEW PROJECT
              </a>
            </TiltCard>

            <TiltCard>
              <div className="w-16 h-16 rounded-full border border-white/20 mb-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/40 to-transparent blur-[2px]"></div>
              </div>
              <h3 className="font-serif text-4xl glass-text-light mb-4">SKYCAST</h3>
              <p className="opacity-70 text-sm mb-8 leading-relaxed max-w-[250px]">
                Flask + OpenWeatherMap API weather application.
              </p>
              <a href="https://skycaster.vercel.app/" target="_blank" rel="noreferrer" className="text-xs tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                VIEW PROJECT
              </a>
            </TiltCard>

            <TiltCard>
              <div className="w-16 h-16 rounded-full border border-white/20 mb-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/40 to-transparent blur-[2px]"></div>
              </div>
              <h3 className="font-serif text-4xl glass-text-light mb-4">HOTEL MGMT</h3>
              <p className="opacity-70 text-sm mb-8 leading-relaxed max-w-[250px]">
                C++ OOP console app with file persistence.
              </p>
              <a href="https://github.com/Gitansh00" target="_blank" rel="noreferrer" className="text-xs tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                VIEW GITHUB
              </a>
            </TiltCard>

            <TiltCard>
              <div className="w-16 h-16 rounded-full border border-white/20 mb-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/40 to-transparent blur-[2px]"></div>
              </div>
              <h3 className="font-serif text-4xl glass-text-light mb-4">BANK MGMT</h3>
              <p className="opacity-70 text-sm mb-8 leading-relaxed max-w-[250px]">
                C++ banking app demonstrating data management.
              </p>
              <a href="https://github.com/Gitansh00" target="_blank" rel="noreferrer" className="text-xs tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                VIEW GITHUB
              </a>
            </TiltCard>
          </div>
        </section>

      </main>
    </SmoothScroll>
  );
}
