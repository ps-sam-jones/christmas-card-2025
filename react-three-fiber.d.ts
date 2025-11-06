// src/react-three-fiber.d.ts
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // allow any JSX tag inside <Canvas>
      [elemName: string]: any;
    }
  }
}
