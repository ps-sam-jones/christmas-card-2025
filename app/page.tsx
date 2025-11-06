'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerfumeModel } from '@/components/PerfumeModel';
import { Logo } from '@/components/Logo';
import { PS } from '@/components/PS';
import { Environment, OrbitControls, useProgress } from '@react-three/drei';
import { Loader } from '@/components/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactThreeFiber } from '@react-three/fiber';

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [progress, setProgress] = useState(0);
  const { progress: modelProgress } = useProgress();

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
    <div className="h-screen w-screen bg-radial-fire relative overflow-hidden">
      <nav className="h-20 w-full fixed left-0 flex justify-center p-8 z-10">
        <a href="https://www.proctorsgroup.com">
          <PS />
        </a>
      </nav>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.7 }}
          transition={{ duration: 1.3, delay: 0.5, ease: 'easeOut' }}
        >
          <Logo />
        </motion.div>
      </div>
      <div className="relative z-60 absolute h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <PerfumeModel mouse={mouse} />
        </Canvas>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[16px] z-50">
        <motion.div
          className="h-full bg-[#4B010C]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
