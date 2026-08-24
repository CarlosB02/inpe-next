'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { getColorStyle, normalizeColorName } from '../lib/colors';

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
 * @param {string|number} [props.originalPrice]
 * @param {({url: string, altText?: string}[]|string[])} [props.images]
 * @param {boolean} [props.compact]
 * @param {React.ReactNode} [props.children]
 */
const ProductCard = ({ title, price, originalPrice, image, category, id, isNew, colors, colorImages, images, compact, children }) => {
  const [hoveredColorImage, setHoveredColorImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const colorsList = colors || [];
  const imagesMap = colorImages || {};
  const rawImages = images || [];
  
  const imagesList = useMemo(() => {
    return rawImages.map(img => {
      if (typeof img === 'string') {
        return { url: img, altText: '' };
      }
      return { url: img?.url || '', altText: img?.altText || '' };
    });
  }, [rawImages]);

  const hoverImage = useMemo(() => {
    if (imagesList.length <= 1) return image;

    const cleanStr = (str) => {
      if (!str) return '';
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    // Find the default image object to inspect its alt text
    const defaultImageObj = imagesList.find(img => img.url === image);
    const defaultAlt = defaultImageObj ? cleanStr(defaultImageObj.altText) : '';

    // Try to detect which color the default image belongs to
    const activeColor = colorsList.find(color =>
      defaultAlt && defaultAlt.includes(cleanStr(color))
    );

    if (activeColor) {
      const colorNorm = cleanStr(activeColor);
      // Filter images that match the active color
      const colorFiltered = imagesList.filter(img =>
        img.altText && cleanStr(img.altText).includes(colorNorm)
      );
      // If this color has more than 1 image, show the last one on hover
      if (colorFiltered.length > 1) {
        return colorFiltered[colorFiltered.length - 1].url;
      }
      // If this color only has 1 image (or 0), stay on the same image
      return image;
    }

    // No color detected in default image alt text: fallback to second image if available
    // but only if it doesn't seem to belong to a different color
    const secondImg = imagesList.find(img => img.url !== image);
    if (secondImg && !secondImg.altText) return secondImg.url;

    // If second image belongs to a color we can identify, stay on current image
    const secondAlt = secondImg ? cleanStr(secondImg.altText) : '';
    const secondBelongsToOtherColor = colorsList.some(color =>
      secondAlt && secondAlt.includes(cleanStr(color))
    );
    if (secondBelongsToOtherColor) return image;

    return secondImg ? secondImg.url : image;
  }, [imagesList, image, colorsList]);

  const activeImage = hoveredColorImage || (isHovered ? hoverImage : image);

  const hasDiscount = useMemo(() => {
    if (!originalPrice) return false;
    const pVal = typeof price === 'number' ? price : parseFloat(price);
    const oVal = typeof originalPrice === 'number' ? originalPrice : parseFloat(originalPrice);
    return !isNaN(pVal) && !isNaN(oVal) && oVal > pVal;
  }, [price, originalPrice]);

  const discountPercentage = useMemo(() => {
    if (!hasDiscount) return 0;
    const pVal = typeof price === 'number' ? price : parseFloat(price);
    const oVal = typeof originalPrice === 'number' ? originalPrice : parseFloat(originalPrice);
    return Math.round(((oVal - pVal) / oVal) * 100);
  }, [price, originalPrice, hasDiscount]);

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

  const formattedOriginalPrice = useMemo(() => {
    if (!originalPrice) return '';
    if (typeof originalPrice === 'number') {
      return originalPrice.toFixed(2).replace('.', ',') + '€';
    }
    if (typeof originalPrice === 'string') {
      const parsed = parseFloat(originalPrice);
      if (!isNaN(parsed)) {
        return parsed.toFixed(2).replace('.', ',') + '€';
      }
      return originalPrice;
    }
    return originalPrice;
  }, [originalPrice]);

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

          {/* Discount/Sale Tag */}
          {hasDiscount && (
            <span style={{
              position: 'absolute',
              top: '12px',
              left: isNew ? '72px' : '12px',
              zIndex: 2,
              backgroundColor: '#FCE8E6',
              color: '#D93025',
              fontSize: '0.7rem',
              fontWeight: '800',
              padding: '4px 10px',
              borderRadius: '8px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              -{discountPercentage}%
            </span>
          )}

          {/* Product Image with elegant scale and fade */}
          <motion.img
            key={activeImage}
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.08 }}
            src={activeImage || null}
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
                const styleObj = getColorStyle(color);
                const normalized = normalizeColorName(color);
                const colorImg = imagesMap[color] || imagesMap[normalized] || imagesMap[color.toLowerCase()];
                const hasImage = Boolean(colorImg);
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => {
                      if (hasImage) {
                        setHoveredColorImage(colorImg);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredColorImage(null);
                    }}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: styleObj.background,
                      border: styleObj.isWhite ? '1px solid #ddd' : '1px solid rgba(0,0,0,0.1)',
                      cursor: hasImage ? 'pointer' : 'default',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseOver={(e) => { if (hasImage) e.currentTarget.style.transform = 'scale(1.2)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    title={normalized || color}
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              {hasDiscount && (
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#8097a5',
                  textDecoration: 'line-through',
                  lineHeight: '1',
                  marginBottom: '2px'
                }}>
                  {formattedOriginalPrice}
                </span>
              )}
              <span style={{
                fontSize: '1.15rem',
                fontWeight: '900',
                color: hasDiscount ? '#D93025' : '#2C3E50',
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap'
              }}>
                {formattedPrice}
              </span>
            </div>
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

          {children && (
            <div 
              style={{ marginTop: 'auto', paddingTop: '12px' }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            >
              {children}
            </div>
          )}

        </div>

      </motion.div>
    </Link>
  );
};

export default ProductCard;