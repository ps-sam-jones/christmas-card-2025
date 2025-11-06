import { Html, useProgress } from '@react-three/drei';

export const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-lg">Loading {Math.round(progress)}%</div>
    </Html>
  );
};
