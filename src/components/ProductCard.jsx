'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const getColorHex = (colorName) => {
  if (!colorName) return '#ddd';
  if (colorName.startsWith('#')) return colorName;
  
  const colorMap = {
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

  const lowerVal = colorName.toLowerCase();
  for (const [key, color] of Object.entries(colorMap)) {
    if (lowerVal.includes(key)) {
      return color;
    }
  }
  return colorName;
};

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string|number} props.price
 * @param {string} props.image
 * @param {string} [props.category]
 * @param {string|number} props.id
 * @param {boolean} [props.isNew]
 * @param {string[]} [props.colors]
 * @param {Record<string, string>} [props.colorImages]
 * @param {string[]} [props.images]
 * @param {boolean} [props.compact]
 */
const ProductCard = ({ title, price, image, category, id, isNew, colors, colorImages, images, compact }) => {
  const [hoveredColorImage, setHoveredColorImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const colorsList = colors || [];
  const imagesMap = colorImages || {};
  const imagesList = images || [];
  
  const activeImage = hoveredColorImage || (isHovered && imagesList.length > 1 ? imagesList[imagesList.length - 1] : image);

  // Format price to Portuguese layout, e.g. "59,90€" instead of "€59.90"
  const formattedPrice = useMemo(() => {
    if (typeof price === 'number') {
      return price.toFixed(2).replace('.', ',') + '€';
    }
    if (typeof price === 'string') {
      const parsed = parseFloat(price);
      if (!isNaN(parsed)) {
        return parsed.toFixed(2).replace('.', ',') + '€';
      }
      return price;
    }
    return price;
  }, [price]);

  return (
    <Link href={`/produto/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '28px',
          padding: '12px',
          position: 'relative',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(44, 62, 80, 0.08)' 
            : '0 10px 30px rgba(44, 62, 80, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '330px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.03)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        
        {/* Image Pod Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '230px',
          backgroundColor: 'transparent',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '16px',
          transition: 'background-color 0.4s ease'
        }}>
          
          {/* "NOVO" Tag inside Image Pod */}
          {isNew && (
            <span style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 2,
              backgroundColor: '#D1ECEB',
              color: '#0F4C5C',
              fontSize: '0.7rem',
              fontWeight: '800',
              padding: '4px 10px',
              borderRadius: '8px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Novo
            </span>
          )}

          {/* Product Image with elegant scale and fade */}
          <motion.img
            key={activeImage}
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.08 }}
            src={activeImage}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              zIndex: 1,
            }}
          />

          {/* Floating Color Swatches inside Image Pod (Bottom Right) */}
          {colorsList.length > 0 && (
            <div 
              style={{ 
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                zIndex: 2,
                display: 'flex', 
                gap: '5px', 
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '6px 8px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            >
              {colorsList.slice(0, 3).map((color, idx) => {
                const hex = getColorHex(color);
                const isWhite = hex.toLowerCase() === '#ffffff' || hex.toLowerCase() === 'white' || hex.toLowerCase() === '#f9f9f9';
                const hasImage = imagesMap[color];
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => {
                      if (hasImage) {
                        setHoveredColorImage(imagesMap[color]);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredColorImage(null);
                    }}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: hex,
                      border: isWhite ? '1px solid #ddd' : '1px solid rgba(0,0,0,0.1)',
                      cursor: hasImage ? 'pointer' : 'default',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseOver={(e) => { if (hasImage) e.currentTarget.style.transform = 'scale(1.2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    title={color}
                  />
                );
              })}
              {colorsList.length > 3 && (
                <span style={{ fontSize: '0.6rem', fontWeight: '800', color: '#8097a5', alignSelf: 'center', paddingLeft: '2px' }}>
                  +{colorsList.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div style={{ padding: '0 8px 8px', display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            {/* Title */}
            <h3 style={{
              fontSize: '1.02rem',
              fontWeight: '800',
              color: '#2C3E50',
              margin: '0',
              lineHeight: '1.3',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1
            }}>
              {title}
            </h3>

            {/* Price */}
            <span style={{
              fontSize: '1.15rem',
              fontWeight: '900',
              color: '#2C3E50',
              letterSpacing: '-0.3px',
              whiteSpace: 'nowrap'
            }}>
              {formattedPrice}
            </span>
          </div>

          {/* Subtitle / Category */}
          <p style={{
            fontSize: '0.8rem',
            color: '#8097a5',
            margin: '4px 0 0 0',
            lineHeight: '1.4',
            fontWeight: '600',
            textTransform: 'capitalize'
          }}>
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Barefoot'}
          </p>

        </div>

      </motion.div>
    </Link>
  );
};

export default ProductCard;