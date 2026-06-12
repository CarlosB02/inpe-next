'use client';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Footprints, Shield, Heart, HelpCircle, ArrowRight,
  ChevronLeft, ChevronRight, ShoppingBag, Eye, RefreshCw, Smile,
  CloudRain, Trees, School, Compass, Zap
} from 'lucide-react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import ModelViewer from './ModelViewer';
import Layout from './Layout';

import products from '@/data/products';

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
      letterSpacing: '0.5px'
    }}
  >
    {Icon && <Icon size={16} color={color} />}
    {children}
  </motion.div>
);

const HomeClient2 = ({ initialProducts = [] }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [adventureFilter, setAdventureFilter] = useState('all'); // all, park, school, puddle
  const [selectedShoeColor, setSelectedShoeColor] = useState('#F4C466');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const videoRef = useRef(null);
  const bestSellersRef = useRef(null);
  const newCollectionRef = useRef(null);
  const adventureRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }
  }, []);

  // Map products
  const mappedProducts = useMemo(() => {
    if (!initialProducts || initialProducts.length === 0) {
      return products;
    }
    return initialProducts.map(p => {
      const variantsList = p.variants?.edges.map(e => e.node) || [];
      const tagsLower = p.tags.map(t => t.toLowerCase());
      const category = tagsLower.find(t => t === 'crianca' || t === 'mulher' || t === 'homem') || 'crianca';
      const subcategory = p.tags.find(t => {
        const l = t.toLowerCase();
        return l === 'sapatilhas' || l === 'botas' || l === 'sandálias' || l === 'sandalias';
      }) || 'Sapatilhas';

      return {
        id: p.handle,
        name: p.title,
        price: p.priceRange.minVariantPrice.amount,
        image: p.images.edges[0]?.node.url || '',
        category,
        subcategory,
        isNew: tagsLower.includes('new') || tagsLower.includes('novo')
      };
    });
  }, [initialProducts]);

  // Filter products for kids, and category matching
  const kidsProducts = useMemo(() => {
    return mappedProducts.filter(p => p.category === 'crianca');
  }, [mappedProducts]);

  const parentsProducts = useMemo(() => {
    return mappedProducts.filter(p => p.category !== 'crianca').slice(0, 4);
  }, [mappedProducts]);

  // Best Sellers and New Collection filtering
  const bestSellers = useMemo(() => {
    // Always take the first 4 available products for display
    // (rules/curation TBD — using sequential slice to avoid empty gaps)
    if (mappedProducts.length === 0) return [];
    return mappedProducts.slice(0, 4);
  }, [mappedProducts]);

  const newCollection = useMemo(() => {
    // Use all products for display purposes; real rules TBD
    if (mappedProducts.length === 0) return [];
    // Try to pick different indices than bestSellers to vary display
    const indices = [1, 2, 4, 6, 7, 9, 11, 13];
    const list = indices.map(i => mappedProducts[i]).filter(Boolean);
    if (list.length >= 4) return list;
    // Final fallback: just use all products
    return mappedProducts.slice(0, Math.min(8, mappedProducts.length));
  }, [mappedProducts]);

  // Dynamic filtering based on "Adventure Type"
  const filteredKidsProducts = useMemo(() => {
    if (adventureFilter === 'all') return kidsProducts.slice(0, 4);
    if (adventureFilter === 'school') {
      return kidsProducts.filter(p => p.id.length % 2 === 0).slice(0, 4);
    }
    if (adventureFilter === 'park') {
      return kidsProducts.filter(p => p.subcategory === 'Sapatilhas').slice(0, 4);
    }
    if (adventureFilter === 'puddle') {
      return kidsProducts.filter(p => p.id.length % 2 !== 0 || p.subcategory === 'Botas').slice(0, 4);
    }
    return kidsProducts.slice(0, 4);
  }, [kidsProducts, adventureFilter]);

  const adventures = [
    { id: 'all', label: 'Tudo', icon: Compass, color: '#007396' },
    { id: 'school', label: 'Recrutas da Escola', icon: School, color: '#FF9F1C' },
    { id: 'park', label: 'Exploradores da Relva', icon: Trees, color: '#4CAF50' },
    { id: 'puddle', label: 'Saltadores de Poças', icon: CloudRain, color: '#E06A55' }
  ];

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

  const testimonials = [
    {
      quote: "Os pezinhos da Leonor adaptaram-se no primeiro dia. Ela diz que são os seus sapatos de 'super-herói' porque consegue correr muito mais rápido!",
      author: "Sofia Reis",
      role: "Mãe do Guilherme (4 anos) e Leonor (6 anos)",
      avatar: "👩‍👧‍👦",
      rating: 5
    },
    {
      quote: "Como fisioterapeuta, recomendo sempre calçado Barefoot. O modelo da Inpe é fantástico porque junta a ciência médica de um pé livre a um design lindo que as crianças adoram usar.",
      author: "Dra. Mariana Silva",
      role: "Fisioterapeuta Pediátrica",
      avatar: "🩺",
      rating: 5
    },
    {
      quote: "Nunca mais tivemos problemas com sapatos apertados ou bolhas. A ponteira larga dá o espaço que eles realmente precisam para brincar à solta.",
      author: "João Abreu",
      role: "Pai do Simão (3 anos)",
      avatar: "👨‍👦",
      rating: 5
    }
  ];

  return (
    <Layout noPadding>
      <div style={{ backgroundColor: '#FFFDF9', overflowX: 'hidden' }}>

        {/* HERO SECTION WITH DYNAMIC VIDEO & BOUNCY CARD */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}>
          <video ref={videoRef} autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>

          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(44, 62, 80, 0.45)', zIndex: 2 }} />

          {/* Desktop layout — centered, two buttons */}
          {!isMobile && (
            <div style={{ zIndex: 10, maxWidth: '900px', padding: '0 24px', marginTop: '-120px' }}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
                style={{
                  fontSize: 'clamp(2rem, 8.5vw, 4.5rem)',
                  lineHeight: 1.1,
                  color: 'white',
                  fontWeight: '900',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                Pezinhos Livres, <br />
                <span style={{ color: '#F4C466' }}>Mundo Colorido!</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: '600',
                  color: '#F9F9F9',
                  marginBottom: '3rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Descubra o conforto natural.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <Link href="/loja" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: '#FF9F1C',
                      color: 'white',
                      padding: '18px 42px',
                      borderRadius: '50px',
                      fontWeight: '900',
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 25px rgba(255, 159, 28, 0.4)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    VER MODELOS <ShoppingBag size={20} />
                  </motion.div>
                </Link>

                <Link href="/sobre-nos#o-que-e-barefoot" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      color: 'white',
                      padding: '18px 42px',
                      borderRadius: '50px',
                      fontWeight: '900',
                      fontSize: '1.1rem',
                      border: '2px solid white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    DESCOBRIR BAREFOOT <HelpCircle size={20} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          )}

          {/* Mobile layout — text + single small button anchored to bottom */}
          {isMobile && (
            <div style={{ zIndex: 10, width: '100%', padding: '0 24px 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
                style={{
                  fontSize: 'clamp(1.4rem, 7vw, 2rem)',
                  lineHeight: 1.1,
                  color: 'white',
                  fontWeight: '900',
                  marginBottom: '0.8rem',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                Pezinhos Livres, <br />
                <span style={{ color: '#F4C466' }}>Mundo Colorido!</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#F9F9F9',
                  marginBottom: '1.6rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Descubra o conforto natural.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
              >
                <Link href="/loja" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: '#FF9F1C',
                      color: 'white',
                      padding: '12px 28px',
                      borderRadius: '50px',
                      fontWeight: '900',
                      fontSize: '0.9rem',
                      boxShadow: '0 8px 20px rgba(255, 159, 28, 0.4)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    VER MODELOS <ShoppingBag size={16} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          )}
        </section>

        {/* NEW SECTION: BEST SELLERS & NEW COLLECTION (2 ROWS) */}
        <section style={{
          padding: '6rem 0 4rem',
          background: 'linear-gradient(180deg, #FFFDF9 0%, #F4FBF7 50%, #FFFDF9 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {/* Background organic shape blobs */}
          <div style={{
            position: 'absolute',
            top: '5%',
            left: '-10%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(circle, rgba(254, 224, 187, 0.25) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '-10%',
            width: '50vw',
            height: '50vw',
            background: 'radial-gradient(circle, rgba(178, 223, 219, 0.2) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          {/* ROW 1: MAIS VENDIDOS — carousel */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto 6rem',
            padding: '0 4%',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.5rem'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: '900',
                color: '#2C3E50',
                textTransform: 'uppercase',
                marginTop: '0.8rem',
                lineHeight: '1.1'
              }}>
                Mais Vendidos
              </h3>

              {/* Arrow controls */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => scroll(bestSellersRef, 'left')}
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    backgroundColor: 'white', border: '2px solid #B2DFDB',
                    color: '#007396', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#B2DFDB'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#007396'; }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll(bestSellersRef, 'right')}
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    backgroundColor: 'white', border: '2px solid #B2DFDB',
                    color: '#007396', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#B2DFDB'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#007396'; }}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Carousel — 4 visible on desktop, 1+peek on mobile */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                ref={bestSellersRef}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  overflowX: 'auto',
                  padding: '10px 0 25px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory',
                }}
                className="hide-scrollbar"
              >
                {bestSellers.map(p => (
                  <div
                    key={p.id}
                    style={{
                      flex: isMobile
                        ? '0 0 calc(85% - 0.375rem)'
                        : '0 0 calc(25% - 1.125rem)',
                      minWidth: 0,
                      scrollSnapAlign: 'start',
                    }}
                  >
                    <ProductCard
                      title={p.name}
                      price={p.price}
                      image={p.image}
                      category={p.subcategory || p.category}
                      id={p.id}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
              {/* Right fade hinting more content */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '60px', height: '100%',
                background: 'linear-gradient(to right, rgba(244,251,247,0) 0%, rgba(244,251,247,0.9) 100%)',
                pointerEvents: 'none', zIndex: 2,
              }} />
            </div>
          </div>

          {/* ROW 2: NOVA COLEÇÃO — peek carousel (1 card visible + next peeking) */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 4%',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.5rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: '900',
                  color: '#2C3E50',
                  textTransform: 'uppercase',
                  marginTop: '0.8rem',
                  lineHeight: '1.1'
                }}>
                  Nova Coleção
                </h3>
              </div>

              {/* Arrow controls */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => scroll(newCollectionRef, 'left')}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    border: '2px solid #B2DFDB',
                    color: '#007396',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#B2DFDB'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#007396'; }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll(newCollectionRef, 'right')}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    border: '2px solid #B2DFDB',
                    color: '#007396',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#B2DFDB'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#007396'; }}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/*
              Desktop: 4 cards visible, scroll for more.
              Mobile: 1 card + peek of next (85% width per card).
            */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                ref={newCollectionRef}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  overflowX: 'auto',
                  padding: '10px 0 25px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory',
                }}
                className="hide-scrollbar"
              >
                {(newCollection.length > 0 ? newCollection : bestSellers).map(p => (
                  <div
                    key={p.id}
                    style={{
                      // Desktop: fit 4 cards exactly (25% minus shared gaps)
                      // Mobile: 85% so next card peeks in
                      flex: isMobile
                        ? '0 0 calc(85% - 0.375rem)'
                        : '0 0 calc(25% - 1.125rem)',
                      minWidth: 0,
                      scrollSnapAlign: 'start',
                    }}
                  >
                    <ProductCard
                      title={p.name}
                      price={p.price}
                      image={p.image}
                      category={p.subcategory || p.category}
                      id={p.id}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
              {/* Right fade — always visible to hint at scrollable content */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60px',
                height: '100%',
                background: 'linear-gradient(to right, rgba(244,251,247,0) 0%, rgba(244,251,247,0.9) 100%)',
                pointerEvents: 'none',
                zIndex: 2,
              }} />
            </div>
          </div>
        </section>
        {/* INTERACTIVE 3D CUSTOMIZER PLAYGROUND */}
        <section style={{
          backgroundColor: '#E8F5E9',
          borderRadius: isMobile ? '0' : '64px',
          margin: isMobile ? '0' : '0 4% 6rem',
          padding: isMobile ? '4rem 5%' : '6rem 8%',
          position: 'relative',
          overflow: 'hidden',
          overflowX: 'hidden'
        }}>
          {/* Background decorative clouds */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', height: '40px', backgroundColor: 'white', borderRadius: '50px', opacity: 0.7, zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: '160px', height: '60px', backgroundColor: 'white', borderRadius: '50px', opacity: 0.7, zIndex: 0 }} />

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>

            {/* Left Column: Interactive Shoe Model */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
              <motion.div
                animate={isMobile ? {} : {
                  y: [0, -10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '100%',
                  maxWidth: isMobile ? '100%' : '500px',
                  height: isMobile ? 'min(300px, 70vw)' : 'clamp(300px, 60vw, 420px)',
                  backgroundColor: 'white',
                  borderRadius: '40px',
                  boxShadow: '0 20px 50px rgba(76, 175, 80, 0.15)',
                  border: '4px solid #C8E6C9',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* 3D Model Display */}
                <ModelViewer modelPath="/shoe.glb" autoRotate={true} />

                {/* Floating tags */}
                <span style={{ position: 'absolute', top: '25px', left: '25px', backgroundColor: '#FF9F1C', color: 'white', fontWeight: '800', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  Ajuste 3D Real
                </span>

                <span style={{ position: 'absolute', bottom: '25px', right: '25px', backgroundColor: '#2C3E50', color: 'white', fontWeight: '800', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Eye size={12} /> Arrasta para rodar
                </span>
              </motion.div>
            </div>

            {/* Right Column: Lab controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', fontWeight: '900', color: '#2C3E50', textTransform: 'uppercase', marginTop: '1.2rem', lineHeight: 1.1 }}>
                  Explora o teu <br /><span style={{ color: '#4CAF50' }}>Sapato em 3D!</span>
                </h2>
                <p style={{ color: '#555', fontSize: '1.05rem', marginTop: '1rem', lineHeight: 1.6 }}>
                  Descobre a flexibilidade e o conforto pensados para acompanhar cada aventura.
                </p>
              </div>

              {/* Anatomy details box */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left'
              }}>
                <h4 style={{ color: '#2C3E50', fontWeight: '900', margin: 0, fontSize: '1.1rem' }}>🔬 Anatomia do Conforto:</h4>
                <div style={{ fontSize: '0.9rem', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>✔️ <strong>Sola Plana:</strong> Favorece um alinhamento natural do corpo.</div>
                  <div>✔️ <strong>Flexibilidade Total:</strong> Acompanha cada passo e movimento.</div>
                  <div>✔️ <strong>Leves e Respiráveis:</strong> Mantêm os pés confortáveis ao longo do dia.</div>
                  <div>✔️ <strong>Ponteira Ampla:</strong> Dá espaço para os dedos crescerem livremente.</div>
                  <div>✔️ <strong>Sem Contraforte Rígido:</strong> O calcanhar move-se de forma natural.</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Link href="/loja" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '16px 36px',
                      borderRadius: '50px',
                      fontWeight: '800',
                      boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Explora os Modelos <ArrowRight size={18} />
                  </motion.div>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* SEASONAL COLLECTIONS: SOL & AREIA + CHUVA & LAMA */}
        <section style={{
          padding: isMobile ? '4rem 5%' : '6rem 4%',
          backgroundColor: '#FFFDF9'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem'
          }}>

            {/* Card 1 — Sol & Areia */}
            <Link href="/loja" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  backgroundColor: '#F5EFE6',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                  cursor: 'pointer'
                }}
              >
                {/* Background image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/colecao-sol-areia.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0
                }} />

                {/* Light overlay for text readability */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(255,159,28,0.50) 0%, rgba(255,159,28,0.4) 45%, rgba(255,159,28,0) 100%)',
                  zIndex: 1
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, padding: '2rem 2.2rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
                    fontWeight: '900',
                    color: 'white',
                    textTransform: 'uppercase',
                    margin: '0 0 0.6rem',
                    lineHeight: 1.1
                  }}>
                    Sol &amp; Areia
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0 0 1.4rem',
                    lineHeight: 1.5
                  }}>
                    Sandálias frescas e respiráveis para aventuras ao ar livre.
                  </p>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#2C3E50',
                      border: 'none',
                      color: 'white',
                      padding: '10px 22px',
                      borderRadius: '50px',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ver Primavera/Verão <ArrowRight size={16} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>

            {/* Card 2 — Chuva & Lama */}
            <Link href="/loja" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  backgroundColor: '#1A2A3A',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  cursor: 'pointer'
                }}
              >
                {/* Background image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/colecao-chuva-lama.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0
                }} />

                {/* Dark overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20,40,60,0.88) 0%, rgba(20,40,60,0.35) 50%, rgba(20,40,60,0) 100%)',
                  zIndex: 1
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, padding: '2rem 2.2rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
                    fontWeight: '900',
                    color: 'white',
                    textTransform: 'uppercase',
                    margin: '0 0 0.6rem',
                    lineHeight: 1.1
                  }}>
                    Chuva &amp; Lama
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0 0 1.4rem',
                    lineHeight: 1.5
                  }}>
                    Botas impermeáveis sem comprometer a flexibilidade.
                  </p>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#FF9F1C',
                      color: 'white',
                      padding: '10px 22px',
                      borderRadius: '50px',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(255,159,28,0.4)'
                    }}
                  >
                    Ver Outono/Inverno <ArrowRight size={16} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>

          </div>
        </section>

        {/* DYNAMIC PRODUCTS SHELF WITH ADVENTURE FILTERING */}
        <section style={{ padding: '6rem 10%' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'center' : 'flex-end', gap: '2rem', marginBottom: '3.5rem' }}>
            <div style={{ textAlign: isMobile ? 'center' : 'left', maxWidth: '500px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', color: '#2C3E50', textTransform: 'uppercase', marginTop: '1.2rem', lineHeight: 1.1 }}>
                Modelos para a <br /><span style={{ color: '#FF9F1C' }}>Tua Próxima Aventura</span>
              </h2>
            </div>

            {/* Adventure selection pills */}
            <div style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              width: isMobile ? '100%' : 'auto',
              paddingBottom: isMobile ? '10px' : '0',
              justifyContent: isMobile ? 'flex-start' : 'flex-end',
              scrollbarWidth: 'none'
            }}>
              {adventures.map(adv => {
                const Icon = adv.icon;
                const isSelected = adventureFilter === adv.id;
                return (
                  <motion.button
                    key={adv.id}
                    onClick={() => setAdventureFilter(adv.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 20px',
                      borderRadius: '50px',
                      border: 'none',
                      backgroundColor: isSelected ? adv.color : 'white',
                      color: isSelected ? 'white' : '#555',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: isSelected ? `0 8px 16px ${adv.color}30` : '0 4px 12px rgba(0,0,0,0.03)',
                      transition: 'background-color 0.2s, color 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={16} />
                    {adv.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Filtered Products — Carousel */}
          <div style={{ position: 'relative' }}>
            {/* Arrow controls */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginBottom: '1.2rem' }}>
              <button
                onClick={() => scroll(adventureRef, 'left')}
                style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: 'white', border: '2px solid #FFE0B2',
                  color: '#FF9F1C', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FF9F1C'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#FF9F1C'; }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll(adventureRef, 'right')}
                style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: 'white', border: '2px solid #FFE0B2',
                  color: '#FF9F1C', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FF9F1C'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#FF9F1C'; }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={adventureFilter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <div
                  ref={adventureRef}
                  className="hide-scrollbar"
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    overflowX: 'auto',
                    padding: '10px 0 25px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory',
                  }}
                >
                  {filteredKidsProducts.map(p => (
                    <div
                      key={p.id}
                      style={{
                        flex: isMobile
                          ? '0 0 calc(85% - 0.375rem)'
                          : '0 0 calc(25% - 1.125rem)',
                        minWidth: 0,
                        scrollSnapAlign: 'start',
                      }}
                    >
                      <ProductCard title={p.name} price={p.price} image={p.image} category={p.subcategory || p.category} id={p.id} compact={true} />
                    </div>
                  ))}
                </div>
                {/* Right fade hinting more content */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '60px', height: '100%',
                  background: 'linear-gradient(to right, rgba(255,253,249,0) 0%, rgba(255,253,249,0.9) 100%)',
                  pointerEvents: 'none', zIndex: 2,
                }} />
              </motion.div>
            </AnimatePresence>

            {/* Empty state if filtering has no matches */}
            {filteredKidsProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888' }}>
                <HelpCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ fontWeight: 'bold' }}>Nenhum modelo disponível para esta aventura no momento.</p>
              </div>
            )}
          </div>
        </section>

        {/* PARENTS & MATCHING SECTION */}
        <section style={{
          position: 'relative',
          padding: '6rem 10%',
          overflow: 'hidden'
        }}>
          {/* Full-width background image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/colecao-papas.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} />
          {/* Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(240, 247, 249, 0.88)',
            zIndex: 1
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', color: '#2C3E50', textTransform: 'uppercase', marginTop: '1.2rem' }}>
                Coleção Papás: <span style={{ color: '#007396' }}>Caminha Igual!</span>
              </h2>
              <p style={{ color: '#444', fontSize: '1.1rem', marginTop: '1rem', fontWeight: '500' }}>
                Os adultos também merecem conforto. Descobre as nossas linhas para caminhar em harmonia com os mais pequenos.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '2.5rem'
            }}>
              {parentsProducts.map(p => (
                <ProductCard key={p.id} title={p.name} price={p.price} image={p.image} category={p.subcategory || p.category} id={p.id} compact={isMobile} />
              ))}
            </div>

            {/* CTA Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
              <Link href="/loja?categoria=homem,mulher" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#007396',
                    color: 'white',
                    padding: '18px 44px',
                    borderRadius: '50px',
                    fontWeight: '900',
                    fontSize: '1.05rem',
                    boxShadow: '0 12px 30px rgba(0,115,150,0.30)',
                    cursor: 'pointer',
                    letterSpacing: '0.3px'
                  }}
                >
                  Ver Coleção Papás <ArrowRight size={20} />
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        {/* MODELOS EM DESTAQUE */}
        <section style={{
          padding: isMobile ? '4rem 5%' : '6rem 4%',
          backgroundColor: '#F4FBF7'
        }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: '900',
              color: '#2C3E50',
              textTransform: 'uppercase',
              margin: '0 0 0.6rem',
              lineHeight: 1.1
            }}>
              Modelos em <span style={{ color: '#007396' }}>Destaque</span>
            </h2>
            <p style={{ color: '#666', fontSize: '1rem', fontWeight: '500', maxWidth: '480px', margin: '0.8rem auto 0' }}>
              Escolhidos a dedo para te inspirar, conforto e estilo para cada aventura.
            </p>
          </div>

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem'
          }}>

            {/* Card 1 — Modelo Terra & Trilho */}
            <Link href="/loja" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  backgroundColor: '#E8F5E9',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.07)',
                  cursor: 'pointer'
                }}
              >
                {/* Background image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/modelo-destaque-terra.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0
                }} />

                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0) 100%)',
                  zIndex: 1
                }} />

                {/* Badge */}
                <span style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '0.7rem',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  zIndex: 2
                }}>Mais Vendido</span>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, padding: '2rem 2.2rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
                    fontWeight: '900',
                    color: '#2C3E50',
                    textTransform: 'uppercase',
                    margin: '0 0 0.6rem',
                    lineHeight: 1.1
                  }}>
                    Terra &amp; Trilho
                  </h3>
                  <p style={{
                    color: '#555',
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0 0 1.4rem',
                    lineHeight: 1.5
                  }}>
                    Feito para explorar caminhos de terra, relva e floresta com segurança.
                  </p>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'transparent',
                      border: '2px solid #2C3E50',
                      color: '#2C3E50',
                      padding: '10px 22px',
                      borderRadius: '50px',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ver Modelo <ArrowRight size={16} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>

            {/* Card 2 — Modelo Escola & Cidade */}
            <Link href="/loja" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  borderRadius: '28px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  backgroundColor: '#0D2B3A',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  cursor: 'pointer'
                }}
              >
                {/* Background image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/modelo-destaque-escola.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0
                }} />

                {/* Dark overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,35,55,0.90) 0%, rgba(10,35,55,0.35) 50%, rgba(10,35,55,0) 100%)',
                  zIndex: 1
                }} />

                {/* Badge */}
                <span style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: '#FF9F1C',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '0.7rem',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  zIndex: 2
                }}>Novidade</span>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, padding: '2rem 2.2rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
                    fontWeight: '900',
                    color: 'white',
                    textTransform: 'uppercase',
                    margin: '0 0 0.6rem',
                    lineHeight: 1.1
                  }}>
                    Escola &amp; Cidade
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0 0 1.4rem',
                    lineHeight: 1.5
                  }}>
                    Elegante, flexível e perfeito para o dia a dia entre a escola e a cidade.
                  </p>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#007396',
                      color: 'white',
                      padding: '10px 22px',
                      borderRadius: '50px',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(0,115,150,0.4)'
                    }}
                  >
                    Ver Modelo <ArrowRight size={16} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>

          </div>
        </section>

        {/* FUN ADVENTURE QUIZ SECTION */}
        <section style={{ padding: '6rem 10%', backgroundColor: '#FFFDF9' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '40px',
            padding: isMobile ? '3rem 2rem' : '4rem 5%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
            border: '2px dashed #F4C466',
            maxWidth: '560px',
            margin: '0 auto',
            width: '100%'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <h4 style={{ margin: 0, color: '#2C3E50', fontSize: '1.1rem', fontWeight: '900' }}>O que é que o seu filho mais gosta de fazer ao ar livre?</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: '🏃 Correr e escalar', href: '/loja?subcategoria=sapatilhas' },
                  { label: '💦 Poças de água', href: '/loja?subcategoria=galochas' },
                  { label: '🎨 Passear à vontade', href: '/loja?subcategoria=sandalias' }
                ].map((option, index) => (
                  <Link key={index} href={option.href} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '16px',
                        border: '2px solid #EAEAEA',
                        backgroundColor: 'white',
                        color: '#2C3E50',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span>{option.label}</span>
                      <ArrowRight size={16} color="#FF9F1C" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SPEECH BUBBLE TESTIMONIALS SECTION */}
        <section style={{ padding: '6rem 10%', backgroundColor: '#FFFDF9', borderTop: '2px solid #F5F5F5' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', color: '#2C3E50', textTransform: 'uppercase', marginTop: '1.2rem' }}>
              Pegadas de Amor: <span style={{ color: '#E06A55' }}>Quem usa, Aprova!</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
            {/* Active Testimonial Speech Bubble */}
            <div style={{ position: 'relative', maxWidth: '800px', width: '100%' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '40px',
                    padding: isMobile ? '2.5rem 2rem' : '4rem 4rem 3rem',
                    boxShadow: '0 20px 40px rgba(224, 106, 85, 0.05)',
                    border: '3px solid #FFEBEE',
                    position: 'relative'
                  }}
                >
                  <span style={{ position: 'absolute', top: '20px', left: '35px', fontSize: '5rem', color: '#FFEBEE', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none' }}>“</span>

                  <p style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    color: '#2C3E50',
                    lineHeight: 1.6,
                    fontWeight: '700',
                    textAlign: 'center',
                    margin: '0 0 2rem',
                    fontStyle: 'italic',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {testimonials[activeTestimonial].quote}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '2.5rem' }}>{testimonials[activeTestimonial].avatar}</div>
                    <h4 style={{ margin: 0, color: '#2C3E50', fontWeight: '900', fontSize: '1.15rem' }}>
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: '#E06A55', fontWeight: '800', textTransform: 'uppercase' }}>
                      {testimonials[activeTestimonial].role}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonial Nav Dots */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: activeTestimonial === index ? '#E06A55' : '#EAEAEA',
                    cursor: 'pointer',
                    transform: activeTestimonial === index ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM FINAL BOUNCY CTA */}
        <section style={{
          backgroundColor: '#FF9F1C',
          padding: '6rem 2rem',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle decor circles */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Prontos para <br />a Próxima Aventura?
            </h2>
            <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '2.5rem', opacity: 0.9 }}>
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

export default HomeClient2;
