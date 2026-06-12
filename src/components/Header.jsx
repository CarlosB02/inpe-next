'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { openCart, cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 850);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: isMobile ? '8px' : '20px',
      left: 0,
      right: 0,
      zIndex: 100,
      padding: isMobile ? '0 10px' : '0 2rem',
      display: 'flex',
      justifyContent: 'center',
      transition: 'transform 0.3s ease-in-out',
      transform: 'translateY(0)',
    }}>
      {/* CSS-only Menu Toggle Checkbox */}
      <input type="checkbox" id="menu-toggle" style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none', zIndex: -1 }} />

      <div style={{
        backgroundColor: 'white',
        borderRadius: '9999px',
        padding: isMobile ? '6px 16px' : '12px 32px',
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Inpe Logo" style={{ height: isMobile ? '32px' : '45px', width: 'auto' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: isMobile ? 'none' : 'flex', gap: '24px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555', textTransform: 'uppercase' }}>
          <Link href="/" className="nav-item">Início</Link>
          <Link href="/loja" className="nav-item">Loja</Link>
          <Link href="/sobre-nos" className="nav-item">Nossa História</Link>
          <Link href="/contactos" className="nav-item">Contactos</Link>
        </nav>

        {/* Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isSearchOpen ? 'var(--color-background)' : 'transparent',
            borderRadius: '50px',
            padding: isSearchOpen ? '4px 8px' : '0',
            transition: 'all 0.3s ease',
            border: isSearchOpen ? '1px solid #eee' : '1px solid transparent'
          }}>
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: isSearchOpen ? 'var(--color-primary)' : '#555',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%'
              }}
            >
              <Search size={20} />
            </button>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { 
                if (e.key === 'Escape') setIsSearchOpen(false); 
                if (e.key === 'Enter' && searchQuery.trim() !== '') {
                  window.location.href = `/loja?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              onBlur={() => { if (searchQuery.trim() === '') setIsSearchOpen(false); }}
              style={{
                width: isSearchOpen ? '150px' : '0px',
                opacity: isSearchOpen ? 1 : 0,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                padding: isSearchOpen ? '0 8px 0 4px' : '0',
                transition: 'width 0.3s, opacity 0.2s, padding 0.3s',
                color: 'var(--color-text)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button 
            onClick={openCart}
            style={{
              position: 'relative',
              background: isMobile ? 'none' : 'var(--color-primary)',
              color: isMobile ? '#555' : 'white',
              width: isMobile ? 'auto' : '40px',
              height: isMobile ? 'auto' : '40px',
              borderRadius: '50%',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: isMobile ? '8px' : '0'
            }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: isMobile ? '0px' : '-4px',
                right: isMobile ? '-4px' : '-4px',
                backgroundColor: 'var(--color-accent-brown)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Toggle Label (Triggers checkbox natively on tap/click) */}
          <label 
            htmlFor="menu-toggle" 
            className="mobile-toggle" 
            onClick={() => {}}
            style={{ 
              display: isMobile ? 'flex' : 'none', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              padding: '12px',
              marginRight: '-12px',
              color: '#2C3E50',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 101
            }}
          >
            <span className="menu-icon-open" style={{ display: 'flex', alignItems: 'center' }}><Menu size={24} /></span>
            <span className="menu-icon-close" style={{ display: 'none', alignItems: 'center' }}><X size={24} /></span>
          </label>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay" style={{
        position: 'fixed',
        top: '70px',
        left: '16px',
        right: '16px',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '2rem 1.5rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
        display: 'none', // Controlled by CSS checkbox state
        flexDirection: 'column',
        gap: '1.2rem',
        textAlign: 'center',
        zIndex: 1000,
        border: '1px solid #f0f0f0'
      }}>
        {/* Unchecking toggle when clicking link to close overlay */}
        <Link href="/" onClick={() => { if (typeof document !== 'undefined') { const el = document.getElementById('menu-toggle'); if (el) el.checked = false; } }} style={{ padding: '8px', fontWeight: '800', color: '#2C3E50', fontSize: '1.1rem' }}>Início</Link>
        <Link href="/loja" onClick={() => { if (typeof document !== 'undefined') { const el = document.getElementById('menu-toggle'); if (el) el.checked = false; } }} style={{ padding: '8px', fontWeight: '800', color: '#2C3E50', fontSize: '1.1rem' }}>Loja</Link>
        <Link href="/sobre-nos" onClick={() => { if (typeof document !== 'undefined') { const el = document.getElementById('menu-toggle'); if (el) el.checked = false; } }} style={{ padding: '8px', fontWeight: '800', color: '#2C3E50', fontSize: '1.1rem' }}>Nossa História</Link>
        <Link href="/contactos" onClick={() => { if (typeof document !== 'undefined') { const el = document.getElementById('menu-toggle'); if (el) el.checked = false; } }} style={{ padding: '8px', fontWeight: '800', color: '#2C3E50', fontSize: '1.1rem' }}>Contactos</Link>
      </div>

      <style>{`
        .nav-item:hover { color: var(--color-primary); }

        .mobile-toggle span, .mobile-toggle svg {
          pointer-events: none !important;
        }

        #menu-toggle:checked ~ .mobile-menu-overlay {
          display: flex !important;
        }
        #menu-toggle:checked ~ div .mobile-toggle .menu-icon-open {
          display: none !important;
        }
        #menu-toggle:checked ~ div .mobile-toggle .menu-icon-close {
          display: flex !important;
        }
      `}</style>
    </header>
  );
};

export default Header;