'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Star, Truck, RotateCcw, Headphones, ChevronDown, ChevronUp,
  Clock, ShieldCheck, Check, ShoppingBag, Ruler, Heart,
  Sparkles, Smile, Footprints, Info, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Product, ProductVariant } from '../types/shopify';
import { useCart } from '../context/CartContext';
import Layout from './Layout';

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ product, relatedProducts }) => {
  const { addItem, addItems, openCart } = useCart();
  const variants = useMemo(() => product.variants.edges.map(e => e.node), [product.variants]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variants.find(v => v.availableForSale) || variants[0]
  );

  const images = useMemo(() => product.images.edges.map(e => e.node), [product.images]);
  const [selectedImage, setSelectedImage] = useState(
    selectedVariant?.image?.url || images[0]?.url || ''
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<number | null>(0);
  const [bottomTab, setBottomTab] = useState<'reviews' | 'faq'>('reviews');
  const [adding, setAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Diagnostic states for foot-measuring tool
  const [footLength, setFootLength] = useState<string>('');
  const [diagnosticResult, setDiagnosticResult] = useState<string>('');

  // Bundle section states
  const [bundleSelections, setBundleSelections] = useState<boolean[]>([true, true, true]);
  const [relatedVariant1, setRelatedVariant1] = useState<ProductVariant | null>(null);
  const [relatedVariant2, setRelatedVariant2] = useState<ProductVariant | null>(null);
  const [bundleAdding, setBundleAdding] = useState(false);

  useEffect(() => {
    if (relatedProducts && relatedProducts.length > 0) {
      const p1 = relatedProducts[0];
      const vars1 = p1.variants.edges.map(e => e.node);
      const available1 = vars1.find(v => v.availableForSale) || vars1[0] || null;
      setRelatedVariant1(available1);
    }
    if (relatedProducts && relatedProducts.length > 1) {
      const p2 = relatedProducts[1];
      const vars2 = p2.variants.edges.map(e => e.node);
      const available2 = vars2.find(v => v.availableForSale) || vars2[0] || null;
      setRelatedVariant2(available2);
    }
  }, [relatedProducts]);

  const getProductSizes = (p: Product) => {
    const vars = p.variants.edges.map(e => e.node);
    const sizeOptions = new Set<string>();
    vars.forEach(v => {
      v.selectedOptions.forEach(opt => {
        if (opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size')) {
          sizeOptions.add(opt.value);
        }
      });
    });
    return Array.from(sizeOptions).sort();
  };

  const handleRelatedSizeChange = (productIdx: number, size: string) => {
    const p = relatedProducts[productIdx - 1];
    if (!p) return;
    const vars = p.variants.edges.map(e => e.node);
    const match = vars.find(v =>
      v.selectedOptions.some(opt =>
        (opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size')) && opt.value === size
      )
    );
    if (match) {
      if (productIdx === 1) {
        setRelatedVariant1(match);
      } else {
        setRelatedVariant2(match);
      }
    }
  };

  const totalBundlePrice = useMemo(() => {
    let sum = 0;
    if (bundleSelections[0] && selectedVariant) {
      sum += parseFloat(selectedVariant.price.amount);
    }
    if (bundleSelections[1] && relatedVariant1) {
      sum += parseFloat(relatedVariant1.price.amount);
    }
    if (bundleSelections[2] && relatedVariant2) {
      sum += parseFloat(relatedVariant2.price.amount);
    }
    return sum;
  }, [bundleSelections, selectedVariant, relatedVariant1, relatedVariant2]);

  const handleAddBundleToCart = async () => {
    const itemsToAdd: { merchandiseId: string; quantity: number }[] = [];
    if (bundleSelections[0] && selectedVariant) {
      itemsToAdd.push({ merchandiseId: selectedVariant.id, quantity: 1 });
    }
    if (bundleSelections[1] && relatedVariant1) {
      itemsToAdd.push({ merchandiseId: relatedVariant1.id, quantity: 1 });
    }
    if (bundleSelections[2] && relatedVariant2) {
      itemsToAdd.push({ merchandiseId: relatedVariant2.id, quantity: 1 });
    }
    if (itemsToAdd.length === 0) return;
    setBundleAdding(true);
    try {
      await addItems(itemsToAdd);
      openCart();
    } catch (err) {
      console.error('Failed to add bundle to cart:', err);
    } finally {
      setBundleAdding(false);
    }
  };

  const selectedBundleCount = bundleSelections.filter(Boolean).length;

  const selectedThumbnails = useMemo(() => {
    const list = [];
    if (bundleSelections[0] && selectedImage) {
      list.push(selectedImage);
    }
    if (bundleSelections[1] && (relatedVariant1?.image?.url || relatedProducts[0]?.images.edges[0]?.node.url)) {
      list.push(relatedVariant1?.image?.url || relatedProducts[0]?.images.edges[0]?.node.url);
    }
    if (bundleSelections[2] && (relatedVariant2?.image?.url || relatedProducts[1]?.images.edges[0]?.node.url)) {
      list.push(relatedVariant2?.image?.url || relatedProducts[1]?.images.edges[0]?.node.url);
    }
    return list;
  }, [bundleSelections, selectedImage, relatedVariant1, relatedVariant2, relatedProducts]);



  const handleMobileScroll = () => {
    if (mobileGalleryRef.current) {
      const { scrollLeft, offsetWidth } = mobileGalleryRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveImageIndex(index);
    }
  };

  const toggleTab = (index: number) => setActiveTab(activeTab === index ? null : index);

  // Option names and values mapping for Shopify variants selection
  const optionNames = useMemo(() => {
    const names = new Set<string>();
    variants.forEach(v => {
      v.selectedOptions.forEach(opt => {
        names.add(opt.name);
      });
    });

    // Ensure Color/Cor is always first
    return Array.from(names).sort((a, b) => {
      const isColorA = a.toLowerCase().includes('cor') || a.toLowerCase().includes('col');
      const isColorB = b.toLowerCase().includes('cor') || b.toLowerCase().includes('col');
      if (isColorA && !isColorB) return -1;
      if (!isColorA && isColorB) return 1;
      return 0;
    });
  }, [variants]);

  const optionValuesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    optionNames.forEach(name => {
      const values = new Set<string>();
      variants.forEach(v => {
        const opt = v.selectedOptions.find(o => o.name === name);
        if (opt) values.add(opt.value);
      });
      map[name] = Array.from(values);
    });
    return map;
  }, [optionNames, variants]);

  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    if (selectedVariant) {
      selectedVariant.selectedOptions.forEach(opt => {
        initialMap[opt.name] = opt.value;
      });
    }
    return initialMap;
  });

  const displayImages = useMemo(() => {
    const colorKey = Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('cor') || k.toLowerCase().includes('col'));
    const selectedColor = colorKey ? selectedOptionsMap[colorKey] : null;

    if (!selectedColor) return images;

    const filtered = images.filter(img =>
      img.altText && img.altText.toLowerCase().includes(selectedColor.toLowerCase())
    );

    return filtered.length > 0 ? filtered : images;
  }, [images, selectedOptionsMap]);

  // Sync image when variant changes or color images change
  useEffect(() => {
    if (selectedVariant?.image?.url) {
      setSelectedImage(selectedVariant.image.url);
    } else if (displayImages.length > 0 && !displayImages.some(img => img.url === selectedImage)) {
      setSelectedImage(displayImages[0].url);
    }
  }, [selectedVariant, displayImages]);

  const handleOptionChange = (optionName: string, optionValue: string) => {
    const updatedMap = { ...selectedOptionsMap, [optionName]: optionValue };

    // 1. Try to find variant with exact match
    let match = variants.find(v =>
      v.selectedOptions.every(opt => updatedMap[opt.name] === opt.value)
    );

    // 2. If no exact match (e.g. that color is not available in that size),
    // find first variant that has the selected color/option, and use its options
    if (!match) {
      match = variants.find(v =>
        v.selectedOptions.some(opt => opt.name === optionName && opt.value === optionValue)
      );
    }

    if (match) {
      setSelectedVariant(match);
      const newMap: Record<string, string> = {};
      match.selectedOptions.forEach(opt => {
        newMap[opt.name] = opt.value;
      });
      setSelectedOptionsMap(newMap);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    try {
      await addItem(selectedVariant.id, quantity);
      openCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    try {
      await addItem(selectedVariant.id, quantity);
      openCart();
    } catch (err) {
      console.error('Failed to add for checkout:', err);
    } finally {
      setAdding(false);
    }
  };

  // Diagnostic foot calculator
  const calculateSize = (val: string) => {
    setFootLength(val);
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) {
      setDiagnosticResult('');
      return;
    }

    const targetLength = num + 1.0;
    let size = '';

    if (targetLength < 11.5) size = 'Tamanho 18 (Pezinho de Bebé)';
    else if (targetLength < 12.0) size = 'Tamanho 19';
    else if (targetLength < 12.7) size = 'Tamanho 20';
    else if (targetLength < 13.4) size = 'Tamanho 21';
    else if (targetLength < 14.1) size = 'Tamanho 22';
    else if (targetLength < 14.7) size = 'Tamanho 23';
    else if (targetLength < 15.4) size = 'Tamanho 24';
    else if (targetLength < 16.0) size = 'Tamanho 25';
    else if (targetLength < 16.7) size = 'Tamanho 26';
    else if (targetLength < 17.4) size = 'Tamanho 27';
    else if (targetLength < 18.0) size = 'Tamanho 28';
    else if (targetLength < 18.7) size = 'Tamanho 29';
    else if (targetLength < 19.4) size = 'Tamanho 30';
    else if (targetLength < 20.0) size = 'Tamanho 31';
    else if (targetLength < 20.7) size = 'Tamanho 32';
    else if (targetLength < 21.4) size = 'Tamanho 33';
    else if (targetLength < 22.0) size = 'Tamanho 34';
    else size = 'Tamanho 35+ (Consultar Guia Principal)';

    setDiagnosticResult(`Recomendamos o **${size}** (Medida: ${num}cm + 1cm de folga saudável = ${targetLength.toFixed(1)}cm)`);
  };

  const tabs = [
    {
      title: '🦕 Anatomia e Brincadeira', content: (
        <div style={{ padding: '0.5rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Sola plana para um alinhamento natural do corpo.',
              'Flexibilidade que acompanha cada movimento.',
              'Materiais leves e respiráveis para conforto diário.',
              'Espaço amplo para os dedos se moverem livremente.',
              'Calcanhar livre para um movimento natural.'
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.95rem', color: '#2C3E50', fontWeight: '600' }}>
                <Check size={18} color="#4CAF50" strokeWidth={3} style={{ flexShrink: 0, marginTop: '2px' }} /> <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: '🍃 Materiais do Sapatinho', content: (
        <div style={{ padding: '0.5rem' }}>
          <p style={{ marginBottom: '1rem', color: '#666', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            {['Algodão Biológico', 'Respirável', 'Sola Antiderrapante', 'Feito na Península Ibérica'].map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: '#2C3E50', fontSize: '0.9rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#007396' }} /> {feat}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: '🛡️ Garantia Inpe', content: (
        <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#FFF9ED', borderRadius: '20px', border: '2px dashed #F4C466' }}>
          <ShieldCheck size={44} color="#FF9F1C" style={{ margin: '0 auto 10px' }} />
          <p style={{ color: '#2C3E50', fontWeight: '800', fontSize: '1rem' }}>Ajuste Ergonómico Garantido</p>
          <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '5px' }}>Se não servir ou não gostarem, a devolução é super simples até 30 dias!</p>
        </div>
      )
    }
  ];

  const priceVal = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount);
  const currencySymbol = selectedVariant?.price.currencyCode === 'EUR' ? '€' : selectedVariant?.price.currencyCode;

  // Render thumbnail style with alternate rotations
  const getRotationStyle = (idx: number) => {
    const rotations = [-3, 2, -1, 3, -2];
    return rotations[idx % rotations.length];
  };

  return (
    <Layout>
      <div style={{ backgroundColor: '#FFFDF9', minHeight: '100vh', padding: '3rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          {/* Main Content Grid (styled like Design 2) */}
          <div className="product-main" style={{ alignItems: 'start', marginBottom: '6rem' }}>

            {/* Left: Gallery */}
            <div className="product-gallery" style={{ height: 'fit-content', zIndex: 10 }}>
              {/* Desktop View */}
              <div className="desktop-gallery-view">
                <div className="gallery-thumbnails">
                  {displayImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={img.altText || `Thumbnail ${idx}`}
                      className={`gallery-thumbnail ${selectedImage === img.url ? 'active' : ''}`}
                      onClick={() => setSelectedImage(img.url)}
                    />
                  ))}
                </div>
                <div className="gallery-main-image">
                  <img src={selectedImage} alt={product.title} />
                </div>
              </div>

              {/* Mobile View */}
              <div className="mobile-gallery-view">
                <div className="mobile-gallery-scroll" ref={mobileGalleryRef} onScroll={handleMobileScroll}>
                  {displayImages.map((img, idx) => (
                    <img key={idx} src={img.url} alt={`Product ${idx}`} className="mobile-gallery-image" />
                  ))}
                </div>
                <div className="mobile-gallery-dots">
                  {displayImages.map((_, idx) => (
                    <span key={idx} className={`gallery-dot ${idx === activeImageIndex ? 'active' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Info and Purchase Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              <div>
                <h1 style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                  fontWeight: '900',
                  color: '#2C3E50',
                  marginTop: '1rem',
                  lineHeight: '1.1',
                  textTransform: 'uppercase'
                }}>
                  {product.title}
                </h1>

                {/* Star rating info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#F4C466" color="#F4C466" />)}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#8097a5' }}>
                    (128 Exploradores Felizes)
                  </span>
                </div>
              </div>

              {/* Price Sticker and Free Shipping */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  style={{
                    backgroundColor: '#FF9F1C',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '20px 4px 20px 20px',
                    fontSize: '2.2rem',
                    fontWeight: '900',
                    boxShadow: '0 8px 20px rgba(255, 159, 28, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    lineHeight: '1'
                  }}
                >
                  {priceVal.toFixed(2)}
                  <span style={{ fontSize: '1.2rem', marginLeft: '4px', fontWeight: '800' }}>{currencySymbol}</span>
                </motion.div>

                <div style={{
                  backgroundColor: '#E8F5E9',
                  color: '#4CAF50',
                  padding: '6px 12px',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  textTransform: 'uppercase'
                }}>
                  Envio Grátis
                </div>
              </div>

              <div style={{ height: '2px', backgroundColor: 'rgba(0,0,0,0.05)' }} />

              {/* Custom options and size selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1rem' }}>
                {optionNames.map(name => {
                  const isColor = name.toLowerCase().includes('cor') || name.toLowerCase().includes('col');
                  const isSize = name.toLowerCase().includes('tam') || name.toLowerCase().includes('siz') || name.toLowerCase().includes('num');
                  const values = optionValuesMap[name];

                  // Color selector in single row
                  if (isColor || (!isSize && optionNames.indexOf(name) === 0)) {
                    const colorMap: Record<string, string> = {
                      "preto": "#1c1c1c",
                      "branco": "#f9f9f9",
                      "azul": "#1a73e8",
                      "vermelho": "#d93025",
                      "verde": "#188038",
                      "amarelo": "#f9ab00",
                      "rosa": "#f06292",
                      "roxo": "#9c27b0",
                      "castanho": "#795548",
                      "cinzento": "#9e9e9e",
                      "cinza": "#9e9e9e",
                      "laranja": "#f57c00",
                      "bege": "#f5f5dc",
                      "prateado": "#c0c0c0",
                      "dourado": "#ffd700",
                      "marinho": "#000080",
                      "azul escuro": "#00008b",
                      "verde seco": "#556b2f"
                    };

                    return (
                      <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-text)' }}>
                          🎨 Escolhe a Cor / Opção: {selectedOptionsMap[name] ? <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>{selectedOptionsMap[name]}</span> : null}
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {values.map(val => {
                            const isSelected = selectedOptionsMap[name] === val;
                            const lowerVal = val.toLowerCase();
                            // Find color match, default to a light gray if not found
                            let cssColor = '#e0e0e0';
                            for (const [key, color] of Object.entries(colorMap)) {
                              if (lowerVal.includes(key)) {
                                cssColor = color;
                                break;
                              }
                            }

                            return (
                              <button
                                key={val}
                                onClick={() => handleOptionChange(name, val)}
                                title={val}
                                style={{
                                  width: '42px',
                                  height: '42px',
                                  borderRadius: '50%',
                                  border: isSelected ? '3px solid #FF9F1C' : '2px solid #EAEAEA',
                                  backgroundColor: cssColor,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  padding: 0,
                                  boxShadow: isSelected ? '0 0 0 2px white inset' : 'none'
                                }}
                                aria-label={`Cor ${val}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // Size selector below colors
                  if (isSize || optionNames.indexOf(name) > 0 || values.every(v => !isNaN(parseFloat(v)))) {
                    return (
                      <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-text)' }}>
                            👣 Escolhe o Tamanho ideal:
                          </span>

                          <a
                            href="#calculadora-tamanhos"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById('calculadora-tamanhos')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            style={{ fontSize: '0.85rem', color: 'var(--color-winter-blue)', fontWeight: 600, textDecoration: 'underline' }}
                          >
                            Tabela de medidas
                          </a>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {values.map(val => {
                            const sizeVariant = variants.find(v =>
                              v.selectedOptions.some(o => o.name === name && o.value === val) &&
                              (optionNames.find(n => n !== name) ? v.selectedOptions.some(o => o.name !== name && o.value === selectedOptionsMap[o.name]) : true)
                            );
                            const isAvailable = sizeVariant ? sizeVariant.availableForSale : false;
                            const isSelected = selectedOptionsMap[name] === val;

                            return (
                              <motion.button
                                key={val}
                                onClick={() => isAvailable && handleOptionChange(name, val)}
                                whileHover={isAvailable ? { scale: 1.12 } : {}}
                                whileTap={isAvailable ? { scale: 0.92 } : {}}
                                style={{
                                  minWidth: '54px',
                                  height: '54px',
                                  borderRadius: '50%',
                                  border: isSelected ? '3px solid #FF9F1C' : '2px solid #EAEAEA',
                                  backgroundColor: isSelected ? '#FF9F1C' : isAvailable ? 'white' : '#F5F5F5',
                                  color: isSelected ? 'white' : isAvailable ? 'var(--color-text)' : '#BBB',
                                  fontWeight: '900',
                                  fontSize: '1rem',
                                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  position: 'relative',
                                  textDecoration: isAvailable ? 'none' : 'line-through'
                                }}
                              >
                                {val}
                                {!isAvailable && (
                                  <span style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    fontSize: '0.55rem',
                                    backgroundColor: '#E06A55',
                                    color: 'white',
                                    padding: '1px 4px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none'
                                  }}>
                                    Esgotado
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-text)' }}>
                        {name}:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {values.map(val => {
                          const isSelected = selectedOptionsMap[name] === val;
                          return (
                            <button
                              key={val}
                              onClick={() => handleOptionChange(name, val)}
                              style={{
                                padding: '8px 18px',
                                borderRadius: '20px',
                                border: isSelected ? '2px solid #FF9F1C' : '2px solid #EAEAEA',
                                backgroundColor: isSelected ? '#FF9F1C' : 'white',
                                color: isSelected ? 'white' : 'var(--color-text)',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                              }}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quantity Selector, Add to Cart, Buy Now */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>

                  {/* Bubbly Quantity Selector */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '2px solid #EAEAEA',
                    borderRadius: '30px',
                    padding: '4px 12px',
                    height: '56px',
                    width: '120px',
                    backgroundColor: 'white'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ background: 'none', border: 'none', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer', color: '#2C3E50', width: '30px' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#2C3E50' }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ background: 'none', border: 'none', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer', color: '#2C3E50', width: '30px' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    disabled={adding || !selectedVariant.availableForSale}
                    style={{
                      flex: '1',
                      minWidth: '200px',
                      height: '56px',
                      borderRadius: '30px',
                      backgroundColor: '#FF9F1C',
                      color: 'white',
                      border: 'none',
                      fontWeight: '900',
                      fontSize: '1.1rem',
                      cursor: selectedVariant.availableForSale ? 'pointer' : 'not-allowed',
                      boxShadow: '0 8px 25px rgba(255, 159, 28, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: selectedVariant.availableForSale ? 1 : 0.6
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                      <ShoppingBag size={20} style={{ flexShrink: 0 }} />
                      {adding ? 'A Guardar...' : selectedVariant.availableForSale ? 'Adicionar ao Carrinho' : 'Esgotado'}
                    </span>
                  </motion.button>

                </div>

                {/* Direct Buy Now Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  disabled={adding || !selectedVariant.availableForSale}
                  style={{
                    width: '100%',
                    height: '56px',
                    borderRadius: '30px',
                    backgroundColor: '#007396',
                    color: 'white',
                    border: 'none',
                    fontWeight: '900',
                    fontSize: '1.1rem',
                    cursor: selectedVariant.availableForSale ? 'pointer' : 'not-allowed',
                    boxShadow: '0 8px 25px rgba(0, 115, 150, 0.25)',
                    opacity: selectedVariant.availableForSale ? 1 : 0.6
                  }}
                >
                  Comprar Já ✨
                </motion.button>
              </div>

              {/* Quick Size Calculator Widget */}
              <div
                id="calculadora-tamanhos"
                style={{
                  backgroundColor: '#FFF9ED',
                  border: '2px dashed #F4C466',
                  borderRadius: '24px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '1.5rem',
                  scrollMarginTop: '100px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ruler size={20} color="#FF9F1C" />
                  <span style={{ fontWeight: '900', color: 'var(--color-text)', fontSize: '1rem' }}>
                    Calculadora de Tamanho Rápida
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0, lineHeight: 1.4 }}>
                  Coloca o pezinho da criança numa folha de papel, desenha o contorno e mede em centímetros de ponta a ponta.
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-text)' }}>Medida em cm:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="10"
                    max="30"
                    placeholder="Ex: 14"
                    value={footLength}
                    onChange={(e) => calculateSize(e.target.value)}
                    style={{
                      width: '90px',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      border: '2px solid #F4C466',
                      fontWeight: '800',
                      outline: 'none',
                      color: 'var(--color-text)',
                      textAlign: 'center'
                    }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>cm</span>
                </div>

                {diagnosticResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      borderLeft: '4px solid #FF9F1C',
                      fontSize: '0.9rem',
                      color: 'var(--color-text)',
                      fontWeight: '600'
                    }}
                  >
                    💡 <span dangerouslySetInnerHTML={{ __html: diagnosticResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </motion.div>
                )}
              </div>

              {/* Visual Trust Cards Layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '10px' }}>
                <div style={{
                  padding: '16px',
                  borderRadius: '20px',
                  backgroundColor: '#F0F7F9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <Truck size={22} color="#007396" />
                  <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#2C3E50' }}>Entrega Grátis Expressa</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>2 a 5 dias para Portugal e Espanha</span>
                </div>
                <div style={{
                  padding: '16px',
                  borderRadius: '20px',
                  backgroundColor: '#F9F0F4',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <RotateCcw size={22} color="#E06A55" />
                  <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#2C3E50' }}>30 Dias de Experiência</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>Devolução simplificada e grátis</span>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tabs.map((tab, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      border: '2px solid #EAEAEA',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      onClick={() => toggleTab(idx)}
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: '900',
                        color: '#2C3E50',
                        fontSize: '1rem'
                      }}
                    >
                      <span>{tab.title}</span>
                      <motion.div
                        animate={{ rotate: activeTab === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {activeTab === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0 20px 20px', borderTop: '1px solid #EAEAEA', paddingTop: '15px' }}>
                            {tab.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Frequently Bought Together Bundle */}
          {relatedProducts.length >= 2 && (
            <div className="bundle-section" style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '4rem' }}>

              {/* Desktop Layout */}
              <div className="bundle-section-desktop">
                <div className="section-header">
                  <span className="section-subtitle">Aproveite mais por menos</span>
                  <h2 className="section-title" style={{
                    fontSize: '2.2rem',
                    fontWeight: '900',
                    color: '#2C3E50',
                    marginTop: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    Frequentemente comprados <span style={{ color: '#007396' }}>em conjunto</span>
                  </h2>
                </div>

                <div className="bundle-container">
                  <div className="bundle-cards">

                    {/* Card 1: Main Product */}
                    <div className={`bundle-card-wrapper ${!bundleSelections[0] ? 'deselected' : ''}`}>
                      <div
                        className={`bundle-checkbox ${bundleSelections[0] ? 'selected' : ''}`}
                        onClick={() => setBundleSelections(prev => [!prev[0], prev[1], prev[2]])}
                        style={{
                          backgroundColor: bundleSelections[0] ? '#FF9F1C' : 'white',
                          borderColor: bundleSelections[0] ? '#FF9F1C' : '#ddd',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {bundleSelections[0] && <Check size={14} strokeWidth={3} />}
                      </div>

                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '28px',
                        padding: '16px',
                        border: '2px solid #EAEAEA',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transform: 'rotate(-1deg)'
                      }}>
                        <div style={{
                          height: '160px',
                          backgroundColor: '#FDF6E9',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          marginBottom: '15px'
                        }}>
                          <img
                            src={selectedImage}
                            alt={product.title}
                            style={{
                              maxWidth: '80%',
                              maxHeight: '80%',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.05))'
                            }}
                          />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2C3E50', margin: '0 0 6px', lineHeight: '1.2' }}>
                          {product.title}
                        </h3>

                        {/* Size info for main product */}
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#666', marginTop: 'auto', marginBottom: '8px' }}>
                          Tamanho: {selectedOptionsMap[Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('tamanho') || k.toLowerCase().includes('size')) || ''] || 'Padrão'}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#E06A55' }}>
                            {selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount}€
                          </span>
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '12px',
                            backgroundColor: '#F4C466',
                            color: '#2C3E50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }} onClick={() => setBundleSelections(prev => [!prev[0], prev[1], prev[2]])}>
                            <ShoppingBag size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="plus-sign">+</div>

                    {/* Card 2: Related Product 1 */}
                    <div className={`bundle-card-wrapper ${!bundleSelections[1] ? 'deselected' : ''}`}>
                      <div
                        className={`bundle-checkbox ${bundleSelections[1] ? 'selected' : ''}`}
                        onClick={() => setBundleSelections(prev => [prev[0], !prev[1], prev[2]])}
                        style={{
                          backgroundColor: bundleSelections[1] ? '#FF9F1C' : 'white',
                          borderColor: bundleSelections[1] ? '#FF9F1C' : '#ddd',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {bundleSelections[1] && <Check size={14} strokeWidth={3} />}
                      </div>

                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '28px',
                        padding: '16px',
                        border: '2px solid #EAEAEA',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transform: 'rotate(1.5deg)'
                      }}>
                        <div style={{
                          height: '160px',
                          backgroundColor: '#FDF6E9',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          marginBottom: '15px'
                        }}>
                          <img
                            src={relatedVariant1?.image?.url || relatedProducts[0].images.edges[0]?.node.url}
                            alt={relatedProducts[0].title}
                            style={{
                              maxWidth: '80%',
                              maxHeight: '80%',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.05))'
                            }}
                          />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2C3E50', margin: '0 0 6px', lineHeight: '1.2' }}>
                          {relatedProducts[0].title}
                        </h3>

                        {/* Size selector dropdown */}
                        <div style={{ marginTop: 'auto', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#666', display: 'block', marginBottom: '4px' }}>Tamanho:</span>
                          <select
                            value={relatedVariant1?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                            onChange={(e) => handleRelatedSizeChange(1, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: '10px',
                              border: '2px solid #EAEAEA',
                              fontSize: '0.85rem',
                              fontWeight: '800',
                              color: 'var(--color-text)',
                              outline: 'none',
                              backgroundColor: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            {getProductSizes(relatedProducts[0]).map(sz => (
                              <option key={sz} value={sz}>{sz}</option>
                            ))}
                          </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#E06A55' }}>
                            {relatedVariant1?.price.amount || relatedProducts[0].priceRange.minVariantPrice.amount}€
                          </span>
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '12px',
                            backgroundColor: '#F4C466',
                            color: '#2C3E50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }} onClick={() => setBundleSelections(prev => [prev[0], !prev[1], prev[2]])}>
                            <ShoppingBag size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="plus-sign">+</div>

                    {/* Card 3: Related Product 2 */}
                    <div className={`bundle-card-wrapper ${!bundleSelections[2] ? 'deselected' : ''}`}>
                      <div
                        className={`bundle-checkbox ${bundleSelections[2] ? 'selected' : ''}`}
                        onClick={() => setBundleSelections(prev => [prev[0], prev[1], !prev[2]])}
                        style={{
                          backgroundColor: bundleSelections[2] ? '#FF9F1C' : 'white',
                          borderColor: bundleSelections[2] ? '#FF9F1C' : '#ddd',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {bundleSelections[2] && <Check size={14} strokeWidth={3} />}
                      </div>

                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '28px',
                        padding: '16px',
                        border: '2px solid #EAEAEA',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transform: 'rotate(-0.5deg)'
                      }}>
                        <div style={{
                          height: '160px',
                          backgroundColor: '#FDF6E9',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          marginBottom: '15px'
                        }}>
                          <img
                            src={relatedVariant2?.image?.url || relatedProducts[1].images.edges[0]?.node.url}
                            alt={relatedProducts[1].title}
                            style={{
                              maxWidth: '80%',
                              maxHeight: '80%',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.05))'
                            }}
                          />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2C3E50', margin: '0 0 6px', lineHeight: '1.2' }}>
                          {relatedProducts[1].title}
                        </h3>

                        {/* Size selector dropdown */}
                        <div style={{ marginTop: 'auto', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#666', display: 'block', marginBottom: '4px' }}>Tamanho:</span>
                          <select
                            value={relatedVariant2?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                            onChange={(e) => handleRelatedSizeChange(2, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: '10px',
                              border: '2px solid #EAEAEA',
                              fontSize: '0.85rem',
                              fontWeight: '800',
                              color: 'var(--color-text)',
                              outline: 'none',
                              backgroundColor: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            {getProductSizes(relatedProducts[1]).map(sz => (
                              <option key={sz} value={sz}>{sz}</option>
                            ))}
                          </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#E06A55' }}>
                            {relatedVariant2?.price.amount || relatedProducts[1].priceRange.minVariantPrice.amount}€
                          </span>
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '12px',
                            backgroundColor: '#F4C466',
                            color: '#2C3E50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }} onClick={() => setBundleSelections(prev => [prev[0], prev[1], !prev[2]])}>
                            <ShoppingBag size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Sidebar Summary */}
                  <div className="bundle-summary" style={{
                    border: '2px solid #EAEAEA',
                    borderRadius: '24px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.02)'
                  }}>
                    <div className="bundle-total-price">
                      <span className="label" style={{ fontSize: '0.9rem', fontWeight: '900', color: '#8097a5', letterSpacing: '1px' }}>Preço Total:</span>
                      <span className="value" style={{ fontSize: '2.4rem', fontWeight: '900', color: '#2C3E50', marginTop: '5px' }}>
                        {totalBundlePrice.toFixed(2)} €
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleAddBundleToCart}
                        disabled={bundleAdding || selectedBundleCount === 0}
                        style={{
                          width: '100%',
                          height: '48px',
                          borderRadius: '24px',
                          backgroundColor: '#F4C466',
                          color: '#2C3E50',
                          border: 'none',
                          fontWeight: '900',
                          fontSize: '0.95rem',
                          cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                          opacity: selectedBundleCount > 0 ? 1 : 0.6,
                          boxShadow: '0 4px 12px rgba(244, 196, 102, 0.2)'
                        }}
                      >
                        {bundleAdding ? 'A carregar...' : `Adicionar ${selectedBundleCount} ao carrinho`}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleAddBundleToCart} // opens drawer immediately
                        disabled={bundleAdding || selectedBundleCount === 0}
                        style={{
                          width: '100%',
                          height: '48px',
                          borderRadius: '24px',
                          backgroundColor: '#007396',
                          color: 'white',
                          border: 'none',
                          fontWeight: '900',
                          fontSize: '0.95rem',
                          cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                          opacity: selectedBundleCount > 0 ? 1 : 0.6,
                          boxShadow: '0 4px 12px rgba(0, 115, 150, 0.2)'
                        }}
                      >
                        Comprar Já
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="bundle-section-mobile">
                <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                  <span className="section-subtitle">Aproveite mais por menos</span>
                  <h2 className="section-title" style={{
                    fontSize: '1.6rem',
                    fontWeight: '900',
                    color: '#2C3E50',
                    marginTop: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    Frequentemente comprados <span style={{ color: '#007396' }}>em conjunto</span>
                  </h2>
                </div>

                <div className="mobile-bundle-grid">

                  {/* Card 1: Main Product */}
                  <div className={`bundle-card-wrapper ${!bundleSelections[0] ? 'deselected' : ''}`}>
                    <div
                      className={`bundle-checkbox ${bundleSelections[0] ? 'selected' : ''}`}
                      onClick={() => setBundleSelections(prev => [!prev[0], prev[1], prev[2]])}
                      style={{
                        backgroundColor: bundleSelections[0] ? '#FF9F1C' : 'white',
                        borderColor: bundleSelections[0] ? '#FF9F1C' : '#ddd',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {bundleSelections[0] && <Check size={14} strokeWidth={3} />}
                    </div>

                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      padding: '12px',
                      border: '2px solid #EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      <div style={{
                        height: '130px',
                        backgroundColor: '#FDF6E9',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        marginBottom: '10px'
                      }}>
                        <img
                          src={selectedImage}
                          alt={product.title}
                          style={{
                            maxWidth: '75%',
                            maxHeight: '75%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#2C3E50', margin: '0 0 4px', lineHeight: '1.2' }}>
                        {product.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#8097a5', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Este produto ({selectedOptionsMap[Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('cor') || k.toLowerCase().includes('col')) || ''] || ''})
                      </span>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#666', marginBottom: '8px' }}>
                        Tamanho: {selectedOptionsMap[Object.keys(selectedOptionsMap).find(k => k.toLowerCase().includes('tamanho') || k.toLowerCase().includes('size')) || ''] || 'Padrão'}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#E06A55' }}>
                          {selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount}€
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Related Product 1 */}
                  <div className={`bundle-card-wrapper ${!bundleSelections[1] ? 'deselected' : ''}`}>
                    <div
                      className={`bundle-checkbox ${bundleSelections[1] ? 'selected' : ''}`}
                      onClick={() => setBundleSelections(prev => [prev[0], !prev[1], prev[2]])}
                      style={{
                        backgroundColor: bundleSelections[1] ? '#FF9F1C' : 'white',
                        borderColor: bundleSelections[1] ? '#FF9F1C' : '#ddd',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {bundleSelections[1] && <Check size={14} strokeWidth={3} />}
                    </div>

                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      padding: '12px',
                      border: '2px solid #EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      <div style={{
                        height: '120px',
                        backgroundColor: '#FDF6E9',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        marginBottom: '10px'
                      }}>
                        <img
                          src={relatedVariant1?.image?.url || relatedProducts[0].images.edges[0]?.node.url}
                          alt={relatedProducts[0].title}
                          style={{
                            maxWidth: '75%',
                            maxHeight: '75%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#2C3E50', margin: '0 0 4px', lineHeight: '1.2' }}>
                        {relatedProducts[0].title}
                      </h3>

                      {/* Size selector dropdown */}
                      <div style={{ marginBottom: '8px' }}>
                        <select
                          value={relatedVariant1?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                          onChange={(e) => handleRelatedSizeChange(1, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '1px solid #EAEAEA',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            color: 'var(--color-text)',
                            outline: 'none',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          {getProductSizes(relatedProducts[0]).map(sz => (
                            <option key={sz} value={sz}>{sz}</option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#E06A55' }}>
                          {relatedVariant1?.price.amount || relatedProducts[0].priceRange.minVariantPrice.amount}€
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Related Product 2 */}
                  <div className={`bundle-card-wrapper ${!bundleSelections[2] ? 'deselected' : ''}`}>
                    <div
                      className={`bundle-checkbox ${bundleSelections[2] ? 'selected' : ''}`}
                      onClick={() => setBundleSelections(prev => [prev[0], prev[1], !prev[2]])}
                      style={{
                        backgroundColor: bundleSelections[2] ? '#FF9F1C' : 'white',
                        borderColor: bundleSelections[2] ? '#FF9F1C' : '#ddd',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {bundleSelections[2] && <Check size={14} strokeWidth={3} />}
                    </div>

                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      padding: '12px',
                      border: '2px solid #EAEAEA',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      <div style={{
                        height: '120px',
                        backgroundColor: '#FDF6E9',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        marginBottom: '10px'
                      }}>
                        <img
                          src={relatedVariant2?.image?.url || relatedProducts[1].images.edges[0]?.node.url}
                          alt={relatedProducts[1].title}
                          style={{
                            maxWidth: '75%',
                            maxHeight: '75%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#2C3E50', margin: '0 0 4px', lineHeight: '1.2' }}>
                        {relatedProducts[1].title}
                      </h3>

                      {/* Size selector dropdown */}
                      <div style={{ marginBottom: '8px' }}>
                        <select
                          value={relatedVariant2?.selectedOptions.find(opt => opt.name.toLowerCase().includes('tamanho') || opt.name.toLowerCase().includes('size'))?.value || ''}
                          onChange={(e) => handleRelatedSizeChange(2, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '1px solid #EAEAEA',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            color: 'var(--color-text)',
                            outline: 'none',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          {getProductSizes(relatedProducts[1]).map(sz => (
                            <option key={sz} value={sz}>{sz}</option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#E06A55' }}>
                          {relatedVariant2?.price.amount || relatedProducts[1].priceRange.minVariantPrice.amount}€
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Mobile summary bar */}
                <div className="mobile-bundle-summary" style={{
                  border: '2px solid #EAEAEA',
                  borderRadius: '20px',
                  marginBottom: '1.5rem'
                }}>
                  <div className="mobile-bundle-images">
                    {selectedThumbnails.map((imgUrl, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="mobile-plus">+</span>}
                        <div className="mobile-bundle-img-wrapper" style={{
                          border: '2px solid #EAEAEA',
                          borderRadius: '12px'
                        }}>
                          <img src={imgUrl} alt="Bundle item" />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="mobile-bundle-bar">
                    <span>Preço Total:</span>
                    <span className="mobile-bundle-price">{totalBundlePrice.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Mobile actions */}
                <div className="mobile-bundle-actions">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddBundleToCart}
                    disabled={bundleAdding || selectedBundleCount === 0}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '25px',
                      backgroundColor: '#F4C466',
                      color: '#2C3E50',
                      border: 'none',
                      fontWeight: '900',
                      fontSize: '1rem',
                      cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                      opacity: selectedBundleCount > 0 ? 1 : 0.6,
                      boxShadow: '0 4px 12px rgba(244, 196, 102, 0.2)'
                    }}
                  >
                    {bundleAdding ? 'A carregar...' : `Adicionar ${selectedBundleCount} ao carrinho`}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddBundleToCart}
                    disabled={bundleAdding || selectedBundleCount === 0}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '25px',
                      backgroundColor: '#007396',
                      color: 'white',
                      border: 'none',
                      fontWeight: '900',
                      fontSize: '1rem',
                      cursor: selectedBundleCount > 0 ? 'pointer' : 'not-allowed',
                      opacity: selectedBundleCount > 0 ? 1 : 0.6,
                      boxShadow: '0 4px 12px rgba(0, 115, 150, 0.2)'
                    }}
                  >
                    Comprar Já
                  </motion.button>
                </div>

              </div>

            </div>
          )}

          {/* Related Products Shelf */}
          {relatedProducts.length > 0 && (
            <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '4rem', marginBottom: '6rem' }}>
              <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '2.2rem',
                  fontWeight: '900',
                  color: '#2C3E50',
                  marginTop: '1rem',
                  textTransform: 'uppercase'
                }}>
                  Clientes também <span style={{ color: '#007396' }}>gostaram</span>
                </h2>
              </div>

              {/* Related list grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '2.5rem'
              }}>
                {relatedProducts.map((p, idx) => {
                  const firstVar = p.variants.edges[0]?.node;
                  const price = firstVar?.price.amount || '0.00';
                  const image = p.images.edges[0]?.node.url || '';
                  const cardRotation = idx % 2 === 0 ? -1 : 1.5;

                  return (
                    <Link
                      key={p.id}
                      href={`/produto/${p.handle}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <motion.div
                        whileHover={{ y: -8, rotate: cardRotation * 0.5 }}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '28px',
                          padding: '16px',
                          border: '2px solid #EAEAEA',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          transform: `rotate(${cardRotation}deg)`
                        }}
                      >
                        <div style={{
                          height: '200px',
                          backgroundColor: '#FDF6E9',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          marginBottom: '15px'
                        }}>
                          <img
                            src={image}
                            alt={p.title}
                            style={{
                              maxWidth: '80%',
                              maxHeight: '80%',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.05))'
                            }}
                          />
                        </div>

                        <h3 style={{
                          fontSize: '1.15rem',
                          fontWeight: '900',
                          color: '#2C3E50',
                          margin: '0 0 6px',
                          lineHeight: '1.2'
                        }}>
                          {p.title}
                        </h3>

                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          color: '#8097a5',
                          textTransform: 'uppercase',
                          marginBottom: '15px'
                        }}>
                          {p.tags.find(t => t.toLowerCase() === 'crianca') ? 'Crianças' : 'Sapatinhos'}
                        </span>

                        <div style={{
                          marginTop: 'auto',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#E06A55' }}>
                            {price}€
                          </span>

                          <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '14px',
                            backgroundColor: '#007396',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <ShoppingBag size={18} />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Tabs: Reviews & FAQ (kept exactly as in the original ProductClient) */}
          <div className="bottom-tabs-container" style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '4rem' }}>
            <div className="bottom-tabs-nav">
              <button className={`bottom-tab-btn ${bottomTab === 'reviews' ? 'active' : ''}`} onClick={() => setBottomTab('reviews')}>Avaliações</button>
              <button className={`bottom-tab-btn ${bottomTab === 'faq' ? 'active' : ''}`} onClick={() => setBottomTab('faq')}>Perguntas frequentes</button>
            </div>

            {bottomTab === 'reviews' && (
              <div className="reviews-content">
                {[
                  { id: 1, name: 'Maria Silva', rating: 5, title: 'Super confortáveis!', date: '10 de Outubro de 2025', text: 'Estou apaixonada por estes sapatos! Nunca pensei que andar \'descalço\' fosse tão confortável. O espaço para os dedos é incrível e sinto as minhas pernas mais leves ao final do dia.' },
                  { id: 2, name: 'João Santos', rating: 5, title: 'Excelente qualidade', date: '5 de Novembro de 2025', text: 'Materiais de primeira. A entrega foi super rápida e o apoio ao cliente impecável. Recomendo vivamente a quem procura saúde para os pés.' },
                  { id: 3, name: 'Ana Pereira', rating: 4, title: 'Muito bons para o dia a dia', date: '20 de Janeiro de 2026', text: 'Uso-os para trabalhar e a diferença nas minhas dores de costas é notável. O design é simples mas elegante.' }
                ].map(review => (
                  <div
                    key={review.id}
                    className="review-item"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      padding: '24px',
                      border: '2px solid #EAEAEA',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.01)',
                      marginBottom: '20px'
                    }}
                  >
                    <div className="review-name">{review.name}</div>
                    <div className="review-header">
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="#F4C466" color="#F4C466" />)}
                      </div>
                      <span className="review-title">{review.title}</span>
                    </div>
                    <div className="review-date">avaliado em {review.date}</div>
                    <div className="review-divider" />
                    <p className="review-text">&ldquo;{review.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}

            {bottomTab === 'faq' && (
              <div className="faq-container">
                <div className="faq-grid">
                  {[
                    { q: 'Como escolher o tamanho correto?', a: 'Recomendamos medir o seu pé em cm e consultar a nossa tabela de tamanhos. Deixe sempre 0.5cm a 1.2cm de folga.' },
                    { q: 'Posso usar sem meias?', a: 'Sim! Os nossos sapatos são feitos com materiais respiráveis ideais para usar com ou sem meias.' },
                    { q: 'São laváveis na máquina?', a: 'Recomendamos lavagem à mão com água fria para preservar a durabilidade dos materiais.' },
                    { q: 'Quanto tempo demora a entrega?', a: 'Para Portugal e Espanha, o envio é expresso e demora entre 2 a 5 dias úteis.' },
                    { q: 'Têm garantia?', a: 'Sim, todos os nossos produtos têm garantia.' },
                    { q: 'Como funciona a devolução?', a: 'Tem 30 dias para devolver ou trocar, desde que o produto não tenha sido usado na rua.' }
                  ].map((item, i) => (
                    <div key={i} className="faq-item">
                      <h4>{item.q}</h4>
                      <p>{item.a}</p>
                    </div>
                  ))}
                </div>
                <div className="support-card">
                  <Headphones className="support-icon" size={48} />
                  <h3>Tem mais alguma questão?</h3>
                  <p>A nossa equipa está disponível para ajudar a encontrar o par perfeito.</p>
                  <Link href="/contactos"><button className="contact-btn">Contacta a equipa de apoio</button></Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

// Playful custom badge component
const PlayfulBadge = ({ children, color = '#FF9F1C', icon: Icon }: { children: React.ReactNode; color?: string; icon?: any }) => (
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
      width: 'fit-content'
    }}
  >
    {Icon && <Icon size={16} color={color} />}
    {children}
  </motion.div>
);

export default ProductClient;
