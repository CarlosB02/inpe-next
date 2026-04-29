'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ title, price, image, category, id, compact = false }) => (
  <motion.div
    whileHover={{ y: compact ? -4 : -8 }}
    style={{ backgroundColor: 'white', borderRadius: compact ? '16px' : '24px', padding: compact ? '12px' : '20px', position: 'relative', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', color: 'inherit', height: '100%', minHeight: compact ? '260px' : '340px' }}
  >
    <div style={{ height: compact ? '120px' : '180px', backgroundColor: 'white', borderRadius: compact ? '12px' : '16px', marginBottom: compact ? '10px' : '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
    </div>
    <h3 style={{ fontSize: compact ? '1rem' : '1.25rem', fontWeight: '800', color: '#1f2937', marginBottom: '4px', lineHeight: '1.2' }}>{title}</h3>
    <p style={{ fontSize: compact ? '0.75rem' : '0.85rem', color: '#9ca3af', marginBottom: compact ? '10px' : '16px', lineHeight: '1.4' }}>Conforto e liberdade para os teus pés</p>
    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: compact ? '1.2rem' : '1.5rem', fontWeight: 'bold', color: '#854931' }}>€{price}</span>
      <button style={{ width: compact ? '36px' : '52px', height: compact ? '36px' : '52px', borderRadius: '50%', backgroundColor: '#f7c969', border: 'none', color: '#854931', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: compact ? '1.25rem' : '1.75rem', transition: 'transform 0.2s' }}>+</button>
    </div>
  </motion.div>
);

export default ProductCard;