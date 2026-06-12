'use client';
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import { Eye } from 'lucide-react';

function Model({ url, onLoad }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (scene && onLoad) {
      onLoad();
    }
  }, [scene, onLoad]);

  useFrame(() => { 
    if (ref.current && typeof window !== 'undefined') {
      ref.current.rotation.y = window.scrollY * 0.005; 
    } 
  });

  return <primitive ref={ref} object={scene} />;
}

export default function ModelViewer({ modelPath, autoRotate = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebGLSupported(support);
      if (!support) {
        setIsLoaded(true); // Don't show loader spinner if WebGL is unsupported
      }
    } catch (e) {
      setWebGLSupported(false);
      setIsLoaded(true);
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Loading state / WebGL fallback */}
      {(!isLoaded || !webGLSupported) && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFDF9',
          zIndex: 10,
          gap: '1rem',
          borderRadius: '32px',
          padding: '20px'
        }}>
          {/* Fallback image of the shoe */}
          <img 
            src="/products/p1_1.jpeg" 
            alt="Sapatinho Inpe" 
            style={{ 
              width: '160px', 
              height: '160px', 
              objectFit: 'contain',
              animation: 'bounce 3s infinite ease-in-out',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.06))'
            }} 
          />
          
          {webGLSupported ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div className="spinner" style={{
                width: '24px',
                height: '24px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #007396',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <span style={{ fontSize: '0.8rem', color: '#8097a5', fontWeight: 'bold' }}>
                A carregar modelo 3D (6MB)...
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#854931', fontWeight: 'bold' }}>
                Sapatinho Inpe Barefoot
              </span>
              <span style={{ fontSize: '0.75rem', color: '#8097a5' }}>
                Desenhado para o crescimento natural do pé
              </span>
            </div>
          )}
        </div>
      )}

      {webGLSupported && (
        <Canvas shadows="percentage" dpr={[1, 2]} camera={{ fov: 50 }} style={{ width: '100%', height: '100%', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
          <Suspense fallback={null}>
            <Stage environment='city' intensity={0.6}>
              <Model url={modelPath} onLoad={() => setIsLoaded(true)} />
            </Stage>
          </Suspense>
          <OrbitControls autoRotate={autoRotate} enableZoom={false} />
        </Canvas>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.03); }
        }
      `}</style>
    </div>
  );
}