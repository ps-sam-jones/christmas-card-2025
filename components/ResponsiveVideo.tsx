'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

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
      <div className="bottom-6 right-6 xl:bottom-10 xl:right-10 absolute flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-1 py-1 font-bold text-white backdrop-blur-sm">
        <button
          onClick={handleUnmute}
          className="bg-[#42010B]/80 cursor-pointer hover:bg-[#42010B]/70 border border-white/5 backdrop-blur-sm z-10 flex items-center rounded-full justify-center text-white size-12"
        >
          {!isMuted ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"></path>
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L73.55,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V175.09l42.08,46.29a8,8,0,1,0,11.84-10.76ZM32,96H72v64H32ZM144,207.64,88,164.09V95.89l56,61.6Zm42-63.77a24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.57,40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.59Zm-80.16-76a8,8,0,0,1,1.4-11.23l39.85-31A8,8,0,0,1,160,32v74.83a8,8,0,0,1-16,0V48.36l-26.94,21A8,8,0,0,1,105.84,67.91ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"></path>
              </svg>
            </>
          )}
        </button>
        <button
          onClick={handlePause}
          className="bg-[#42010B]/80 cursor-pointer hover:bg-[#42010B]/70 border border-white/5 backdrop-blur-sm z-10 flex items-center rounded-full justify-center text-white size-12"
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
    </div>
  );
};
