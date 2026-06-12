'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, closeCart, updateItem, removeItem, loading } = useCart();

  const cartLines = cart?.lines.edges.map(edge => edge.node) || [];
  const subtotal = cart?.cost.subtotalAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'black',
              zIndex: 999,
              cursor: 'pointer'
            }}
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '450px',
              backgroundColor: 'white',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.08)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "var(--font-main, 'Nunito', sans-serif)"
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={22} color="var(--color-primary, #F4C466)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-text, #2c3e50)', margin: 0 }}>
                  O teu Carrinho
                </h2>
              </div>
              <button
                onClick={closeCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <X size={20} />
              </button>

              {/* Loader indicator bar */}
              {loading && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '3px',
                  backgroundColor: 'var(--color-primary, #F4C466)',
                  width: '100%',
                  animation: 'shimmer 1.5s infinite linear'
                }} />
              )}
            </div>

            {/* Scrollable Cart Items List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {cartLines.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                  gap: '1rem',
                  color: '#888'
                }}>
                  <ShoppingBag size={48} style={{ opacity: 0.3 }} />
                  <p style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#666' }}>
                    O teu carrinho está vazio.
                  </p>
                  <button
                    onClick={closeCart}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '50px',
                      backgroundColor: 'var(--color-primary, #F4C466)',
                      color: 'var(--color-text, #2c3e50)',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Ir às compras
                  </button>
                </div>
              ) : (
                cartLines.map(line => {
                  const image = line.merchandise.image || line.merchandise.product.images.edges[0]?.node;
                  const price = parseFloat(line.merchandise.price.amount);
                  const total = parseFloat(line.cost.totalAmount.amount);
                  const currency = line.merchandise.price.currencyCode === 'EUR' ? '€' : line.merchandise.price.currencyCode;

                  return (
                    <div
                      key={line.id}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        paddingBottom: '1.5rem',
                        borderBottom: '1px solid #f9f9f9'
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        backgroundColor: '#f9f9f9',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || line.merchandise.product.title}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        ) : (
                          <ShoppingBag size={24} style={{ opacity: 0.2 }} />
                        )}
                      </div>

                      {/* Info & Quantity controls */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Link
                          href={`/produto/${line.merchandise.product.handle}`}
                          onClick={closeCart}
                          style={{
                            fontWeight: '800',
                            fontSize: '0.95rem',
                            color: 'var(--color-text, #2c3e50)',
                            margin: 0,
                            lineHeight: 1.2
                          }}
                        >
                          {line.merchandise.product.title}
                        </Link>
                        {line.merchandise.title !== 'Default Title' && (
                          <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600 }}>
                            Tamanho: {line.merchandise.title}
                          </span>
                        )}
                        <span style={{ fontWeight: 'bold', color: 'var(--color-accent-brown, #854931)', fontSize: '0.9rem' }}>
                          {price.toFixed(2)} {currency}
                        </span>

                        {/* Quantity picker */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '8px',
                          gap: '12px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1.5px solid #eee',
                            borderRadius: '30px',
                            padding: '2px'
                          }}>
                            <button
                              onClick={() => updateItem(line.id, line.quantity - 1)}
                              disabled={loading}
                              style={{
                                border: 'none',
                                background: 'none',
                                padding: '4px',
                                display: 'flex',
                                cursor: 'pointer',
                                color: '#555'
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{ width: '24px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => updateItem(line.id, line.quantity + 1)}
                              disabled={loading}
                              style={{
                                border: 'none',
                                background: 'none',
                                padding: '4px',
                                display: 'flex',
                                cursor: 'pointer',
                                color: '#555'
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(line.id)}
                            disabled={loading}
                            style={{
                              border: 'none',
                              background: 'none',
                              color: '#999',
                              cursor: 'pointer',
                              display: 'flex',
                              padding: '6px',
                              borderRadius: '50%',
                              transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#d32f2f'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer containing Checkout details */}
            {cartLines.length > 0 && subtotal && (
              <div style={{
                padding: '2rem',
                borderTop: '1px solid #eee',
                backgroundColor: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  color: 'var(--color-text, #2c3e50)'
                }}>
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--color-accent-brown, #854931)', fontSize: '1.25rem' }}>
                    {parseFloat(subtotal.amount).toFixed(2)} {subtotal.currencyCode === 'EUR' ? '€' : subtotal.currencyCode}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', margin: 0, lineHeight: 1.4 }}>
                  Taxas de envio e descontos calculados na página seguinte (checkout seguro da Shopify).
                </p>

                <button
                  onClick={() => {
                    if (cart?.checkoutUrl) {
                      window.location.href = cart.checkoutUrl;
                    }
                  }}
                  disabled={loading}
                  style={{
                    backgroundColor: 'var(--color-winter-blue, #007396)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '50px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(0, 115, 150, 0.25)',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  Finalizar Compra <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>

          {/* Shimmer keyframes injected dynamically */}
          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
