'use client';
import { motion } from 'framer-motion';
import { PS } from './PS';

export const Footer = () => {
  return (
    <footer className="bg-[#2E0E05] relative text-[#2E0E05]">
      <div
        className="absolute top-0 left-0 w-full overflow-hidden"
        style={{ transform: 'translateY(-99%)' }}
      >
        <motion.svg
          className="w-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: '200%' }}
          animate={{
            x: [0, -1440],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* First wave pattern */}
          <path
            d="M0,50 Q180,20 360,50 T720,50 Q900,20 1080,50 T1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
          />
          {/* Duplicate wave pattern for seamless loop */}
          <path
            d="M1440,50 Q1620,20 1800,50 T2160,50 Q2340,20 2520,50 T2880,50 L2880,100 L1440,100 Z"
            fill="currentColor"
          />
        </motion.svg>
      </div>

      <div className="pt-4 pb-8 px-6 text-white">
        <div className="pt-4 pb-8 px-6">
          <p className="text-white font-gotham max-w-[700px] text-lg mb-12">
            Despite it’s irresistible allure, Sléj is sadly a purely fictitious festive fragrance,
            brought to you by the creative minds at{' '}
            <a href="https://www.proctorsgroup.com" className="underline hover:text-amber-400">
              Proctor + Stevenson
            </a>
            .
          </p>
          <div className="flex gap-4 lg:gap-8 justify-between flex-col lg:flex-row items-center">
            <a href="https://www.proctorsgroup.com">
              <PS />
            </a>
            <div></div>
            <div className="opacity-90">Copyright © 2025 Proctor and Stevenson Ltd.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
