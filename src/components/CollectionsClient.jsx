'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import Layout from './Layout';
import products from '@/data/products';

const CollectionsClient = ({ category }) => {
  const [filters, setFilters] = useState({
    categories: category && category !== 'todos' ? [category] : [],
    subcategories: [],
    sizes: [],
    colors: [],
    price: { min: 0, max: 200 }
  });

  const filteredProducts = products.filter(product => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
    if (filters.subcategories.length > 0 && !filters.subcategories.includes(product.subcategory)) return false;
    if (filters.sizes.length > 0) {
      let hasSize = false;
      if (product.sizes) {
        if (filters.sizes.includes('criança') && product.sizes.some(s => s <= 34)) hasSize = true;
        if (filters.sizes.includes('adulto') && product.sizes.some(s => s >= 35)) hasSize = true;
      }
      if (!hasSize) return false;
    }
    if (filters.colors.length > 0) {
      const hasColor = product.colors && product.colors.some(c => filters.colors.includes(c));
      if (!hasColor) return false;
    }
    const price = parseFloat(product.price);
    if (price < filters.price.min || price > filters.price.max) return false;
    return true;
  });

  return (
    <Layout>
      <div style={{ padding: '8rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 900 }}>Nossas Coleções</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Descubra o conforto natural para toda a família.</p>
        </div>
        <div className="collections-grid">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '1rem', color: '#666' }}>Mostrando {filteredProducts.length} produtos</div>
            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <div key={product.id} style={{ height: '100%' }}>
                    <ProductCard title={product.name} price={product.price} image={product.image} category={product.subcategory || product.category} id={product.id} />
                  </div>
                ))}
              </AnimatePresence>
              {filteredProducts.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#888' }}>
                  <p>Nenhum produto encontrado com estes filtros.</p>
                  <button onClick={() => setFilters({ categories: [], subcategories: [], sizes: [], colors: [], price: { min: 0, max: 200 } })} style={{ marginTop: '1rem', padding: '10px 20px', background: 'var(--color-teal)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Limpar Filtros</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionsClient;
