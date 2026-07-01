'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Info, ShoppingBag, Smile, ShieldCheck, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import Layout from './Layout';

// Brand & Model specific size tables
const tablesData = [
  {
    id: 'igor-galochas',
    brand: 'Igor',
    model: 'Galochas',
    data: [
      { size: '20', length: '12,9', width: '5,8' },
      { size: '21', length: '13,5', width: '6,0' },
      { size: '22', length: '14,2', width: '6,2' },
      { size: '23', length: '14,9', width: '6,3' },
      { size: '24', length: '15,5', width: '6,4' },
      { size: '25', length: '16,1', width: '6,5' },
      { size: '26', length: '16,8', width: '6,7' },
      { size: '27', length: '17,5', width: '6,9' },
      { size: '28', length: '18,1', width: '7,0' },
      { size: '29', length: '18,8', width: '7,2' },
      { size: '30', length: '19,5', width: '7,4' },
      { size: '31', length: '20,1', width: '7,5' },
      { size: '32', length: '20,7', width: '7,6' },
      { size: '33', length: '21,3', width: '8,1' },
      { size: '34', length: '22,0', width: '8,3' },
      { size: '35', length: '22,6', width: '8,4' },
    ]
  },
  {
    id: 'igor-lonas',
    brand: 'Igor',
    model: 'Lonas',
    data: [
      { size: '20', length: '13,1', width: '6,0' },
      { size: '21', length: '13,8', width: '6,1' },
      { size: '22', length: '14,4', width: '6,2' },
      { size: '23', length: '15,0', width: '6,4' },
      { size: '24', length: '15,7', width: '6,5' },
      { size: '25', length: '16,4', width: '6,7' },
      { size: '26', length: '17,0', width: '6,9' },
      { size: '27', length: '17,5', width: '7,2' },
      { size: '28', length: '18,1', width: '7,3' },
      { size: '29', length: '18,8', width: '7,4' },
      { size: '30', length: '19,4', width: '7,6' },
    ]
  },
  {
    id: 'igor-nemo',
    brand: 'Igor',
    model: 'Nemo',
    data: [
      { size: '20', length: '12,5', width: '5,9' },
      { size: '21', length: '13,1', width: '6,0' },
      { size: '22', length: '13,7', width: '6,1' },
      { size: '23', length: '14,3', width: '6,2' },
      { size: '24', length: '15,0', width: '6,3' },
      { size: '25', length: '15,7', width: '6,4' },
      { size: '26', length: '16,3', width: '6,6' },
      { size: '27', length: '16,9', width: '6,8' },
      { size: '28', length: '17,6', width: '6,9' },
      { size: '29', length: '18,2', width: '7,0' },
      { size: '30', length: '18,9', width: '7,1' },
      { size: '31', length: '19,6', width: '7,2' },
      { size: '32', length: '20,2', width: '7,4' },
    ]
  },
  {
    id: 'blanditos-modelo-1',
    brand: 'Blanditos',
    model: 'Vénus, Crono, Ares',
    data: [
      { size: '24', length: '15,8', width: '6,7' },
      { size: '25', length: '16,5', width: '6,8' },
      { size: '26', length: '17,2', width: '6,9' },
      { size: '27', length: '17,8', width: '7,1' },
      { size: '28', length: '18,5', width: '7,3' },
      { size: '29', length: '19,1', width: '7,4' },
      { size: '30', length: '19,8', width: '7,6' },
      { size: '31', length: '20,5', width: '7,8' },
      { size: '32', length: '21,1', width: '8,0' },
      { size: '33', length: '21,8', width: '8,1' },
      { size: '34', length: '22,5', width: '8,2' },
      { size: '35', length: '23,3', width: '8,5' },
      { size: '36', length: '23,9', width: '8,6' },
      { size: '37', length: '24,6', width: '8,8' },
      { size: '38', length: '25,0', width: '8,8' },
      { size: '39', length: '25,9', width: '9,0' },
      { size: '40', length: '26,5', width: '9,2' },
    ]
  },
  {
    id: 'blanditos-modelo-2',
    brand: 'Blanditos',
    model: 'Londres, Milán, Módena',
    data: [
      { size: '19', length: '12,1', width: '5,7' },
      { size: '20', length: '12,7', width: '5,8' },
      { size: '21', length: '13,3', width: '5,9' },
      { size: '22', length: '14,0', width: '6,1' },
      { size: '23', length: '14,6', width: '6,2' },
      { size: '24', length: '15,3', width: '6,4' },
      { size: '25', length: '16,0', width: '6,5' },
      { size: '26', length: '16,5', width: '6,7' },
    ]
  },
  {
    id: 'blanditos-modelo-3',
    brand: 'Blanditos',
    model: 'Rio, Marea, Berlim',
    data: [
      { size: '26', length: '16,7', width: '6,8' },
      { size: '27', length: '17,3', width: '6,9' },
      { size: '28', length: '17,9', width: '7,1' },
      { size: '29', length: '18,7', width: '7,3' },
      { size: '30', length: '19,3', width: '7,5' },
      { size: '31', length: '20,0', width: '7,6' },
      { size: '32', length: '20,7', width: '7,8' },
      { size: '33', length: '21,5', width: '8,0' },
      { size: '34', length: '22,1', width: '8,1' },
      { size: '35', length: '22,8', width: '8,2' },
      { size: '36', length: '23,4', width: '8,5' },
      { size: '37', length: '24,0', width: '8,6' },
      { size: '38', length: '24,6', width: '8,8' },
      { size: '39', length: '25,2', width: '8,9' },
      { size: '40', length: '25,9', width: '9,1' },
    ]
  },
  {
    id: 'blanditos-modelo-4',
    brand: 'Blanditos',
    model: 'Coco, Sandía, Fresa, Guinda, Mango',
    data: [
      { size: '20', length: '13,1', width: '5,8' },
      { size: '21', length: '13,7', width: '6,0' },
      { size: '22', length: '14,5', width: '6,1' },
      { size: '23', length: '15,0', width: '6,2' },
      { size: '24', length: '15,8', width: '6,4' },
      { size: '25', length: '16,3', width: '6,5' },
      { size: '26', length: '17,0', width: '6,7' },
      { size: '27', length: '17,6', width: '6,8' },
      { size: '28', length: '18,2', width: '7,0' },
      { size: '29', length: '18,9', width: '7,2' },
    ]
  }
];

const SizeGuideClient = () => {
  // Accordion state (first one open by default)
  const [activeAccordion, setActiveAccordion] = useState('igor-galochas');

  // How to Measure States
  const [activeStep, setActiveStep] = useState(0);

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
                href="#tabelas-medidas"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('tabelas-medidas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text)',
                  padding: '12px 28px',
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
                📋 Ver Tabelas de Medidas
              </a>
              <Link href="/loja" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    backgroundColor: 'var(--color-winter-blue)',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    fontFamily: 'inherit',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(0, 115, 150, 0.2)',
                    transition: 'all 0.2s'
                  }}
                  className="step-cta-btn-alt"
                >
                  Ir para a Loja
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION: ACCORDION SIZES BY BRAND/MODEL */}
        <div id="tabelas-medidas" style={{
          backgroundColor: 'white',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: '2.5rem',
          border: '1px solid rgba(133, 73, 49, 0.05)',
          scrollMarginTop: '100px'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-winter-blue)', marginBottom: '0.5rem', textAlign: 'center' }}>
            Tabelas de Medidas por Marca e Modelo
          </h2>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Seleciona o modelo correspondente abaixo para consultar as medidas exatas da palmilha (comprimento e largura).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tablesData.map((table) => {
              const isOpen = activeAccordion === table.id;
              return (
                <div
                  key={table.id}
                  style={{
                    border: '1px solid #eaeaea',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: isOpen ? '#fbfcfe' : 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : table.id)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: isOpen ? '#f4f7f9' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        backgroundColor: table.brand.toLowerCase() === 'igor' ? 'var(--color-winter-blue)' : 'var(--color-primary)',
                        color: table.brand.toLowerCase() === 'igor' ? 'white' : 'var(--color-text)',
                        fontSize: '0.75rem',
                        fontWeight: '900',
                        padding: '4px 10px',
                        borderRadius: '50px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {table.brand}
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-text)' }}>
                        {table.model}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1.5rem', borderTop: '1px solid #eaeaea' }}>
                          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', fontSize: '0.9rem' }}>
                              <thead>
                                <tr style={{ backgroundColor: 'var(--color-secondary)', color: 'white', borderBottom: '2px solid #eaeaea' }}>
                                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '800' }}>Tamanho</th>
                                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '800' }}>Comprimento da Palmilha (cm)</th>
                                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '800' }}>Largura da Palmilha (cm)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {table.data.map((row, index) => (
                                  <tr
                                    key={row.size}
                                    style={{
                                      borderBottom: '1px solid #f2f2f2',
                                      backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.01)' : 'white'
                                    }}
                                  >
                                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '800', color: 'var(--color-text)' }}>
                                      {row.size}
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--color-winter-blue)', fontWeight: '700' }}>
                                      {row.length} cm
                                    </td>
                                    <td style={{ padding: '12px 16px', textAlign: 'center', color: '#555' }}>
                                      {row.width} cm
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            marginTop: '1.25rem',
                            backgroundColor: '#f4f7f9',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(128, 151, 165, 0.15)'
                          }}>
                            <Info size={16} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ margin: 0, fontSize: '0.78rem', color: '#666', lineHeight: '1.4' }}>
                              Nota: Recomendamos adicionar uma folga de 0,8 cm a 1,2 cm ao comprimento real do pé da criança para encontrar o tamanho perfeito neste modelo.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
                Trocas e Devoluções Simplificadas
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-light)', lineHeight: '1.5' }}>
                Os nossos sapatos barefoot são desenhados para replicar o andar natural. Se comprares um tamanho e achares que não assenta como deve ser, oferecemos trocas simples e gratuitas até 30 dias.
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
