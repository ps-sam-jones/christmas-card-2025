// src/global.d.ts
import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Lights
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.Object3DNode<
        THREE.DirectionalLight,
        typeof THREE.DirectionalLight
      >;
      pointLight: ReactThreeFiber.Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      spotLight: ReactThreeFiber.Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
      hemisphereLight: ReactThreeFiber.Object3DNode<
        THREE.HemisphereLight,
        typeof THREE.HemisphereLight
      >;
      // Meshes & Groups
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      line: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>;
      points: ReactThreeFiber.Object3DNode<THREE.Points, typeof THREE.Points>;
      // Any generic primitive
      primitive: any;
    }
  }
}
