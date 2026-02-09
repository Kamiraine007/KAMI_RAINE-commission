
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import LargeLogo from './components/LargeLogo.tsx';
import FallingEffect from './components/FallingEffect.tsx';
import BackgroundScene from './components/BackgroundScene.tsx';
import ActionButtons from './components/ActionButtons.tsx';
import PlayerBar from './components/PlayerBar.tsx';
import CameraViewfinder from './components/CameraViewfinder.tsx';
import RippleEffect from './components/RippleEffect.tsx';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [isRedMode, setIsRedMode] = useState<boolean>(false);
  const [isCameraMode, setIsCameraMode] = useState<boolean>(false);
  const [redBgUrl, setRedBgUrl] = useState<string | null>(null);
  const [isGeneratingBg, setIsGeneratingBg] = useState<boolean>(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateRedBackground = async () => {
    if (redBgUrl || isGeneratingBg) return;
    
    setIsGeneratingBg(true);
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Extreme minimalist dark atmospheric background, ultra-wide composition, deep obsidian black and crimson red color palette, NO MOON, NO ECLIPSE, NO CELESTIAL BODIES, NO TEXT, NO LETTERS. Subtle smooth red light gradients, very clean composition, sophisticated cinematic mood, high contrast, absolute void in the center, soft red rim lighting on very faint minimalist geometric city lines at the bottom, ultra-clean aesthetic, high-end design, zero visual noise.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          }
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              setRedBgUrl(`data:image/png;base64,${base64Data}`);
              setIsGeneratingBg(false);
              return; // Success, exit the loop and function
            }
          }
        }
        break; 

      } catch (error: any) {
        attempts++;
        const errorMessage = error?.message || "";
        const isQuotaError = errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('429');
        
        if (isQuotaError && attempts < maxAttempts) {
          const backoff = Math.pow(2, attempts) * 2000;
          console.warn(`Quota exceeded (429). Retrying background generation in ${backoff}ms... (Attempt ${attempts}/${maxAttempts})`);
          await sleep(backoff);
          continue; 
        }
        
        console.error("Failed to generate background:", error);
        break; 
      }
    }
    
    setIsGeneratingBg(false);
  };

  useEffect(() => {
    document.body.classList.add('theme-transitioning');
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    if (isRedMode) {
      document.documentElement.classList.add('blood-moon');
      generateRedBackground();
    } else {
      document.documentElement.classList.remove('blood-moon');
    }

    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 1200);

    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, [isDarkMode, isRedMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleRedMode = () => setIsRedMode(!isRedMode);

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-[#1a1a1a] dark:text-[#f0f0f0] transition-colors duration-1000 relative overflow-x-hidden ${isRedMode ? 'red-accent' : ''}`}>
      <BackgroundScene 
        isDarkMode={isDarkMode} 
        isRedMode={isRedMode} 
        redBgUrl={redBgUrl}
        isGeneratingBg={isGeneratingBg}
      />
      <FallingEffect isDarkMode={isDarkMode} isRedMode={isRedMode} />
      <RippleEffect isDarkMode={isDarkMode} isRedMode={isRedMode} />
      
      <Navbar 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode} 
        toggleRedMode={toggleRedMode} 
        isRedMode={isRedMode} 
      />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 z-10 relative pointer-events-none pb-24">
        <div className="pointer-events-auto flex flex-col items-center w-full">
          <LargeLogo 
            isDarkMode={isDarkMode} 
            isRedMode={isRedMode} 
            isGeneratingBg={isGeneratingBg} 
            onOpenCamera={() => setIsCameraMode(true)}
          />
        </div>
      </main>

      <div className="z-20 relative pointer-events-none w-full flex flex-col items-center pb-20">
        <div className="pointer-events-auto">
          <ActionButtons isDarkMode={isDarkMode} isRedMode={isRedMode} />
        </div>
        <Footer />
      </div>

      <PlayerBar isDarkMode={isDarkMode} isRedMode={isRedMode} />

      {isCameraMode && (
        <CameraViewfinder 
          onClose={() => setIsCameraMode(false)} 
          isDarkMode={isDarkMode} 
          isRedMode={isRedMode} 
        />
      )}

      <style>{`
        .red-accent {
          selection-background-color: #dc2626;
          selection-color: #ffffff;
        }
        .blood-moon .red-accent::selection {
          background: #dc2626;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default App;
