'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent, motion, useSpring } from 'framer-motion';

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
  const [isHovering, setIsHovering] = useState(false);
  const [showCircle, setShowCircle] = useState(false);

  // Smooth spring animation for cursor follower
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

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

  // Control play/pause
  useMotionValueEvent(videoOpacity, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !hasLoaded) return;

    if (latest >= 0.4) {
      video.play();
    } else {
      video.pause();
    }
  });

  // Track cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorX.set(x);
    cursorY.set(y);

    // Show circle only after mouse moves
    if (!showCircle) {
      setShowCircle(true);
    }
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowCircle(false);
  };

  // Handle click to unmute
  const handleClick = () => {
    if (videoRef.current) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        preload="none"
        controls={false}
        src={hasLoaded && src ? src : undefined}
      />

      {/* Cursor circle with delay */}
      {isHovering && showCircle && (
        <motion.div
          className="absolute pointer-events-none z-50 flex items-center justify-center"
          style={{
            left: cursorX,
            top: cursorY,
            x: '-50%',
            y: '-50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-24 h-24 rounded-full bg-[#42010B] backdrop-blur-sm flex items-center justify-center text-white">
            <span className="text-white text-xs font-medium flex flex-col gap-1 justify-center items-center font-gotham">
              {isMuted ? (
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
              ) : (
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
                    d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              )}

              <span className="text-white text-xs font-medium font-gotham">
                {isMuted ? 'UNMUTE' : 'MUTE'}
              </span>
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
