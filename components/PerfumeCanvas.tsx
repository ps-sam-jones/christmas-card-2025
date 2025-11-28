import { Canvas } from '@react-three/fiber';
import { PerfumeModel } from '@/components/PerfumeModel';
import { Environment } from '@react-three/drei';
import { useEffect, useState } from 'react';

export const PerfumeCanvas = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
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
    <Canvas camera={{ position: [0, 0, 25], fov: 28 }}>
      <Environment files="/parking.hdr" />
      <ambientLight intensity={0.2} />
      <PerfumeModel mouse={mouse} />
    </Canvas>
  );
};
