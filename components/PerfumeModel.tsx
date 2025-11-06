'use client';

import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';

interface PerfumeModelProps {
  mouse: { x: number; y: number };
}

export function PerfumeModel({ mouse }: PerfumeModelProps) {
  const group = useRef<Group>(null!);
  const { scene } = useGLTF('/perfume.glb');

  const [spinProgress, setSpinProgress] = useState(0); // 0 → 1
  const baseRotationY = Math.PI / 2; // align front

  // Animate in
  useEffect(() => {
    const start = performance.now();
    const duration = 2000;

    const animate = (time: number) => {
      const elapsed = time - start;
      const t = Math.min(elapsed / duration, 1);
      setSpinProgress(t);

      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const elapsed = state.clock.getElapsedTime();

    // Base position animation (spin up)
    group.current.position.y = MathUtils.lerp(-5, 0, spinProgress);

    // Idle bob (gentle vertical movement)
    group.current.position.y += Math.sin(elapsed * 2) * 0.02; // slightly stronger

    // Idle sway (rotation around X and Z axes for ambient movement)
    group.current.rotation.x = mouse.y * 0.3 + Math.sin(elapsed * 0.5) * 0.05;
    group.current.rotation.z = Math.sin(elapsed * 0.3) * 0.03;

    // Y rotation: initial spin + cursor
    const initialSpin = MathUtils.lerp(0, Math.PI, spinProgress);
    group.current.rotation.y = initialSpin + baseRotationY + mouse.x * 0.3;
  });

  return (
    <group ref={group} scale={0.5}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/perfume.glb');
