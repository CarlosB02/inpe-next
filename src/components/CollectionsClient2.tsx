'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Footprints, Shield, Heart, HelpCircle, ArrowRight,
  ShoppingBag, Eye, RefreshCw, Smile, Search, SlidersHorizontal,
  X, Check, DollarSign, Compass
} from 'lucide-react';
import { Product } from '../types/shopify';
import ProductCard from './ProductCard';
import Layout from './Layout';

interface CollectionsClientProps {
  initialProducts: Product[];
  searchQuery?: string;
}

// Playful custom badge component
const PlayfulBadge = ({ children, color = '#FF9F1C', icon: Icon }: any) => (
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

export const CollectionsClient2: React.FC<CollectionsClientProps> = ({
  initialProducts = [],
  searchQuery = ''
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    subcategories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    price: { min: 0, max: 200 }
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Pre-fill category filters from URL param (?categoria=homem,mulher)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoriaParam = params.get('categoria');
    if (categoriaParam) {
      const cats = categoriaParam.split(',').map(c => c.trim()).filter(Boolean);
      if (cats.length > 0) {
        setFilters(prev => ({ ...prev, categories: cats }));
      }
    }
  }, []);

  // Map rich Shopify products into filtered items
  const mappedProducts = useMemo(() => {
    return initialProducts.map(p => {
      const variantsList = p.variants?.edges.map(e => e.node) || [];

      // Parse sizes from variant titles
      const sizes = variantsList.map(v => {
        const num = parseInt(v.title);
        return isNaN(num) ? v.title : num;
      });

      // Parse colors from variant options (options named "Cor" or "Color")
      const colorsSet = new Set<string>();
      variantsList.forEach(v => {
        v.selectedOptions.forEach(opt => {
          if (
            opt.name.toLowerCase() === 'cor' ||
            opt.name.toLowerCase() === 'color' ||
            opt.name.toLowerCase() === 'colour'
          ) {
            colorsSet.add(opt.value);
          }
        });
      });

      // Map tags to categories/subcategories
      const tagsLower = p.tags.map(t => t.toLowerCase());
      const category = tagsLower.find(t => t === 'crianca' || t === 'mulher' || t === 'homem') || 'crianca';
      const subcategory = p.tags.find(t => {
        const l = t.toLowerCase();
        return l === 'sapatilhas' || l === 'botas' || l === 'sandálias' || l === 'sandalias' || l === 'desportivo' || l === 'lonas';
      }) || 'Sapatilhas';

      return {
        id: p.handle,
        name: p.title,
        price: p.priceRange.minVariantPrice.amount,
        image: p.images.edges[0]?.node.url || '',
        category,
        subcategory,
        sizes,
        colors: colorsSet.size > 0 ? Array.from(colorsSet) : ['#F4C466']
      };
    });
  }, [initialProducts]);

  // Dynamically extract all available sizes & colors from products to make filters relevant
  const availableSizes = useMemo(() => {
    const all = new Set<string>();
    mappedProducts.forEach(p => {
      if (p.sizes) {
        p.sizes.forEach(s => all.add(s.toString()));
      }
    });
    return Array.from(all).sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      if (isNaN(numA) || isNaN(numB)) return a.localeCompare(b);
      return numA - numB;
    });
  }, [mappedProducts]);

  const availableColors = useMemo(() => {
    const all = new Set<string>();
    mappedProducts.forEach(p => {
      if (p.colors) {
        p.colors.forEach(c => all.add(c));
      }
    });
    return Array.from(all);
  }, [mappedProducts]);

  const availableSubcategories = useMemo(() => {
    const all = new Set<string>();
    mappedProducts.forEach(p => {
      if (p.subcategory) all.add(p.subcategory);
    });
    return Array.from(all);
  }, [mappedProducts]);

  // Filter products based on search query and sidebar filters
  const filteredProducts = useMemo(() => {
    return mappedProducts.filter(product => {
      // Local search input filter
      if (localSearch) {
        const query = localSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSub = product.subcategory.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSub) return false;
      }

      // Categories filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;

      // Subcategories/Style filter
      if (filters.subcategories.length > 0 && !filters.subcategories.includes(product.subcategory)) return false;

      // Size filter
      if (filters.sizes.length > 0) {
        let hasSize = false;
        if (product.sizes) {
          if (product.sizes.some(s => filters.sizes.includes(s.toString()))) {
            hasSize = true;
          }
        }
        if (!hasSize) return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const hasColor = product.colors && product.colors.some(c => filters.colors.includes(c));
        if (!hasColor) return false;
      }

      // Price filter
      const price = parseFloat(product.price);
      if (price < filters.price.min || price > filters.price.max) return false;

      return true;
    });
  }, [mappedProducts, filters, localSearch]);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      subcategories: [],
      sizes: [],
      colors: [],
      price: { min: 0, max: 200 }
    });
    setLocalSearch('');
  };

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleSubcategory = (sub: string) => {
    setFilters(prev => ({
      ...prev,
      subcategories: prev.subcategories.includes(sub)
        ? prev.subcategories.filter(s => s !== sub)
        : [...prev.subcategories, sub]
    }));
  };

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  // Get dynamic background and border color for categories
  const getCategoryStyles = (cat: string) => {
    const active = filters.categories.includes(cat);
    switch (cat) {
      case 'crianca':
        return {
          bg: active ? '#E0F2F1' : 'white',
          border: active ? '3px solid #9FE2DD' : '3px solid #f0f0f0',
          color: '#007396',
          emoji: '👦'
        };
      case 'mulher':
        return {
          bg: active ? '#FFEBEE' : 'white',
          border: active ? '3px solid #F4C466' : '3px solid #f0f0f0',
          color: '#854931',
          emoji: '👩'
        };
      case 'homem':
        return {
          bg: active ? '#E8F5E9' : 'white',
          border: active ? '3px solid #A5D6A7' : '3px solid #f0f0f0',
          color: '#2C3E50',
          emoji: '👨'
        };
      default:
        return { bg: 'white', border: '3px solid #f0f0f0', color: '#666', emoji: '👣' };
    }
  };

  // Render filter list elements inside sidebar
  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* Search inside sidebar for desktop */}
      {!isMobile && (
        <div style={{ position: 'relative' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#2C3E50', marginBottom: '0.8rem' }}>Pesquisa Rápida</h4>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8097a5' }} />
            <input
              type="text"
              placeholder="Ex: Botas, Desportivo..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 38px',
                borderRadius: '16px',
                border: '2px solid #eee',
                fontSize: '0.95rem',
                fontWeight: '600',
                outline: 'none',
                backgroundColor: '#fdfdfd',
                color: '#2c3e50'
              }}
            />
            {localSearch && (
              <X
                size={16}
                onClick={() => setLocalSearch('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888', cursor: 'pointer' }}
              />
            )}
          </div>
        </div>
      )}

      {/* Category / Gender segment */}
      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#2C3E50', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smile size={18} color="#FF9F1C" /> Quem vai calçar?
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['crianca', 'mulher', 'homem'].map(cat => {
            const styles = getCategoryStyles(cat);
            const isActive = filters.categories.includes(cat);
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCategory(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  backgroundColor: styles.bg,
                  border: styles.border,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.2s, border-color 0.2s'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{styles.emoji}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: styles.color, textTransform: 'capitalize', flex: 1 }}>
                  {cat === 'crianca' ? 'Criança' : cat}
                </span>
                {isActive && (
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: styles.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Style Section */}
      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#2C3E50', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Footprints size={18} color="#007396" /> Estilo
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {availableSubcategories.map(sub => {
            const isActive = filters.subcategories.includes(sub);
            return (
              <motion.button
                key={sub}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSubcategory(sub)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  border: isActive ? '2px solid var(--color-winter-blue)' : '2px solid #eee',
                  backgroundColor: isActive ? 'var(--color-winter-blue)' : 'white',
                  color: isActive ? 'white' : '#555',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {sub}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Sizes Section */}
      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#2C3E50', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={18} color="#4CAF50" /> Tamanho
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(42px, 1fr))', gap: '6px' }}>
          {availableSizes.map(size => {
            const isActive = filters.sizes.includes(size);
            return (
              <motion.button
                key={size}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleSize(size)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  border: isActive ? '2px solid #FF9F1C' : '2px solid #eee',
                  backgroundColor: isActive ? '#FF9F1C' : 'white',
                  color: isActive ? 'white' : '#555',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 10px rgba(255,159,28,0.2)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {size}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Colors Section */}
      {availableColors.length > 0 && (
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#2C3E50', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#854931" /> Cores
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableColors.map(color => {
              const isActive = filters.colors.includes(color);
              const isWhite = color.toLowerCase() === '#ffffff' || color.toLowerCase() === 'white';
              return (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleColor(color)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: isActive ? '3px solid #2C3E50' : isWhite ? '2px solid #ddd' : '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                    position: 'relative'
                  }}
                  title={color}
                >
                  {isActive && (
                    <Check
                      size={14}
                      color={isWhite ? '#2C3E50' : 'white'}
                      strokeWidth={3.5}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: '#2C3E50', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} color="#E06A55" /> Preço
          </h4>
          <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#E06A55', padding: '4px 10px', backgroundColor: '#FFEBEE', borderRadius: '20px' }}>
            {filters.price.max}€
          </span>
        </div>
        <div style={{ padding: '0 8px' }}>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.price.max}
            onChange={(e) => setFilters(prev => ({ ...prev, price: { ...prev.price, max: parseInt(e.target.value) } }))}
            style={{
              width: '100%',
              accentColor: '#E06A55',
              height: '8px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginTop: '6px', fontWeight: 'bold' }}>
            <span>0€</span>
            <span>200€</span>
          </div>
        </div>
      </div>

      {/* Clear Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClearFilters}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '16px',
          border: '2px dashed #FF9F1C',
          backgroundColor: '#FFFDF9',
          color: '#FF9F1C',
          fontWeight: '900',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.95rem'
        }}
      >
        <RefreshCw size={16} /> Limpar Filtros
      </motion.button>
    </div>
  );

  return (
    <Layout noPadding>
      <div style={{ backgroundColor: '#FFFDF9', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* HERO WITH BACKGROUND IMAGE */}
        <section style={{
          position: 'relative',
          padding: '10rem 2rem 5rem',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          borderBottomRightRadius: '60px',
          borderBottomLeftRadius: '60px',
        }}>
          {/* Background image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/loja-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} />
          {/* Dark overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(20,30,40,0.62) 0%, rgba(20,30,40,0.45) 100%)',
            zIndex: 1
          }} />

          <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

            {/* Central Playful Search Bar (instant search) */}
            <div style={{ position: 'relative', maxWidth: '620px', margin: '0 auto', padding: '0 10px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '35px',
                padding: '4px 8px 4px 20px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.06)',
                border: '3px solid white',
                transition: 'border-color 0.3s'
              }}
                className="search-container-focus"
              >
                <Search size={22} color="#8097a5" style={{ marginRight: '12px', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Procura sapatilhas, botas, sandálias..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: '#2C3E50',
                    height: '50px',
                    backgroundColor: 'transparent'
                  }}
                />
                {localSearch && (
                  <button
                    onClick={() => setLocalSearch('')}
                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '10px', marginRight: '5px' }}
                  >
                    <X size={20} />
                  </button>
                )}
                {isMobile && (
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    style={{
                      backgroundColor: 'var(--color-teal)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '46px',
                      height: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <SlidersHorizontal size={18} />
                  </button>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* MAIN STORE CONTENT */}
        <section style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '4rem 2rem 6rem'
        }}>
          <div className="collections-grid">

            {/* Desktop Sidebar (visible on larger screens) */}
            {!isMobile && (
              <div style={{
                position: 'sticky',
                top: '110px',
                backgroundColor: 'white',
                borderRadius: '32px',
                padding: '2.5rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                border: '2px solid rgba(0,0,0,0.02)',
                height: 'fit-content'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#2C3E50', margin: 0 }}>Filtros</h3>
                  {(filters.categories.length > 0 || filters.subcategories.length > 0 || filters.sizes.length > 0 || filters.colors.length > 0 || localSearch) && (
                    <span
                      onClick={handleClearFilters}
                      style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FF9F1C', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Limpar
                    </span>
                  )}
                </div>
                <SidebarContent />
              </div>
            )}

            {/* Product Listing Area */}
            <div style={{ flex: 1 }}>

              {/* Active Filter Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '2rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#8097a5' }}>
                  Mostrando <strong style={{ color: '#2C3E50' }}>{filteredProducts.length}</strong> modelos
                </span>

                {filters.categories.map(cat => (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#E0F2F1', color: '#007396', fontSize: '0.8rem', fontWeight: '800', padding: '6px 12px', borderRadius: '20px', textTransform: 'capitalize' }}>
                    {cat} <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleCategory(cat)} />
                  </div>
                ))}

                {filters.subcategories.map(sub => (
                  <div key={sub} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFEBEE', color: '#E06A55', fontSize: '0.8rem', fontWeight: '800', padding: '6px 12px', borderRadius: '20px' }}>
                    {sub} <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleSubcategory(sub)} />
                  </div>
                ))}

                {filters.sizes.map(size => (
                  <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFF3E0', color: '#FF9F1C', fontSize: '0.8rem', fontWeight: '800', padding: '6px 12px', borderRadius: '20px' }}>
                    Tamanho {size} <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleSize(size)} />
                  </div>
                ))}

                {filters.colors.map(color => (
                  <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#E8F5E9', color: '#2C3E50', fontSize: '0.8rem', fontWeight: '800', padding: '6px 12px', borderRadius: '20px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color }} /> Cor <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleColor(color)} />
                  </div>
                ))}
              </div>

              {/* Bouncy Grid of Products with Framer Motion Layout animations */}
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '2.5rem'
                }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: 15 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      style={{ height: '100%' }}
                    >
                      <ProductCard
                        title={product.name}
                        price={product.price}
                        image={product.image}
                        category={product.subcategory || product.category}
                        id={product.id}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Interactive Empty State */}
              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    textAlign: 'center',
                    padding: '6rem 2rem',
                    backgroundColor: 'white',
                    borderRadius: '40px',
                    border: '3px dashed #eee',
                    marginTop: '2rem'
                  }}
                >
                  <Footprints size={60} color="#8097a5" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#2C3E50', marginBottom: '0.5rem' }}>Nenhum par de sapatos por aqui...</h3>
                  <p style={{ color: '#888', maxWidth: '400px', margin: '0 auto 2rem' }}>
                    Experimenta mudar os teus filtros de estilo, tamanho ou preço para encontrar sapatos disponíveis.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearFilters}
                    style={{
                      padding: '14px 28px',
                      backgroundColor: 'var(--color-teal)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(159,226,221,0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Resetar Filtros <RefreshCw size={16} />
                  </motion.button>
                </motion.div>
              )}

            </div>

          </div>
        </section>

        {/* Mobile Filters Slide-in Modal/Drawer */}
        <AnimatePresence>
          {isMobile && mobileFiltersOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFiltersOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#000',
                  zIndex: 999
                }}
              />
              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '85%',
                  maxWidth: '400px',
                  backgroundColor: 'white',
                  zIndex: 1000,
                  padding: '2.5rem 2rem',
                  boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #f9f9f9', paddingBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#2C3E50', margin: 0 }}>Filtros</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#2C3E50', cursor: 'pointer', padding: '4px' }}
                  >
                    <X size={24} />
                  </button>
                </div>
                <SidebarContent />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileFiltersOpen(false)}
                  style={{
                    backgroundColor: 'var(--color-winter-blue)',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '16px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '2.5rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 20px rgba(0,115,150,0.2)'
                  }}
                >
                  Ver {filteredProducts.length} Modelos
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
};

export default CollectionsClient2;
