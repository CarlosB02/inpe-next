'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Footprints, Heart, TreeDeciduous, Maximize, Activity, Zap,
  HeartPlus, Feather, Sprout, ArrowRight, ChevronDown, ChevronUp,
  Award, Sparkles, Smile, Clock, Users, ArrowUpRight
} from 'lucide-react';
import Layout from './Layout';

// Playful custom badge component
const PlayfulBadge = ({ children, color = '#FF9F1C', icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 18px',
      backgroundColor: 'white',
      borderRadius: '30px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
      border: `2px dashed ${color}`,
      color: '#2C3E50',
      fontWeight: '800',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '1rem'
    }}
  >
    {Icon && <Icon size={16} color={color} />}
    {children}
  </motion.div>
);

const HistoryClient2 = () => {
  const [activeFounder, setActiveFounder] = useState('both'); // both, santos, oliveira
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const essencia = [
    {
      icon: <Footprints size={32} />,
      title: 'Liberdade',
      text: 'Respeitamos a anatomia natural do pé. Sapatos que deixam o pé ser pé.',
      bg: '/history-liberdade.png',
      color: '#007396',
      bgGrad: 'linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 100%)',
      targetId: 'porque-inpe'
    },
    {
      icon: <TreeDeciduous size={32} />,
      title: 'Sustentabilidade',
      text: 'Materiais ecológicos e produção consciente a pensar no planeta.',
      bg: '/history-sustentabilidade.png',
      color: '#4CAF50',
      bgGrad: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
      targetId: null
    },
    {
      icon: <Heart size={32} />,
      title: 'Cuidado & Amor',
      text: 'Cada detalhe é estudado por especialistas para o bem-estar dos pequenos.',
      bg: '/history-carinho.png',
      color: '#E06A55',
      bgGrad: 'linear-gradient(135deg, #FFEBEE 0%, #FFFFFF 100%)',
      targetId: null
    }
  ];

  const porqueCards = [
    {
      icon: <Maximize size={28} color="white" />,
      title: 'Zero Drop para Alinhamento Natural',
      desc: 'O sapato acompanha a forma natural do pé, permitindo que os dedos se espalhem livremente, promovendo equilíbrio e um desenvolvimento ósseo saudável.',
      color: '#FF9F1C',
      bg: '#FFF3E0'
    },
    {
      icon: <Activity size={28} color="white" />,
      title: 'Flexibilidade Total',
      desc: 'Uma sola que se dobra facilmente em todas as direções. Isso permite que a musculatura do pé trabalhe ativamente a cada passo, fortalecendo os tendões e ligamentos tal como se estivessem descalços.',
      color: '#007396',
      bg: '#E0F2F1'
    },
    {
      icon: <Zap size={28} color="white" />,
      title: 'Materiais Respiráveis e Leves',
      desc: 'Materiais leves e respiráveis, que se adaptam ao pé e proporcionam conforto durante todo o dia.',
      color: '#4CAF50',
      bg: '#E8F5E9'
    },
    {
      icon: <HeartPlus size={28} color="white" />,
      title: 'Ponteira Ampla com Espaço para os Dedos',
      desc: 'Desenvolvidos com base em princípios fisioterapêuticos. As duas fundadoras aplicam os seus 14 anos de experiência clínica para garantir que cada sapato contribui positivamente para a postura e marcha.',
      color: '#E06A55',
      bg: '#FFEBEE'
    },
    {
      icon: <Feather size={28} color="white" />,
      title: 'Sem contra forte na zona do calcanhar',
      desc: 'Pesar menos significa brincar mais. Materiais ultra-leves que não sobrecarregam as articulações da criança, permitindo movimentos ágeis, naturais e livres de fadiga.',
      color: '#F4C466',
      bg: '#FFFDE9'
    },
  ];

  const milestones = [
    {
      year: 'Há 14 Anos',
      title: 'A Fisioterapia que une',
      desc: 'Inês Santos e Inês Oliveira conhecem-se no âmbito clínico da fisioterapia. Nasce uma forte cumplicidade profissional e uma amizade para a vida.',
      icon: Users,
      color: '#007396'
    },
    {
      year: 'Crescimento',
      title: 'A Maternidade e a Visão',
      desc: 'Tornam-se mães de dois casais de crianças. A observação do crescimento dos seus filhos e a busca por calçado que não prejudicasse o desenvolvimento motor desperta uma nova missão.',
      icon: Heart,
      color: '#E06A55'
    },
    {
      year: 'Ideação',
      title: 'Fusão entre Ciência e Natureza',
      desc: 'Unindo a especialização em pediatria à gestão clínica, decidem criar uma marca que junte a ciência médica da marcha livre com designs alegres e amorosos.',
      icon: Sprout,
      color: '#4CAF50'
    },
    {
      year: 'Hoje',
      title: 'Inpe Barefoot',
      desc: 'Mais de 5.000 crianças e pais caminham com pés livres e saudáveis. Calçado ético, respeitador da anatomia e adorado pelas famílias.',
      icon: Award,
      color: '#FF9F1C'
    }
  ];

  return (
    <Layout backgroundColor="#FFFDF9">
      <div style={{ backgroundColor: '#FFFDF9', overflowX: 'hidden' }}>

        {/* HERO HEADER SECTION */}
        <section style={{
          backgroundColor: '#FFFDF9',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem) clamp(1rem, 3vw, 2rem)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background circles */}
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,196,102,0.1) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(159,226,221,0.15) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4rem)',
              fontWeight: '900',
              color: '#2C3E50',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              Crescermos Livres, <br />
              <span style={{ color: '#F4C466' }}>Passo a Passo!</span>
            </h1>
          </div>
        </section>

        {/* ORIGIN & FOUNDERS DYNAMIC TABS SECTION */}
        <section style={{ padding: '2rem 10% 6rem', maxWidth: '1400px', margin: '0 auto' }}>

          {/* Dynamic Founders Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key="both"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: isMobile ? '2.5rem 1.5rem' : '4rem 4%',
                borderRadius: '40px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.02)'
              }}
            >
              {/* Left Column: Image / Interactive visual */}
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '450px', paddingBottom: isMobile ? '50px' : '0' }}>
                  <img
                    src="/founders.png"
                    alt="Inês Santos e Inês Oliveira"
                    style={{
                      width: '100%',
                      borderRadius: '32px',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                      border: '6px solid #FFF',
                      transition: 'transform 0.4s'
                    }}
                  />
                  {/* Speech Bubble Overlay Quote */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      bottom: isMobile ? '-40px' : '-25px',
                      right: isMobile ? '0' : '-30px',
                      backgroundColor: '#FF9F1C',
                      color: 'white',
                      padding: '16px 24px',
                      borderRadius: '24px 24px 4px 24px',
                      maxWidth: '280px',
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      boxShadow: '0 10px 25px rgba(255,159,28,0.3)',
                      lineHeight: 1.4
                    }}
                  >
                    &ldquo;Não é apenas sobre sapatos. É sobre dar liberdade a cada passo e deixar as crianças explorarem o mundo como a natureza planeou.&rdquo;
                  </motion.div>
                </div>
              </div>

              {/* Right Column: Narrative Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2C3E50', margin: 0 }}>A Nossa Pegada</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>
                  Inês Santos e Inês Oliveira, são fisioterapeutas e mães de dois casais de crianças entre os 2 e os 6 anos. Foi a fisioterapia que as uniu há mais de 14 anos, mas foi a cumplicidade, a amizade e as aventuras por que passaram juntas que fizeram com que se mantivessem unidas até hoje.
                </p>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>
                  A Barefoot nasceu da visão de duas profissionais unidas pelo compromisso com o bem-estar infantil. A experiência da Inês Santos na fisioterapia pediátrica e o espírito empreendedor da Inês Oliveira deram origem a um projeto dedicado ao desenvolvimento saudável das crianças, promovendo a liberdade de movimento e o crescimento natural desde os primeiros passos.
                </p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem', flexWrap: isMobile ? 'wrap' : 'nowrap', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
                  <Link href="/loja" style={{ textDecoration: 'none', flexShrink: 0 }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '12px 22px',
                        backgroundColor: '#FF9F1C',
                        color: 'white',
                        fontWeight: '800',
                        borderRadius: '50px',
                        boxShadow: '0 8px 20px rgba(255,159,28,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Explorar Modelos <ArrowRight size={15} />
                    </motion.div>
                  </Link>

                  {/* A Nossa Mensagem button */}
                  <motion.button
                    onClick={() => setVideoOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '12px 22px',
                      backgroundColor: 'white',
                      color: '#2C3E50',
                      fontFamily: "var(--font-main, 'Nunito', sans-serif)",
                      fontWeight: '800',
                      borderRadius: '50px',
                      border: '2px solid #2C3E50',
                      boxShadow: '0 8px 20px rgba(44,62,80,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Mensagem InPe
                  </motion.button>
                </div>

                {/* VIDEO MODAL */}
                <AnimatePresence>
                  {videoOpen && (
                    <motion.div
                      key="video-modal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setVideoOpen(false)}
                      style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.82)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '1.5rem',
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.88, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.88, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                          position: 'relative',
                          width: '100%',
                          maxWidth: '860px',
                          backgroundColor: '#000',
                          borderRadius: '24px',
                          overflow: 'hidden',
                          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                        }}
                      >
                        {/* Close button */}
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setVideoOpen(false)}
                          style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            zIndex: 10,
                            background: 'rgba(0,0,0,0.45)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '38px',
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </motion.button>

                        {/* Video player */}
                        <video
                          src="/videos/our-message.mp4"
                          controls
                          autoPlay
                          style={{ width: '100%', display: 'block', maxHeight: '80vh' }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
        {/* O QUE É BAREFOOT SECTION */}
        <section style={{
          background: 'linear-gradient(160deg, #FFF8EC 0%, #F0FAF9 100%)',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 4rem)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,196,102,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,115,150,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: '900',
                color: '#2C3E50',
                textAlign: 'center',
                lineHeight: 1.15,
                marginBottom: '1rem'
              }}
            >
              O que é{' '}
              <span style={{
                background: 'linear-gradient(90deg, #F4C466, #FF9F1C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Barefoot</span>
              ?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                color: '#888',
                textAlign: 'center',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                maxWidth: '600px',
                margin: '0 auto 3.5rem'
              }}
            >
              Calçado que imita o pé descalço, criado para <strong style={{ color: '#2C3E50' }}>libertar</strong>. É ciência aplicada ao movimento natural.
            </motion.p>

            {/* Icon pills row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '3.5rem'
              }}
            >
              {[
                { icon: <Footprints size={16} />, label: 'Sola Plana', color: '#FF9F1C', bg: '#FFF3E0' },
                { icon: <Activity size={16} />, label: 'Sola Flexível', color: '#007396', bg: '#E0F2F1' },
                { icon: <Feather size={16} />, label: 'Leve e Respirável', color: '#4CAF50', bg: '#E8F5E9' },
                { icon: <Zap size={16} />, label: 'Dedos Soltos', color: '#E06A55', bg: '#FFEBEE' },
                { icon: <Sprout size={16} />, label: 'Calcanhar Livre', color: '#7B5EA7', bg: '#F3E5F5' },
              ].map((pill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.07, y: -3 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: pill.bg,
                    borderRadius: '50px',
                    color: pill.color,
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    cursor: 'default'
                  }}
                >
                  {pill.icon} {pill.label}
                </motion.div>
              ))}
            </motion.div>

            {/* Two-column layout: explanation + bullets */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '2.5rem',
                backgroundColor: 'white',
                borderRadius: '32px',
                padding: isMobile ? '2rem 1.5rem' : '3rem 3.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.03)'
              }}
            >
              {/* Left: short explanation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  backgroundColor: '#FFF3E0',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF9F1C'
                }}>
                  <Footprints size={26} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#2C3E50', margin: 0 }}>
                  Descalço por natureza, protegido com propósito
                </h3>
                <p style={{ color: '#777', lineHeight: 1.75, fontSize: '0.98rem', margin: 0 }}>
                  O calçado <em>barefoot</em> foi criado para respeitar a forma natural como os pés se movem, crescem e se desenvolvem. Inspirado na sensação de andar descalço <strong style={{ color: '#2C3E50' }}> oferece proteção sem comprometer a liberdade</strong> de movimento.
                </p>
              </div>

              {/* Right: bullet points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2C3E50', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  O que define um sapato barefoot?
                </h3>
                {[
                  { icon: <Maximize size={16} />, text: 'Sola plana para um alinhamento natural do corpo', color: '#FF9F1C' },
                  { icon: <Activity size={16} />, text: 'Flexibilidade que acompanha cada movimento', color: '#007396' },
                  { icon: <Maximize size={16} />, text: 'Materiais leves e respiráveis para conforto diário', color: '#4CAF50' },
                  { icon: <Feather size={16} />, text: 'Espaço amplo para os dedos se moverem livremente', color: '#E06A55' },
                  { icon: <Heart size={16} />, text: 'Calcanhar livre para um movimento natural', color: '#7B5EA7' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      backgroundColor: '#FAFAFA',
                    }}
                  >
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      backgroundColor: `${item.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      marginTop: '1px'
                    }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: '0.92rem', color: '#555', fontWeight: '600', lineHeight: 1.5 }}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>
        {/* FAQ SECTION */}
        <section style={{
          backgroundColor: '#FFFDF9',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '3.5rem' }}
            >
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: '900',
                color: '#2C3E50',
                textTransform: 'uppercase',
                margin: '0 0 0.75rem'
              }}>
                Perguntas <span style={{ color: '#FF9F1C' }}>Frequentes</span>
              </h2>
              <p style={{ color: '#999', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                Tudo o que precisas de saber sobre calçado barefoot e a Inpe.
              </p>
            </motion.div>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gridTemplateRows: isMobile ? 'auto' : 'auto auto',
              gap: '1.25rem',
            }}>

              {/* FAQ cards — col 1-3, rows 1-2 (6 cards) */}
              {[
                {
                  q: 'O que é calçado barefoot?',
                  a: 'Calçado que imita a sensação de andar descalço — sola plana, flexível e com espaço para os dedos se moverem livremente.',
                  color: '#FF9F1C', bg: '#FFF3E0', icon: <Footprints size={22} />
                },
                {
                  q: 'A partir de que idade?',
                  a: 'Os nossos modelos estão disponíveis desde os primeiros passos. Consulta o nosso guia de tamanhos para encontrares o par certo.',
                  color: '#007396', bg: '#E0F2F1', icon: <Sprout size={22} />
                },
                {
                  q: 'Como medir o pé do meu filho?',
                  a: 'Coloca o pé numa folha, traça o contorno e mede do calcanhar à ponta do dedo mais comprido. Adiciona 1 cm para folga de crescimento.',
                  color: '#4CAF50', bg: '#E8F5E9', icon: <Maximize size={22} />
                },
                {
                  q: 'Qual a diferença para um sapato normal?',
                  a: 'Sola zero-drop, bico largo, contraforte macio e materiais leves. Tudo pensado para não interferir no desenvolvimento natural do pé.',
                  color: '#E06A55', bg: '#FFEBEE', icon: <Activity size={22} />
                },
                {
                  q: 'São indicados para uso diário?',
                  a: 'Sim! São desenvolvidos para uso intenso — escola, parque, praia. Leves, respiráveis e fáceis de calçar.',
                  color: '#7B5EA7', bg: '#F3E5F5', icon: <Zap size={22} />
                },
                {
                  q: 'Os materiais são seguros e ecológicos?',
                  a: 'Usamos materiais certificados, livres de substâncias nocivas. Produção consciente a pensar nas crianças e no planeta.',
                  color: '#F4C466', bg: '#FFFDE7', icon: <Feather size={22} />
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(0,0,0,0.06)' }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: '2rem 1.75rem',
                    border: '1px solid rgba(0,0,0,0.04)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: item.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '800',
                    color: '#2C3E50',
                    margin: 0,
                    lineHeight: 1.35,
                  }}>
                    {item.q}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#777',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {item.a}
                  </p>
                </motion.div>
              ))}

              {/* CTA Card — last column, spans both rows */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  gridColumn: isMobile ? '1' : '4',
                  gridRow: isMobile ? 'auto' : '1 / span 2',
                  background: 'linear-gradient(160deg, #FF9F1C 0%, #F4C466 100%)',
                  borderRadius: '28px',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 16px 40px rgba(255,159,28,0.25)',
                  minHeight: isMobile ? '240px' : 'unset',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}>
                  <Sparkles size={30} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '900',
                    color: 'white',
                    margin: '0 0 0.6rem',
                    lineHeight: 1.25,
                  }}>
                    Tens mais alguma questão?
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    A nossa equipa está sempre disponível para te ajudar a escolher o par perfeito.
                  </p>
                </div>
                <Link href="/contactos" style={{ textDecoration: 'none', width: '100%' }}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      backgroundColor: 'white',
                      color: '#FF9F1C',
                      fontWeight: '800',
                      fontSize: '0.95rem',
                      padding: '14px 28px',
                      borderRadius: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    }}
                  >
                    Falar Connosco <ArrowRight size={16} />
                  </motion.div>
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default HistoryClient2;
