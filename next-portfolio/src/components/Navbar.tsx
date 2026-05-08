"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[100] mix-blend-difference">
        <div className="font-serif text-2xl tracking-widest text-white border border-white/30 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm cursor-pointer transition-colors duration-500 hover:bg-white hover:text-black hover:mix-blend-normal">
          GB
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-white text-sm tracking-[0.2em] uppercase flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
        >
          MENU <span className="text-xl">✢</span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] bg-[#0a0f1a]/95 backdrop-blur-3xl flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-10 text-white text-sm tracking-[0.2em] uppercase flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
            >
              CLOSE <span className="text-xl">✕</span>
            </button>

            <div className="flex flex-col gap-6 text-center">
              {["HOME", "WORK", "ABOUT", "CONTACT"].map((item, i) => (
                <div key={item} className="overflow-hidden">
                  <motion.a 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="block font-serif text-6xl md:text-8xl text-white hover:text-[#bcd3e9] hover:italic transition-all duration-300"
                  >
                    {item}
                  </motion.a>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-10 flex gap-8 text-white/50 text-xs tracking-widest uppercase"
            >
              <a href="https://github.com/Gitansh00" target="_blank" className="hover:text-white transition-colors">Github</a>
              <a href="https://www.linkedin.com/in/gitansh-bhange-a4ba05295" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
