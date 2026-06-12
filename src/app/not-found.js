'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Footprints, Home, ShoppingBag, Ruler, Compass, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 – Página Não Encontrada | Inpe Barefoot';
  }, []);

  // Coordenadas das pegadas animadas à volta do ponto de interrogação
  const footprintSteps = [
    { x: -70, y: 35, rotate: -30, delay: 0 },
    { x: -35, y: -15, rotate: 10, delay: 0.4 },
    { x: 0, y: 20, rotate: 25, delay: 0.8 },
    { x: 35, y: -20, rotate: -15, delay: 1.2 },
    { x: 70, y: 10, rotate: 30, delay: 1.6 },
  ];

  return (
    <Layout backgroundColor="#FFFDF9">
      <div style={{
        backgroundColor: '#FFFDF9',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 10vw, 6rem) 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>

        {/* Blobs orgânicos decorativos em segundo plano */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(254, 224, 187, 0.25) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(179, 223, 219, 0.25) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '960px', width: '100%', position: 'relative', zIndex: 1 }}>

          {/* Pegadas animadas e lúdicas */}
          <div style={{
            position: 'relative',
            height: '150px',
            width: '260px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Ponto de interrogação flutuante */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 4, -4, 0],
                y: [0, -6, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                fontSize: '6.5rem',
                fontWeight: '900',
                color: '#FF9F1C',
                position: 'absolute',
                zIndex: 2,
                opacity: 0.85,
                lineHeight: 1
              }}
            >
              ?
            </motion.div>

            {/* Ciclo de pegadas que simula o caminhar */}
            {footprintSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.1, 1, 0.7]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: step.delay,
                  ease: 'easeInOut',
                  repeatDelay: 0.8
                }}
                style={{
                  position: 'absolute',
                  transform: `translate(${step.x}px, ${step.y}px) rotate(${step.rotate}deg)`,
                  color: index % 2 === 0 ? '#007396' : '#9FE2DD',
                  zIndex: 1
                }}
              >
                <Footprints size={36} />
              </motion.div>
            ))}
          </div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
              fontWeight: '900',
              color: '#2C3E50',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              margin: '0 0 1rem'
            }}
          >
            Ups! Perdeste o <span style={{ color: '#F4C466' }}>teu trilho?</span>
          </motion.h1>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              color: '#555',
              maxWidth: '620px',
              margin: '0 auto 3rem',
              lineHeight: 1.6,
              fontWeight: '600'
            }}
          >
            Parece que os teus pezinhos seguiram um caminho que ainda não está no mapa.
            Não te preocupes, calça os teus Inpe e vamos voltar à aventura juntos!
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            style={{
              display: 'flex',
              gap: '1.2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '5rem'
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -0.5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: '#FF9F1C',
                  color: 'white',
                  padding: '18px 38px',
                  borderRadius: '50px',
                  fontWeight: '900',
                  fontSize: '1.05rem',
                  boxShadow: '0 10px 25px rgba(255, 159, 28, 0.35)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Home size={20} /> Voltar ao Início
              </motion.div>
            </Link>

            <Link href="/loja" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0.5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: 'white',
                  color: '#2C3E50',
                  padding: '18px 38px',
                  borderRadius: '50px',
                  fontWeight: '900',
                  fontSize: '1.05rem',
                  border: '2px solid #E0E6ED',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShoppingBag size={20} /> Explorar a Loja
              </motion.div>
            </Link>
          </motion.div>

          {/* Grelha de Atendimento / Navegação Alternativa */}
          <div style={{ width: '100%' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              textAlign: 'center',
              letterSpacing: '0.5px'
            }}>
              Ou tenta um destes caminhos alternativos:
            </h3>

            <div className="links-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1.5rem',
              textAlign: 'left'
            }}>

              {/* Card 1: Loja */}
              <Link href="/loja" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  style={{
                    padding: '1.8rem',
                    borderRadius: '28px',
                    backgroundColor: '#E0F2F1', // Soft Teal
                    border: '3px solid #FFF',
                    boxShadow: '0 10px 30px rgba(159,226,221,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#007396'
                  }}>
                    <ShoppingBag size={22} />
                  </div>
                  <h4 style={{ margin: 0, fontWeight: '900', color: '#2C3E50', fontSize: '1.15rem' }}>Loja Calçado</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', fontWeight: '600', lineHeight: 1.5 }}>
                    Modelos saudáveis e confortáveis para toda a família caminhar em harmonia.
                  </p>
                </motion.div>
              </Link>
              {/* Card 3: História */}
              <Link href="/sobre-nos" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  style={{
                    padding: '1.8rem',
                    borderRadius: '28px',
                    backgroundColor: '#E8F5E9', // Soft Green
                    border: '3px solid #FFF',
                    boxShadow: '0 10px 30px rgba(76,175,80,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4CAF50'
                  }}>
                    <Compass size={22} />
                  </div>
                  <h4 style={{ margin: 0, fontWeight: '900', color: '#2C3E50', fontSize: '1.15rem' }}>A nossa História</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', fontWeight: '600', lineHeight: 1.5 }}>
                    Descobre os benefícios de andar descalço e o nosso compromisso ético.
                  </p>
                </motion.div>
              </Link>

              {/* Card 4: Contactos */}
              <Link href="/contactos" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  style={{
                    padding: '1.8rem',
                    borderRadius: '28px',
                    backgroundColor: '#FFEBEE', // Soft Pink/Red
                    border: '3px solid #FFF',
                    boxShadow: '0 10px 30px rgba(224,106,85,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#E06A55'
                  }}>
                    <Phone size={22} />
                  </div>
                  <h4 style={{ margin: 0, fontWeight: '900', color: '#2C3E50', fontSize: '1.15rem' }}>Apoio ao Cliente</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', fontWeight: '600', lineHeight: 1.5 }}>
                    Dúvidas ou conselhos? Fala connosco, estamos prontas para ajudar.
                  </p>
                </motion.div>
              </Link>

            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}
