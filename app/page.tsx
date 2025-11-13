'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerfumeModel } from '@/components/PerfumeModel';
import { Logo } from '@/components/Logo';
import { PS } from '@/components/PS';
import { Environment, useProgress } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { Footer } from '@/components/Footer';
import { Ingredients } from '@/components/Ingredients';
import { ResponsiveVideo } from '@/components/ResponsiveVideo';

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { progress: modelProgress } = useProgress();

  const ytRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Model moves slower (0.5x speed) creating parallax effect
  const modelY = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);

  // Logo fades out as you scroll
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1.7, 2]);

  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoRef,
    offset: ['start end', 'end start'],
  });

  // Fade-in for video
  const videoOpacity = useTransform(videoScrollProgress, [0.1, 0.3], [0, 1]);

  useEffect(() => {
    setProgress(modelProgress);
  }, [modelProgress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background layers */}
      <div className="fixed inset-0 bg-radial-fire -z-10" />

      {/* Fixed navigation */}
      <nav className="h-20 w-full fixed top-0 left-0 flex justify-center p-8 z-50">
        <a href="https://www.proctorsgroup.com">
          <PS />
        </a>
      </nav>
      <h1 className="sr-only">Slej de Procteurs</h1>

      {/* Parallax 3D Model - moves slower */}
      <motion.div
        className="fixed inset-0 z-30 pointer-events-none max-w-[80%] lg:max-w-none m-auto"
        style={{ y: modelY }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 120 }}>
          <Environment files="/parking.hdr" />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <PerfumeModel mouse={mouse} />
        </Canvas>
      </motion.div>

      {/* Fixed Logo - fades out */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-20 w-[200px] lg:w-auto m-auto"
        style={{ opacity: logoOpacity, scale: logoScale }}
      >
        <Logo />
      </motion.div>

      {/* Scrollable content */}
      <div className="relative z-30">
        {/* Hero Section - transparent to show model behind */}
        {/* <section className="h-screen w-screen" /> */}

        {/* Video Section */}
        <section className="h-screen w-screen" />

        {/* Video Section */}
        <section ref={videoRef} className="h-[250vh] w-screen bg-[#42010B] relative" id="video">
          <div className="absolute top-[-60px] h-[60px] left-0 right-0  z-50">
            <motion.div
              className=" bg-[#42010B] h-[16px] absolute bottom-0 z-10"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="bg-[radial-gradient(50%_79.37%_at_50%_0%,_rgba(229,153,110,0.5)_0%,_rgba(229,153,110,0)_91.56%)] h-[60px] z-30 bottom-0 absolute w-full"
              style={{ backgroundColor: '#42010B' }}
              initial={{ height: '0' }}
              animate={{ height: `60px` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8">
            {/* Video fades in */}
            <motion.div
              className="absolute left-0 h-full w-full z-[90]"
              style={{
                opacity: videoOpacity,
              }}
            >
              <ResponsiveVideo
                portraitSrc="/portrait.mp4"
                landscapeSrc="/landscape.mp4"
                videoOpacity={videoScrollProgress}
              />
            </motion.div>

            {/* Text overlay fades out */}
            <motion.div
              className="absolute left-0 h-full w-full z-[100] bg-[#42010B] flex items-center justify-center pointer-events-none px-12"
              style={{
                opacity: useTransform(videoScrollProgress, [0.4, 0.6], [1, 0]),
              }}
            >
              <h2 className="font-cofo text-6xl lg:text-[72px] text-white text-center">
                {['Tis', 'the', 'season', 'for', 'temptation.'].map((word, index) => {
                  const totalWords = 5;
                  const offset = 0.1;
                  const range = 0.3;
                  const start = offset + (index / totalWords) * range;
                  const end = offset + ((index + 1) / totalWords) * range;

                  return (
                    <motion.span
                      key={index}
                      className="inline-block mr-2 lg:mr-6"
                      style={{
                        opacity: useTransform(videoScrollProgress, [start, end], [0.4, 1]),
                      }}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </h2>
            </motion.div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section
          className="min-h-screen w-screen bg-[radial-gradient(88.28%_88.28%_at_50.12%_75.44%,_#F1AF7B_0%,_#960218_58.58%,_#4B010C_100%)] relative"
          id="ingredients"
        >
          <div className="flex h-full w-full flex-col items-center justify-center py-[100px]">
            <div className="max-w-[800px] flex flex-col items-center">
              <span className="text-[#F5B40C] font-bold uppercase font-gotham">Scents de Sléj</span>
              <motion.h2
                className="font-cofo text-4xl lg:text-[72px] text-white text-center leading-[120%] mt-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                Succumb to an intoxicating blend of desires.
              </motion.h2>
            </div>
            <Ingredients />
          </div>
        </section>
        <section className="relative">
          <Footer />
        </section>
      </div>
    </div>
  );
}
