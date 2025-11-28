'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent, motion, useSpring } from 'framer-motion';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

type ResponsiveVideoProps = {
  portraitSrc: string;
  landscapeSrc: string;
  videoOpacity: MotionValue<number>;
};

export const ResponsiveVideo = ({
  portraitSrc,
  landscapeSrc,
  videoOpacity,
}: ResponsiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isOverridden, setIsOverridden] = useState(false);

  // Choose portrait or landscape
  useEffect(() => {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    setSrc(isPortrait ? portraitSrc : landscapeSrc);
  }, [portraitSrc, landscapeSrc]);

  // Lazy load
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasLoaded) {
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasLoaded]);

  // Handle click to unmute
  const handleUnmute = () => {
    if (videoRef.current) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  // Control play/pause
  useMotionValueEvent(videoOpacity, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !hasLoaded || isOverridden) return;

    if (latest >= 0.4) {
      video.play();
    } else {
      video.pause();
    }
  });

  const handlePause = () => {
    setIsOverridden(true);
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        preload="none"
        controls={false}
        playsInline
        src={hasLoaded && src ? src : undefined}
      />
      {isMuted && (
        <button
          onClick={handleUnmute}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#42010B] backdrop-blur-sm flex items-center justify-center text-white"
        >
          <span className="text-white text-xs font-medium flex flex-col gap-1 justify-center items-center font-gotham">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>

            <span className="text-white text-xs font-medium font-gotham">Tap for sound</span>
          </span>
        </button>
      )}
      <button
        onClick={handlePause}
        className="bg-[#42010B] z-10 backdrop-blur-sm flex items-center rounded-full justify-center absolute text-white size-12 bottom-10 right-10"
      >
        {isPaused ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
            </svg>
          </>
        ) : (
          <>
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="size-6"
              viewBox="0 0 256 256"
            >
              <path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"></path>
            </svg>
            <span className="sr-only">Pause</span>
          </>
        )}
      </button>
    </div>
  );
};
