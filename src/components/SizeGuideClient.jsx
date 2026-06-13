'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ruler, HelpCircle, Check, Info, ShoppingBag, Smile, 
  ShieldCheck, HelpCircle as QuestionIcon
} from 'lucide-react';
import Link from 'next/link';
import Layout from './Layout';

// Full Size Table Data matching catalog and calculators
const sizeData = [
  { size: '18', footCm: '10.0 - 10.4', insoleCm: '11.0 - 11.4', age: '6-9 meses', category: 'baby' },
  { size: '19', footCm: '10.5 - 10.9', insoleCm: '11.5 - 11.9', age: '9-12 meses', category: 'baby' },
  { size: '20', footCm: '11.0 - 11.6', insoleCm: '12.0 - 12.6', age: '12-15 meses', category: 'baby' },
  { size: '21', footCm: '11.7 - 12.3', insoleCm: '12.7 - 13.3', age: '15-18 meses', category: 'baby' },
  { size: '22', footCm: '12.4 - 13.0', insoleCm: '13.4 - 14.0', age: '18-21 meses', category: 'kid' },
  { size: '23', footCm: '13.1 - 13.6', insoleCm: '14.1 - 14.6', age: '21-24 meses', category: 'kid' },
  { size: '24', footCm: '13.7 - 14.3', insoleCm: '14.7 - 15.3', age: '2-3 anos', category: 'kid' },
  { size: '25', footCm: '14.4 - 14.9', insoleCm: '15.4 - 15.9', age: '3-4 anos', category: 'kid' },
  { size: '26', footCm: '15.0 - 15.6', insoleCm: '16.0 - 16.6', age: '4-5 anos', category: 'kid' },
  { size: '27', footCm: '15.7 - 16.3', insoleCm: '16.7 - 17.3', age: '5-6 anos', category: 'kid' },
  { size: '28', footCm: '16.4 - 16.9', insoleCm: '17.4 - 17.9', age: '6-7 anos', category: 'kid' },
  { size: '29', footCm: '17.0 - 17.6', insoleCm: '18.0 - 18.6', age: '7-8 anos', category: 'kid' },
  { size: '30', footCm: '17.7 - 18.3', insoleCm: '18.7 - 19.3', age: '8-9 anos', category: 'junior' },
  { size: '31', footCm: '18.4 - 18.9', insoleCm: '19.4 - 19.9', age: '9-10 anos', category: 'junior' },
  { size: '32', footCm: '19.0 - 19.6', insoleCm: '20.0 - 20.6', age: '10-11 anos', category: 'junior' },
  { size: '33', footCm: '19.7 - 20.3', insoleCm: '20.7 - 21.3', age: '11-12 anos', category: 'junior' },
  { size: '34', footCm: '20.4 - 20.9', insoleCm: '21.4 - 21.9', age: '12+ anos', category: 'junior' },
];

const SizeGuideClient = () => {
  // Calculator States
  const [footLengthInput, setFootLengthInput] = useState('14.5');
  const [recSize, setRecSize] = useState(null);

  // Table States
  const [activeTab, setActiveTab] = useState('all'); // all, baby, kid, junior

  // How to Measure States
  const [activeStep, setActiveStep] = useState(0);

  // Calculate size recommendation
  useEffect(() => {
    const num = parseFloat(footLengthInput);
    if (isNaN(num) || num <= 0 || num > 30) {
      setRecSize(null);
      return;
    }

    const targetLength = num + 1.0; // matching ProductClient.tsx logic
    let recommended = '';
    let insoleVal = 0;
    let label = '';

    if (targetLength < 11.5) { recommended = '18'; insoleVal = 11.2; label = 'Bebé'; }
    else if (targetLength < 12.0) { recommended = '19'; insoleVal = 11.7; label = 'Bebé'; }
    else if (targetLength < 12.7) { recommended = '20'; insoleVal = 12.3; label = 'Bebé'; }
    else if (targetLength < 13.4) { recommended = '21'; insoleVal = 13.0; label = 'Bebé'; }
    else if (targetLength < 14.1) { recommended = '22'; insoleVal = 13.7; label = 'Criança'; }
    else if (targetLength < 14.7) { recommended = '23'; insoleVal = 14.35; label = 'Criança'; }
    else if (targetLength < 15.4) { recommended = '24'; insoleVal = 15.0; label = 'Criança'; }
    else if (targetLength < 16.0) { recommended = '25'; insoleVal = 15.65; label = 'Criança'; }
    else if (targetLength < 16.7) { recommended = '26'; insoleVal = 16.3; label = 'Criança'; }
    else if (targetLength < 17.4) { recommended = '27'; insoleVal = 17.0; label = 'Criança'; }
    else if (targetLength < 18.0) { recommended = '28'; insoleVal = 17.65; label = 'Criança'; }
    else if (targetLength < 18.7) { recommended = '29'; insoleVal = 18.3; label = 'Criança'; }
    else if (targetLength < 19.4) { recommended = '30'; insoleVal = 19.0; label = 'Juvenil'; }
    else if (targetLength < 20.0) { recommended = '31'; insoleVal = 19.65; label = 'Juvenil'; }
    else if (targetLength < 20.7) { recommended = '32'; insoleVal = 20.3; label = 'Juvenil'; }
    else if (targetLength < 21.4) { recommended = '33'; insoleVal = 21.0; label = 'Juvenil'; }
    else if (targetLength < 22.0) { recommended = '34'; insoleVal = 21.65; label = 'Juvenil'; }
    else { recommended = '35+'; insoleVal = num + 1.0; label = 'Juvenil'; }

    const wiggle = insoleVal - num;
    let status = 'ideal'; // tight, ideal, loose, huge
    if (wiggle < 0.5) status = 'tight';
    else if (wiggle < 0.8) status = 'warning';
    else if (wiggle > 1.5) status = 'huge';
    else if (wiggle > 1.2) status = 'loose';

    setRecSize({
      size: recommended,
      insoleLength: insoleVal,
      footLength: num,
      wiggleRoom: wiggle,
      label,
      status
    });
  }, [footLengthInput]);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  // How to Measure Step Data (Simplified and Condensed)
  const steps = [
    {
      number: 1,
      title: 'Apoiar o pé',
      instruction: 'Coloca uma folha de papel encostada à parede e posiciona o calcanhar da criança encostado à parede.',
      animation: (
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          <line x1="20" y1="160" x2="180" y2="160" stroke="var(--color-secondary)" strokeWidth="4" />
          <rect x="20" y="156" width="160" height="4" fill="var(--color-secondary)" />
          <rect x="40" y="50" width="120" height="110" fill="white" rx="8" stroke="#eaeaea" strokeWidth="1" style={{ filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))' }} />
          
          <g style={{ animation: 'footStep 3s infinite ease-in-out' }}>
            <path
              d="M100 150 C90 150, 85 138, 85 120 C85 100, 88 88, 92 76 C94 68, 102 65, 112 65 C122 65, 126 76, 126 95 C126 113, 122 129, 115 141 C108 150, 105 150, 100 150 Z"
              fill="var(--color-primary)"
              opacity="0.85"
            />
            <circle cx="119" cy="53" r="6.5" fill="var(--color-primary)" />
            <circle cx="109" cy="54" r="5" fill="var(--color-primary)" />
            <circle cx="99" cy="57" r="4.5" fill="var(--color-primary)" />
            <circle cx="90" cy="62" r="4" fill="var(--color-primary)" />
            <circle cx="82" cy="69" r="3.5" fill="var(--color-primary)" />
          </g>
          <text x="100" y="182" textAnchor="middle" fill="var(--color-secondary)" fontSize="9" fontWeight="800" fontFamily="var(--font-main)" letterSpacing="1">PAREDE</text>
        </svg>
      )
    },
    {
      number: 2,
      title: 'Marcar o dedo',
      instruction: 'Com um lápis, desenha um traço rente ao dedo mais longo (geralmente o dedo grande).',
      animation: (
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          <line x1="20" y1="160" x2="180" y2="160" stroke="var(--color-secondary)" strokeWidth="2" />
          <rect x="40" y="50" width="120" height="110" fill="white" rx="8" stroke="#eaeaea" />
          
          <g>
            <path
              d="M100 150 C90 150, 85 138, 85 120 C85 100, 88 88, 92 76 C94 68, 102 65, 112 65 C122 65, 126 76, 126 95 C126 113, 122 129, 115 141 C108 150, 105 150, 100 150 Z"
              fill="var(--color-primary)"
              opacity="0.5"
            />
            <circle cx="119" cy="53" r="6.5" fill="var(--color-primary)" opacity="0.5" />
            <circle cx="109" cy="54" r="5" fill="var(--color-primary)" opacity="0.5" />
            <circle cx="99" cy="57" r="4.5" fill="var(--color-primary)" opacity="0.5" />
            <circle cx="90" cy="62" r="4" fill="var(--color-primary)" opacity="0.5" />
            <circle cx="82" cy="69" r="3.5" fill="var(--color-primary)" opacity="0.5" />
          </g>
          
          <g style={{ animation: 'pencilMark 3s infinite ease-in-out' }}>
            <path d="M 119 53 L 135 15 L 145 19 L 129 57 Z" fill="var(--color-accent-brown)" />
            <path d="M 119 53 L 122 46 L 126 48 Z" fill="var(--color-primary)" />
            <circle cx="119" cy="53" r="1.5" fill="black" />
          </g>
          
          <line x1="90" y1="53" x2="145" y2="53" stroke="var(--color-accent-brown)" strokeWidth="2" strokeDasharray="4,2" style={{ animation: 'dotBlink 3s infinite' }} />
          <circle cx="119" cy="53" r="3.5" fill="var(--color-accent-brown)" style={{ animation: 'dotBlink 3s infinite' }} />
        </svg>
      )
    },
    {
      number: 3,
      title: 'Medir em cm',
      instruction: 'Usa uma régua para medir a distância desde o início da folha (parede) até ao traço.',
      animation: (
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          <rect x="40" y="50" width="120" height="110" fill="white" rx="8" stroke="#eaeaea" />
          <line x1="50" y1="150" x2="150" y2="150" stroke="#ccc" strokeWidth="2" />
          <line x1="50" y1="53" x2="150" y2="53" stroke="var(--color-accent-brown)" strokeWidth="2" />
          
          <path d="M 70 150 L 70 53" stroke="var(--color-winter-blue)" strokeWidth="3" strokeDasharray="200" strokeDashoffset="0" style={{ animation: 'lineDraw 3s infinite ease-in-out' }} />
          <line x1="64" y1="150" x2="76" y2="150" stroke="var(--color-winter-blue)" strokeWidth="3" />
          <line x1="64" y1="53" x2="76" y2="53" stroke="var(--color-winter-blue)" strokeWidth="3" />
          
          <g style={{ animation: 'rulerSlide 3s infinite ease-in-out' }}>
            <rect x="135" y="45" width="20" height="115" fill="#f4c466" rx="3" stroke="#e0b050" />
            {[...Array(12)].map((_, i) => (
              <line key={i} x1="135" y1={50 + i * 9.5} x2={i % 5 === 0 ? "145" : "140"} y2={50 + i * 9.5} stroke="var(--color-accent-brown)" strokeWidth="1.2" />
            ))}
          </g>
          
          <g style={{ animation: 'dotBlink 3s infinite' }}>
            <rect x="80" y="90" width="54" height="22" fill="var(--color-winter-blue)" rx="6" />
            <text x="107" y="104" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="var(--font-main)">14.4 cm</text>
          </g>
        </svg>
      )
    },
    {
      number: 4,
      title: 'Somar folga',
      instruction: 'Adiciona 1 cm de folga saudável (mínimo 0.8 cm, máximo 1.2 cm) e escolhe o tamanho ideal.',
      animation: (
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          <path
            d="M100 162 C80 162, 73 140, 73 110 C73 80, 80 50, 92 28 C96 15, 114 10, 130 10 C146 10, 150 25, 150 65 C150 105, 146 135, 134 155 C124 165, 120 162, 100 162 Z"
            fill="none"
            stroke="var(--color-winter-blue)"
            strokeWidth="3"
            strokeDasharray="6,4"
            style={{ animation: 'shoePulse 3s infinite' }}
          />
          <g transform="translate(10, 10) scale(0.94)" transformOrigin="100px 150px">
            <path
              d="M100 150 C90 150, 85 138, 85 120 C85 100, 88 88, 92 76 C94 68, 102 65, 112 65 C122 65, 126 76, 126 95 C126 113, 122 129, 115 141 C108 150, 105 150, 100 150 Z"
              fill="var(--color-primary)"
              opacity="0.8"
            />
            <circle cx="119" cy="53" r="6.5" fill="var(--color-primary)" />
            <circle cx="109" cy="54" r="5" fill="var(--color-primary)" />
            <circle cx="99" cy="57" r="4.5" fill="var(--color-primary)" />
            <circle cx="90" cy="62" r="4" fill="var(--color-primary)" />
            <circle cx="82" cy="69" r="3.5" fill="var(--color-primary)" />
          </g>
          
          <path
            d="M 103 26 Q 120 22 136 26 L 130 45 Q 118 42 105 45 Z"
            fill="var(--color-teal)"
            opacity="0.75"
            style={{ animation: 'greenGlow 3s infinite ease-in-out' }}
          />
          
          <line x1="120" y1="23" x2="72" y2="23" stroke="#4dbbb0" strokeWidth="1.5" />
          <circle cx="120" cy="23" r="2.5" fill="#4dbbb0" />
          
          <rect x="25" y="14" width="42" height="18" fill="var(--color-teal)" rx="4" />
          <text x="46" y="26" fill="var(--color-text)" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="var(--font-main)">+1.0 cm</text>
          <text x="100" y="180" textAnchor="middle" fill="var(--color-winter-blue)" fontSize="9" fontWeight="900" fontFamily="var(--font-main)" letterSpacing="0.5">FOLGA SAUDÁVEL</text>
        </svg>
      )
    }
  ];

  // Filtering Sizes Table logic by category tab only
  const filteredSizes = sizeData.filter((item) => {
    return activeTab === 'all' || item.category === activeTab;
  });

  // Wiggle Room Status Labels
  const getStatusText = (status) => {
    switch (status) {
      case 'tight':
        return { text: 'Muito apertado ⚠️', color: '#e06a55', desc: 'A folga é menor do que 0.5cm. Recomendamos escolher um tamanho maior para garantir o desenvolvimento saudável.' };
      case 'warning':
        return { text: 'Folga mínima ⚠️', color: '#ffb703', desc: 'Espaço ligeiramente curto (0.5 a 0.8cm). Servirá temporariamente, mas os pezinhos crescem rápido!' };
      case 'loose':
        return { text: 'Folga generosa 👍', color: '#007396', desc: 'Espaço excelente (1.2 a 1.5cm). Dá ótima margem de crescimento e conforto.' };
      case 'huge':
        return { text: 'Muito grande ⚠️', color: '#e06a55', desc: 'Espaço superior a 1.5cm. Pode causar tropeções na marcha. Recomenda um tamanho menor.' };
      default:
        return { text: 'Ideal (Folga Perfeita) ✨', color: '#2ec4b6', desc: 'Folga ideal (0.8 a 1.2cm). Permite que os dedos se abram e o pé flexione perfeitamente.' };
    }
  };

  return (
    <Layout backgroundColor="var(--color-background)">
      {/* Dynamic Keyframes Animation Injection */}
      <style>{`
        @keyframes footStep {
          0% { transform: translateY(-30px); opacity: 0; }
          25% { transform: translateY(0); opacity: 1; }
          75% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        @keyframes pencilMark {
          0% { transform: translate(15px, -15px) rotate(20deg); opacity: 0; }
          15% { transform: translate(15px, -15px) rotate(20deg); opacity: 1; }
          30% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          45% { transform: translate(-8px, 2px) rotate(-10deg); opacity: 1; }
          60% { transform: translate(5px, 0) rotate(5deg); opacity: 1; }
          75% { transform: translate(15px, -15px) rotate(20deg); opacity: 1; }
          90% { transform: translate(30px, -30px) rotate(20deg); opacity: 0; }
          100% { transform: translate(15px, -15px) rotate(20deg); opacity: 0; }
        }
        @keyframes dotBlink {
          0%, 25%, 100% { opacity: 0; }
          30%, 85% { opacity: 1; }
        }
        @keyframes rulerSlide {
          0% { transform: translateX(45px); opacity: 0; }
          20%, 80% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(45px); opacity: 0; }
        }
        @keyframes lineDraw {
          0%, 15% { stroke-dashoffset: 200; }
          45%, 80% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 200; }
        }
        @keyframes shoePulse {
          0%, 100% { stroke-width: 2px; stroke: var(--color-winter-blue); opacity: 0.5; }
          50% { stroke-width: 3.5px; stroke: var(--color-primary); opacity: 1; }
        }
        @keyframes greenGlow {
          0%, 100% { opacity: 0.4; fill: var(--color-teal); }
          50% { opacity: 0.9; fill: #4dbbb0; }
        }
        .contact-subtle-btn:hover {
          background-color: var(--color-winter-blue) !important;
          color: white !important;
        }
        .guide-split-section {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .guide-split-section {
            display: flex !important;
            flex-direction: column !important;
            gap: 3rem !important;
          }
        }
        .calculator-card {
          position: sticky;
          top: 100px;
          scroll-margin-top: 100px;
        }
        @media (max-width: 900px) {
          .calculator-card {
            position: relative !important;
            top: auto !important;
          }
        }
        .step-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(244, 196, 102, 0.35) !important;
        }
        .step-cta-btn-alt:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(128, 151, 165, 0.35) !important;
        }
      `}</style>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>

        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '1rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: '900',
            color: 'var(--color-winter-blue)',
            marginBottom: '1.2rem',
            lineHeight: 1.1,
            textTransform: 'uppercase'
          }}>
            Encontra o Tamanho Perfeito
          </h1>
          <p style={{
            maxWidth: '700px',
            margin: '0 auto',
            color: 'var(--color-text-light)',
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Cada pezinho é uma obra de arte.
          </p>
        </div>

        {/* SECTION: COMO MEDIR? (ANIMATED WIZARD - SIMPLIFIED) */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: '2.5rem',
          marginBottom: '5rem',
          border: '1px solid rgba(133, 73, 49, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2.5rem', width: '100%' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-text)', margin: 0 }}>
              Como Medir o Pé?
            </h2>
          </div>

          {/* Stepper Progress Bar at the top */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '550px',
            margin: '0 auto 2.5rem',
            gap: '8px',
            position: 'relative'
          }}>
            {/* Connecting background Line */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', height: '2px', backgroundColor: '#f0f0f0', zIndex: 0 }} />
            {/* Connecting active Progress Line */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: `calc(${(activeStep / 3) * 100}% - 15px)`,
              height: '2px',
              backgroundColor: 'var(--color-primary)',
              zIndex: 0,
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />

            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 1,
                    flex: 1
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--color-primary)' : (isCompleted ? 'var(--color-teal)' : 'white'),
                    border: isActive ? '3px solid white' : '2px solid #eaeaea',
                    boxShadow: isActive ? '0 0 0 2px var(--color-primary), var(--shadow-card)' : 'none',
                    color: isActive ? 'white' : (isCompleted ? 'var(--color-text)' : '#999'),
                    fontWeight: '900',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    {isCompleted ? <Check size={14} strokeWidth={3} /> : step.number}
                  </div>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: isActive ? '800' : '600',
                    color: isActive ? 'var(--color-accent-brown)' : '#777',
                    textAlign: 'center',
                    transition: 'color 0.3s'
                  }}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper Content Animation & Text below */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '400px',
            gap: '1.5rem'
          }}>
            {/* The animation container */}
            <div style={{
              backgroundColor: '#fffdf9',
              border: '2px dashed #f4c466',
              borderRadius: 'var(--border-radius)',
              aspectRatio: '1',
              width: '100%',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: 'inset 0 0 20px rgba(244, 196, 102, 0.05)'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {steps[activeStep].animation}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Short direct text description */}
            <div style={{ minHeight: '40px', textAlign: 'center', width: '100%' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    margin: 0,
                    fontSize: '0.92rem',
                    color: 'var(--color-text)',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    padding: '0 10px'
                  }}
                >
                  {steps[activeStep].instruction}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Quick Actions Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '0.5rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              width: '100%'
            }}>
              <a
                href="#calculadora"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text)',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(244, 196, 102, 0.2)',
                  border: 'none',
                  transition: 'all 0.2s'
                }}
                className="step-cta-btn"
              >
                👣 Calcular Tamanho
              </a>
              <a
                href="#tabela-medidas"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('tabela-medidas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(128, 151, 165, 0.2)',
                  border: 'none',
                  transition: 'all 0.2s'
                }}
                className="step-cta-btn-alt"
              >
                📋 Ver Tabela Geral
              </a>
            </div>
          </div>
        </div>

        {/* SPLIT SECTION: CALCULATOR (LEFT) & TABLE (RIGHT) */}
        <div className="guide-split-section">

          {/* COLUMN 1: INTERACTIVE CALCULATOR */}
          <div id="calculadora" className="calculator-card" style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-card)',
            padding: '2.5rem',
            border: '1px solid rgba(133, 73, 49, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-text)', margin: 0 }}>
                Calcula o Tamanho Ideal
              </h3>
              <a
                href="#tabela-medidas"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('tabela-medidas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--color-winter-blue)',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                ver tabela
              </a>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: '1.5', marginBottom: '1.8rem' }}>
              Arrasta ou introduz o comprimento medido para saberes o tamanho sugerido.
            </p>

            {/* Manual Text Input & Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-text)' }}>
                  Comprimento do Pé (cm):
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="number"
                    step="0.1"
                    min="8"
                    max="26"
                    value={footLengthInput}
                    onChange={(e) => setFootLengthInput(e.target.value)}
                    style={{
                      width: '74px',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '2px solid var(--color-primary)',
                      textAlign: 'center',
                      fontWeight: '800',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-main)',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontWeight: '800', color: 'var(--color-text-light)' }}>cm</span>
                </div>
              </div>

              {/* Slider Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <input
                  type="range"
                  min="10.0"
                  max="22.0"
                  step="0.1"
                  value={footLengthInput}
                  onChange={(e) => setFootLengthInput(e.target.value)}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '5px',
                    background: '#e0e0e0',
                    outline: 'none',
                    cursor: 'pointer',
                    WebkitAppearance: 'none'
                  }}
                  className="calculator-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#8097a5', marginTop: '4px' }}>
                  <span>10.0 cm</span>
                  <span>16.0 cm</span>
                  <span>22.0 cm</span>
                </div>
              </div>
            </div>

            {/* Recommendation Result Display */}
            {recSize ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Result Card */}
                <div style={{
                  backgroundColor: '#fff9ed',
                  border: '2px solid var(--color-primary)',
                  borderRadius: 'var(--border-radius)',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-accent-brown)', letterSpacing: '0.5px' }}>
                    Tamanho Recomendado
                  </span>
                  <div style={{ fontSize: '3rem', fontWeight: '950', color: 'var(--color-winter-blue)', margin: '4px 0', lineHeight: '1' }}>
                    {recSize.size}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: getStatusText(recSize.status).color, marginBottom: '8px' }}>
                    {getStatusText(recSize.status).text}
                  </div>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
                    {getStatusText(recSize.status).desc}
                  </p>

                  {/* Compact statistics row inside the card */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '12px',
                    borderTop: '1px dashed rgba(133, 73, 49, 0.15)',
                    paddingTop: '12px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#666'
                  }}>
                    <div>Pé: <span style={{ color: 'var(--color-text)' }}>{recSize.footLength.toFixed(1)} cm</span></div>
                    <div>Palmilha: <span style={{ color: 'var(--color-text)' }}>{recSize.insoleLength.toFixed(1)} cm</span></div>
                    <div>Folga: <span style={{ color: getStatusText(recSize.status).color }}>+{recSize.wiggleRoom.toFixed(1)} cm</span></div>
                  </div>
                </div>

                {/* Shop Button */}
                <Link href="/loja" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%',
                    backgroundColor: 'var(--color-winter-blue)',
                    color: 'white',
                    border: 'none',
                    padding: '14px 20px',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0, 115, 150, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}>
                    <ShoppingBag size={18} />
                    Ver Sapatos no Tamanho {recSize.size}
                  </button>
                </Link>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                color: '#999',
                border: '2px dashed #eee',
                borderRadius: 'var(--border-radius)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <QuestionIcon size={36} color="#ccc" />
                <span>Introduce uma medida válida acima para calcular o tamanho.</span>
              </div>
            )}
          </div>

          {/* COLUMN 2: COMPLETE TABLE */}
          <div id="tabela-medidas" style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-card)',
            padding: '2.5rem',
            border: '1px solid rgba(133, 73, 49, 0.05)',
            scrollMarginTop: '100px'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
              Tabela de Medidas Geral
            </h3>

            {/* Category tabs filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
              {/* Age Category Tabs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[
                  { id: 'all', name: 'Todos' },
                  { id: 'baby', name: 'Bebé (18-21)' },
                  { id: 'kid', name: 'Criança (22-29)' },
                  { id: 'junior', name: 'Juvenil (30-34)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      border: 'none',
                      backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'rgba(0,0,0,0.03)',
                      color: activeTab === tab.id ? 'var(--color-text)' : '#555',
                      fontWeight: '800',
                      padding: '8px 16px',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Table Grid */}
            <div style={{ overflowX: 'auto', borderRadius: 'var(--border-radius)', border: '1px solid #eaeaea' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-secondary)', color: 'white', borderBottom: '2px solid #eaeaea' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '800' }}>Tamanho</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '800' }}>Pé (cm)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '800' }}>Palmilha (cm)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '800' }}>Idade Aprox.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSizes.length > 0 ? (
                    filteredSizes.map((row) => {
                      const isRecommended = recSize && recSize.size === row.size;
                      return (
                        <tr
                          key={row.size}
                          style={{
                            borderBottom: '1px solid #f2f2f2',
                            backgroundColor: isRecommended ? 'rgba(159, 226, 221, 0.2)' : 'transparent',
                            fontWeight: isRecommended ? '800' : 'normal',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <td style={{ padding: '14px 16px', color: 'var(--color-text)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{row.size}</span>
                              {isRecommended && (
                                <span style={{
                                  backgroundColor: 'var(--color-teal)',
                                  color: 'var(--color-text)',
                                  fontSize: '0.65rem',
                                  padding: '2px 6px',
                                  borderRadius: '50px',
                                  fontWeight: '900',
                                  letterSpacing: '0.5px'
                                }}>
                                  RECOMENDADO
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px', color: '#555' }}>
                            {row.footCm} cm
                          </td>
                          <td style={{ padding: '14px 16px', color: 'var(--color-winter-blue)', fontWeight: '700' }}>
                            {row.insoleCm} cm
                          </td>
                          <td style={{ padding: '14px 16px', color: '#777' }}>
                            {row.age}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
                        Nenhum tamanho corresponde aos critérios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Note info */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '1.5rem',
              backgroundColor: '#f4f7f9',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(128, 151, 165, 0.15)'
            }}>
              <Info size={16} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#666', lineHeight: '1.4' }}>
                <strong>Dica de Sobrevivência:</strong> Se a medida obtida estiver no limite de um tamanho (ex: comprimento do pé muito próximo do máximo), sugerimos escolher o tamanho seguinte para garantir conforto e tempo de utilização útil.
              </p>
            </div>
          </div>

        </div>

        {/* SECTION: WARRANTY ACCREDITATION */}
        <div style={{
          marginTop: '6rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>

          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            padding: '2rem',
            border: '1px solid rgba(133, 73, 49, 0.05)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'start'
          }}>
            <ShieldCheck size={40} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-text)' }}>
                Ajuste Ergonómico Garantido
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>
                Os nossos sapatos barefoot são desenhados para replicar a marcha natural. Se comprares um tamanho e achares que não assenta como deve ser, oferecemos trocas simples e gratuitas até 30 dias.
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            padding: '2rem',
            border: '1px solid rgba(133, 73, 49, 0.05)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'start'
          }}>
            <Smile size={40} color="var(--color-winter-blue)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-text)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                Dúvidas no Tamanho? 
                <Link href="/contactos" style={{ textDecoration: 'none' }}>
                  <span style={{
                    backgroundColor: 'rgba(0, 115, 150, 0.1)',
                    color: 'var(--color-winter-blue)',
                    padding: '3px 12px',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid rgba(0, 115, 150, 0.2)',
                    transition: 'all 0.2s',
                  }}
                  className="contact-subtle-btn"
                  >
                    Falemos! 💬
                  </span>
                </Link>
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>
                Ainda estás indeciso sobre a medida certa para os pezinhos? Estamos aqui para aconselhar. Envia uma mensagem pelo chat ou contacta o suporte e ajudamos-te a escolher o sapatinho ideal.
              </p>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default SizeGuideClient;
