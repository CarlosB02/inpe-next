'use client';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  useFrame(() => { if (ref.current) ref.current.rotation.y = window.scrollY * 0.005; });
  return <primitive ref={ref} object={scene} />;
}

export default function ModelViewer({ modelPath, autoRotate = false }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment='city' intensity={0.6}>
            <Model url={modelPath} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate={autoRotate} enableZoom={false} />
      </Canvas>
    </div>
  );
}