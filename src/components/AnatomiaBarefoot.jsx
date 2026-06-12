'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Ruler, Activity, Wind, Maximize2, ShieldCheck } from 'lucide-react';

const ZeroDropAnimation = () => {
  const [isBarefoot, setIsBarefoot] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={(e) => { e.preventDefault(); setIsBarefoot(false); }}
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: !isBarefoot ? '#E06A55' : '#EAEAEA',
            color: !isBarefoot ? 'white' : '#666',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Salto Convencional
        </button>
        <button
          onClick={(e) => { e.preventDefault(); setIsBarefoot(true); }}
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: isBarefoot ? '#006D8F' : '#EAEAEA',
            color: isBarefoot ? 'white' : '#666',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Inpe Barefoot
        </button>
      </div>

      <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
        <line x1="20" y1="150" x2="220" y2="150" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />

        <motion.g
          animate={{
            y: isBarefoot ? 0 : -20,
            rotate: isBarefoot ? 0 : -6
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          style={{ transformOrigin: '70px 150px' }}
        >
          <path
            d="M 50,150 C 50,140 70,135 85,135 C 120,135 150,115 180,115 C 195,115 205,130 205,150 Z"
            fill="none"
            stroke="#2C3E50"
            strokeWidth="2.5"
          />
          {!isBarefoot && (
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              d="M 175,150 L 205,150 L 205,130 Z"
              fill="#E06A55"
              opacity="0.25"
            />
          )}
          <line x1="75" y1="145" x2="190" y2="145" stroke={isBarefoot ? "#006D8F" : "#E06A55"} strokeWidth="2" strokeDasharray="3 3" />
        </motion.g>

        <motion.g
          animate={{
            x: isBarefoot ? 95 : 82,
            rotate: isBarefoot ? 0 : 10
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          style={{ transformOrigin: '95px 125px' }}
        >
          <line x1="95" y1="125" x2="95" y2="55" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" />
          <line x1="95" y1="55" x2="95" y2="15" stroke={isBarefoot ? "#27AE60" : "#E06A55"} strokeWidth="3.5" strokeLinecap="round" />
          <text x="110" y="35" fill={isBarefoot ? "#27AE60" : "#E06A55"} fontSize="10" fontWeight="bold">
            {isBarefoot ? "Postura Alinhada" : "Desalinhado / Tensão"}
          </text>
        </motion.g>

        <line x1="215" y1="150" x2="215" y2="130" stroke="#E06A55" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="222" y="144" fill="#E06A55" fontSize="9" fontWeight="bold">
          {!isBarefoot ? "Salto" : "0mm"}
        </text>
      </svg>
    </div>
  );
};

const SolaFlexivelAnimation = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
      <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
        <line x1="20" y1="150" x2="220" y2="150" stroke="#CCCCCC" strokeWidth="1.5" strokeDasharray="3 3" />

        <motion.g
          animate={{
            rotate: [0, -12, 18, 0],
            y: [0, -8, 0, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '80px 135px' }}
        >
          <path
            d="M 70,135 C 60,110 80,95 105,95 C 130,95 155,80 180,98 C 198,110 205,128 198,135 Z"
            fill="none"
            stroke="#2C3E50"
            strokeWidth="2.5"
          />
          <path
            d="M 70,135 Q 130,140 198,135"
            fill="none"
            stroke="#F4C466"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.g
            animate={{
              rotate: [0, -20, 38, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: '145px 135px' }}
          >
            <path
              d="M 145,135 Q 170,137 198,135"
              fill="none"
              stroke="#006D8F"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 145,135 C 158,115 180,110 198,135"
              fill="none"
              stroke="#2C3E50"
              strokeWidth="1.5"
            />
          </motion.g>
        </motion.g>

        <motion.g
          animate={{
            y: [15, -3, -35, 15],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M 195,165 L 195,148 M 191,152 L 195,148 L 199,152" stroke="#006D8F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="175" y="178" fill="#006D8F" fontSize="9" fontWeight="bold">Flexibilidade</text>
        </motion.g>
      </svg>
    </div>
  );
};

const MateriaisRespiraveisAnimation = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
        <path
          d="M 50,135 C 40,110 60,95 85,95 C 110,95 135,80 160,98 C 178,110 185,128 175,135 Z"
          fill="none"
          stroke="#2C3E50"
          strokeWidth="2.5"
        />
        <path
          d="M 50,135 Q 110,140 175,135"
          fill="none"
          stroke="#F4C466"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {[...Array(5)].map((_, i) => {
          const delay = i * 0.5;
          const x = 75 + (i * 16);
          const yStart = 105 + (i % 2) * 8;
          return (
            <motion.path
              key={i}
              d={`M ${x},${yStart} Q ${x - 8},${yStart - 20} ${x},${yStart - 40} T ${x - 4},${yStart - 65}`}
              fill="none"
              stroke="#006D8F"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.8, 0],
                y: [0, -25]
              }}
              transition={{
                duration: 2.2,
                delay: delay,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          );
        })}

        <motion.g
          animate={{
            y: [0, -6, 0],
            rotate: [0, 4, -4, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '120px 50px' }}
        >
          <path
            d="M 98,58 C 98,58 108,40 125,40 C 133,40 142,47 142,47 C 142,47 129,53 116,53 L 98,58"
            fill="#F4C466"
            opacity="0.8"
          />
          <path d="M 94,60 L 146,45" stroke="#854931" strokeWidth="1.2" strokeLinecap="round" />
          <text x="95" y="75" fill="#854931" fontSize="9" fontWeight="bold">Extra Leve (~120g)</text>
        </motion.g>
      </svg>
    </div>
  );
};

const PonteiraAmplaAnimation = () => {
  const [isWide, setIsWide] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={(e) => { e.preventDefault(); setIsWide(false); }}
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: !isWide ? '#E06A55' : '#EAEAEA',
            color: !isWide ? 'white' : '#666',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Sapato Apertado
        </button>
        <button
          onClick={(e) => { e.preventDefault(); setIsWide(true); }}
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: isWide ? '#006D8F' : '#EAEAEA',
            color: isWide ? 'white' : '#666',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Ponteira Inpe
        </button>
      </div>

      <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
        <motion.path
          animate={{
            d: isWide
              ? "M 70,150 C 70,150 70,70 70,70 C 70,70 88,40 120,40 C 152,40 170,70 170,70 L 170,150 Z"
              : "M 82,150 C 82,150 82,78 82,78 C 82,78 102,32 120,32 C 138,32 158,78 158,78 L 158,150 Z"
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          fill="none"
          stroke="#2C3E50"
          strokeWidth="2.5"
        />

        <g>
          <path d="M 90,140 C 90,123 93,107 98,82 C 102,65 107,60 120,60 C 133,60 138,65 142,82 C 147,107 150,123 150,140 Z" fill="#EAEAEA" opacity="0.7" />

          <motion.circle
            animate={{
              cx: isWide ? 98 : 106,
              cy: isWide ? 50 : 54,
              r: 8.5
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            fill={isWide ? "#006D8F" : "#E06A55"}
          />

          <motion.circle
            animate={{
              cx: isWide ? 111 : 115,
              cy: isWide ? 44 : 48,
              r: 6
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            fill={isWide ? "#006D8F" : "#E06A55"}
          />

          <motion.circle
            animate={{
              cx: isWide ? 123 : 124,
              cy: isWide ? 43 : 48,
              r: 5.5
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            fill={isWide ? "#006D8F" : "#E06A55"}
          />

          <motion.circle
            animate={{
              cx: isWide ? 134 : 131,
              cy: isWide ? 46 : 50,
              r: 5
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            fill={isWide ? "#006D8F" : "#E06A55"}
          />

          <motion.circle
            animate={{
              cx: isWide ? 145 : 138,
              cy: isWide ? 53 : 56,
              r: 4.5
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            fill={isWide ? "#006D8F" : "#E06A55"}
          />
        </g>

        <text x="120" y="170" textAnchor="middle" fill={isWide ? "#006D8F" : "#E06A55"} fontSize="10" fontWeight="bold">
          {isWide ? "Dedos Livres e Espalhados" : "Dedos Comprimidos / Apertados"}
        </text>
      </svg>
    </div>
  );
};

const SemContraforteAnimation = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
        <line x1="20" y1="150" x2="220" y2="150" stroke="#CCCCCC" strokeWidth="1.5" strokeDasharray="3 3" />

        <g transform="translate(50, 0)">
          <path
            d="M -10,150 C -10,150 -10,125 15,125 C 40,125 56,100 56,100 C 56,100 64,88 80,88"
            fill="none"
            stroke="#2C3E50"
            strokeWidth="2.5"
          />

          <motion.path
            animate={{
              d: [
                "M 15,125 Q -10,125 -10,150",
                "M 15,125 Q 10,142 -10,150",
                "M 15,125 Q 20,146 -10,150",
                "M 15,125 Q -10,125 -10,150"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill="none"
            stroke="#006D8F"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path d="M -20,150 L 80,150" stroke="#F4C466" strokeWidth="7" strokeLinecap="round" />

          <motion.g
            animate={{
              x: [-35, -8, 8, -35],
              y: [90, 110, 130, 90],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <circle cx="0" cy="0" r="12" fill="#006D8F" opacity="0.15" />
            <path d="M 0,0 L -8,-8" stroke="#006D8F" strokeWidth="1.5" />
            <text x="5" y="-10" fill="#006D8F" fontSize="8" fontWeight="bold">Maleável</text>
          </motion.g>
        </g>

        <text x="120" y="40" textAnchor="middle" fill="#854931" fontSize="10" fontWeight="bold">
          Zero Rigidez • Conforto Sem Bolhas
        </text>
      </svg>
    </div>
  );
};

const AnatomiaBarefoot = ({ isMobile }) => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: 'Zero-drop para alinhamento natural',
      subtitle: 'Alinhamento da Coluna',
      description: 'A sola tem a mesma altura à frente e atrás (0mm de inclinação). Isto mantém a coluna numa posição neutra, reduz a pressão nas articulações e distribui o peso corporal uniformemente, tal como se estivesse descalço.',
      benefit: 'Melhora a postura corporal e reduz dores nas costas.',
      icon: Ruler,
      color: '#006D8F',
      bg: '#e0f2f1',
      animation: <ZeroDropAnimation />
    },
    {
      title: 'Sola ultra-flexível e resistente',
      subtitle: 'Fortalecimento do Pé',
      description: 'A nossa sola dobra-se e torce-se a 360° com total facilidade. Permite que os músculos do pé se movam e trabalhem ativamente a cada passo, restabelecendo a força do pé e a sensibilidade sensorial natural.',
      benefit: 'Músculos mais fortes e maior estabilidade no solo.',
      icon: Activity,
      color: '#F4C466',
      bg: '#fffcf2',
      animation: <SolaFlexivelAnimation />
    },
    {
      title: 'Materiais respiráveis e leves',
      subtitle: 'Sensação de Leveza',
      description: 'Produzido com materiais ultra-leves e tecidos respiráveis premium que permitem a circulação de ar contínua. Os pés mantêm-se secos, frescos e confortáveis, mesmo nos dias mais ativos.',
      benefit: 'Prevenção de sobreaquecimento, humidade e fricção.',
      icon: Wind,
      color: '#006D8F',
      bg: '#e0f2f1',
      animation: <MateriaisRespiraveisAnimation />
    },
    {
      title: 'Ponteira ampla com espaço para os dedos',
      subtitle: 'Espaço Anatomico para Dedos',
      description: 'Uma parte frontal larga que respeita a forma anatómica natural do pé. Os dedos têm todo o espaço necessário para se espalharem e apoiarem firmemente, evitando deformações, unhas encravadas ou joanetes.',
      benefit: 'Maior equilíbrio, estabilidade e dedos livres de aperto.',
      icon: Maximize2,
      color: '#F4C466',
      bg: '#fffcf2',
      animation: <PonteiraAmplaAnimation />
    },
    {
      title: 'Sem contraforte na zona do calcanhar',
      subtitle: 'Zero Pressão e Atrito',
      description: 'A ausência de peças rígidas de plástico na zona do calcanhar elimina qualquer pressão ou atrito. O calçado adapta-se de forma flexível ao tendão de aquiles, prevenindo bolhas e permitindo movimento articular livre.',
      benefit: 'Zero bolhas, zero atrito e flexibilidade no calcanhar.',
      icon: ShieldCheck,
      color: '#006D8F',
      bg: '#e0f2f1',
      animation: <SemContraforteAnimation />
    }
  ];

  return (
    <section className="anatomia-barefoot-section" style={{ padding: isMobile ? '3rem 5%' : '6rem 12%', backgroundColor: '#fffdf9', position: 'relative', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem', maxWidth: '800px', margin: '0 auto ' + (isMobile ? '2.5rem' : '4rem') }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', color: '#2C3E50', textTransform: 'uppercase', marginBottom: '1rem', lineHeight: 1.1 }}>
          Características Inpe
        </h2>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isOpen = activeTab === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  border: '1px solid ' + (isOpen ? feature.color + '40' : '#EAEAEA'),
                  overflow: 'hidden',
                  boxShadow: isOpen ? '0 10px 20px rgba(0, 0, 0, 0.04)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={(e) => { e.preventDefault(); setActiveTab(isOpen ? -1 : idx); }}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      backgroundColor: feature.bg,
                      color: feature.color,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#2C3E50', margin: 0 }}>
                        {feature.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: feature.color, fontWeight: '700', textTransform: 'uppercase' }}>
                        {feature.subtitle}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      color: '#888',
                      flexShrink: 0
                    }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div style={{ padding: '0 20px 20px', borderTop: '1px solid #F6F6F6' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '15px 0', minHeight: '180px' }}>
                          {feature.animation}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5, marginBottom: '15px' }}>
                          {feature.description}
                        </p>
                        <div style={{
                          backgroundColor: feature.bg,
                          color: '#2C3E50',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          borderLeft: `3px solid ${feature.color}`
                        }}>
                          ✨ {feature.benefit}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeTab === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`feature-tab ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '20px 24px',
                    borderRadius: '20px',
                    backgroundColor: isActive ? 'white' : 'transparent',
                    border: '1px solid ' + (isActive ? feature.color + '30' : 'transparent'),
                    boxShadow: isActive ? '0 10px 25px rgba(0, 0, 0, 0.03)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFeatureIndicator"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '15%',
                        height: '70%',
                        width: '4px',
                        backgroundColor: feature.color,
                        borderRadius: '0 4px 4px 0'
                      }}
                    />
                  )}

                  <div style={{
                    backgroundColor: feature.bg,
                    color: feature.color,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isActive ? '0 8px 16px ' + feature.color + '15' : 'none',
                    transition: 'transform 0.3s'
                  }}>
                    <Icon size={24} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: '800',
                      color: '#2C3E50',
                      margin: '0 0 3px'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: '0.85rem',
                      color: isActive ? '#555' : '#777',
                      margin: 0,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: isActive ? 2 : 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {isActive ? feature.description : feature.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '28px',
                  padding: '30px 35px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(244, 196, 102, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: '480px'
                }}
              >
                <div style={{
                  height: '210px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  backgroundColor: '#FFFDF9',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.01)',
                  overflow: 'hidden'
                }}>
                  {features[activeTab].animation}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <span style={{
                    backgroundColor: features[activeTab].bg,
                    color: features[activeTab].color,
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'inline-block',
                    marginBottom: '10px'
                  }}>
                    {features[activeTab].subtitle}
                  </span>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#2C3E50', marginBottom: '8px' }}>
                    {features[activeTab].title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.55, marginBottom: '15px' }}>
                    {features[activeTab].description}
                  </p>

                  <div style={{
                    backgroundColor: features[activeTab].bg + '50',
                    color: '#2C3E50',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    borderLeft: `4px solid ${features[activeTab].color}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>✨</span>
                    <span>{features[activeTab].benefit}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      <style>{`
        .feature-tab:hover {
          background-color: rgba(255, 255, 255, 0.7) !important;
          transform: translateY(-2px);
        }
        .feature-tab.active:hover {
          background-color: white !important;
          transform: none;
        }
        .feature-tab:hover div:first-child {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  );
};

export default AnatomiaBarefoot;
