'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Footprints, Zap, Smile, Shield,
  Maximize, Activity, Feather, Heart, Sprout,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import AnatomiaBarefoot from './AnatomiaBarefoot';
import Layout from './Layout';

const ExtrasClient = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const superpowers = [
    {
      title: 'Ponteira Dedos Livres',
      desc: 'Os dedinhos espalham-se como se estivessem descalços, promovendo o equilíbrio e crescimento natural.',
      icon: Footprints,
      color: '#FF9F1C',
      bg: '#FFF3E0'
    },
    {
      title: 'Sola Mágica Dobrável',
      desc: 'Dobra-se a 360° para acompanhar cada salto, corrida ou cambalhota dos mais pequenos.',
      icon: Zap,
      color: '#007396',
      bg: '#E0F2F1'
    },
    {
      title: 'Leve como uma Pena',
      desc: 'Sapatos super leves (apenas ~120g) para que a brincadeira nunca se torne pesada.',
      icon: Smile,
      color: '#4CAF50',
      bg: '#E8F5E9'
    },
    {
      title: 'Resistência à Aventura',
      desc: 'Produzido com materiais sustentáveis de alta durabilidade, fáceis de limpar e prontos para tudo.',
      icon: Shield,
      color: '#E06A55',
      bg: '#FFEBEE'
    }
  ];

  return (
    <Layout backgroundColor="#FFFDF9">
      <div style={{ backgroundColor: '#FFFDF9', overflowX: 'hidden' }}>

        {/* HERO */}
        <section style={{
          backgroundColor: '#FFFDF9',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem) clamp(1rem, 3vw, 2rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,196,102,0.1) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(159,226,221,0.15) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              fontWeight: '900',
              color: '#2C3E50',
              lineHeight: 1.1,
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              Características <br />
              <span style={{ color: '#F4C466' }}>Inpe</span>
            </h1>
            <p style={{ color: '#888', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Descobre o que faz do calçado Inpe uma escolha única para o desenvolvimento saudável dos pezinhos.
            </p>
          </div>
        </section>

        {/* CARACTERÍSTICAS / SUPERPODERES */}
        <section id="superpoderes" style={{ padding: 'clamp(3rem, 6vw, 5rem) 10%', position: 'relative', overflow: 'hidden', backgroundColor: '#FFFDF9' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#2C3E50', textTransform: 'uppercase', marginTop: '1.5rem', lineHeight: 1.1 }}>
              Os Super-Poderes dos <br /><span style={{ color: '#007396' }}>Pezinhos Descalços!</span>
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginTop: '1rem', fontWeight: '500' }}>
              Os nossos sapatos imitam a natureza. Dão ao teu filho a liberdade de crescer forte e equilibrado.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
            {superpowers.map((power, idx) => {
              const Icon = power.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{
                    y: -12,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                    borderColor: power.color
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, delay: idx * 0.1 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '32px',
                    padding: '2.5rem 2rem',
                    border: '3px solid transparent',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1.2rem',
                    transition: 'border-color 0.3s'
                  }}
                >
                  <div style={{
                    backgroundColor: power.bg,
                    color: power.color,
                    width: '60px',
                    height: '60px',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#2C3E50', margin: 0 }}>
                    {power.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {power.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ANATOMIA BAREFOOT */}
        <AnatomiaBarefoot isMobile={isMobile} />

        {/* CTA */}
        <section style={{
          backgroundColor: '#FF9F1C',
          padding: '5rem 2rem',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '540px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '900', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.2rem' }}>
              Prontos para a <br />Próxima Aventura?
            </h2>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '2.5rem', opacity: 0.9 }}>
              Dá ao teu filho o presente de pés saudáveis e felizes para toda a vida.
            </p>
            <Link href="/loja" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#2C3E50',
                  color: 'white',
                  padding: '18px 48px',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '900',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  cursor: 'pointer'
                }}
              >
                COMPRAR AGORA <ArrowRight size={20} />
              </motion.div>
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default ExtrasClient;
