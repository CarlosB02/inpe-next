'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ title, price, image, category, id, compact = false }) => {
  // Determine a soft background color based on ID or category
  const bgColors = ['#FDF6E9', '#F0F7F9', '#F9F0F4', '#F4F9F0'];
  const softBg = bgColors[id % bgColors.length];

  return (
    <Link href={`/produto/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        style={{ 
          backgroundColor: 'white', 
          borderRadius: compact ? '20px' : '32px', 
          padding: compact ? '12px' : '16px', 
          position: 'relative', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          minHeight: compact ? '280px' : '420px',
          border: '1px solid rgba(0,0,0,0.03)',
          overflow: 'hidden'
        }}
      >
        {/* Wishlist Icon */}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          style={{
            position: 'absolute',
            top: compact ? '12px' : '20px',
            right: compact ? '12px' : '20px',
            zIndex: 2,
            background: 'none',
            border: 'none',
            color: '#ddd',
            cursor: 'pointer'
          }}
        >
          <Heart size={20} />
        </button>

        {/* Image Container with Organic Shape */}
        <div style={{ 
          height: compact ? '140px' : '240px', 
          position: 'relative',
          borderRadius: compact ? '16px' : '24px', 
          marginBottom: compact ? '12px' : '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden',
          backgroundColor: softBg,
          transition: 'background-color 0.3s ease'
        }}>
          {/* Subtle decorative blob */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              backgroundColor: 'rgba(255,255,255,0.4)',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              zIndex: 0
            }}
          />
          
          <motion.img 
            whileHover={{ scale: 1.1, rotate: -3 }}
            src={image} 
            alt={title} 
            style={{ 
              width: '85%', 
              height: '85%', 
              objectFit: 'contain', 
              zIndex: 1,
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))'
            }} 
          />
        </div>

        {/* Product Info */}
        <div style={{ padding: '0 8px 8px' }}>
          <h3 style={{ 
            fontSize: compact ? '1.05rem' : '1.35rem', 
            fontWeight: '800', 
            color: 'var(--color-text)', 
            marginBottom: '6px', 
            lineHeight: '1.2',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>
          
          <p style={{ 
            fontSize: compact ? '0.75rem' : '0.85rem', 
            color: '#8097a5', 
            marginBottom: compact ? '12px' : '20px', 
            lineHeight: '1.4',
            fontWeight: '500'
          }}>
            Sensação de caminhar descalço
          </p>

          <div style={{ 
            marginTop: 'auto', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                fontSize: compact ? '1.1rem' : '1.6rem', 
                fontWeight: '900', 
                color: 'var(--color-accent-brown)',
                letterSpacing: '-0.5px'
              }}>
                €{price}
              </span>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, backgroundColor: 'var(--color-winter-blue)', color: 'white' }}
              style={{ 
                width: compact ? '38px' : '54px', 
                height: compact ? '38px' : '54px', 
                borderRadius: '18px', 
                backgroundColor: 'var(--color-primary)', 
                border: 'none', 
                color: 'var(--color-accent-brown)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(244, 196, 102, 0.3)'
              }}
            >
              <ShoppingCart size={compact ? 18 : 24} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;