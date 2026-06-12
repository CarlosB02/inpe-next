'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ title, price, image, category, id }) => {
  return (
    <Link href={`/produto/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: 'white',
          borderRadius: 'clamp(20px, 3vw, 32px)',
          padding: 'clamp(12px, 2vw, 16px)',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 'clamp(340px, 50vh, 420px)',
          overflow: 'hidden'
        }}
      >
        {/* Wishlist Icon */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          style={{
            position: 'absolute',
            top: 'clamp(12px, 2vw, 20px)',
            right: 'clamp(12px, 2vw, 20px)',
            zIndex: 2,
            background: 'none',
            border: 'none',
            color: '#ddd',
            cursor: 'pointer'
          }}
        >
          <Heart size={20} />
        </button>

        {/* Image Container */}
        <div style={{
          flex: '1 1 auto',
          minHeight: '180px',
          maxHeight: '240px',
          position: 'relative',
          marginBottom: 'clamp(12px, 2vw, 20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <motion.img
            whileHover={{ scale: 1.08, rotate: -2 }}
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              zIndex: 1,
              filter: 'drop-shadow(0 10px 18px rgba(255, 255, 255, 0.1))'
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{ padding: '0 8px 8px', display: 'flex', flexDirection: 'column', flex: '0 0 auto' }}>
          <h3 style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
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
            fontSize: 'clamp(0.8rem, 1.5vw, 0.85rem)',
            color: '#8097a5',
            marginBottom: 'clamp(12px, 2vw, 20px)',
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
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: '900',
                color: 'var(--color-accent-brown)',
                letterSpacing: '-0.5px'
              }}>
                €{price}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, backgroundColor: '#007396', color: '#ffffff' }}
              style={{
                width: 'clamp(42px, 4vw, 54px)',
                height: 'clamp(42px, 4vw, 54px)',
                borderRadius: '18px',
                backgroundColor: '#F4C466',
                border: 'none',
                color: '#854931',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(244, 196, 102, 0.3)'
              }}
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;