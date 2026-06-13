'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { openCart, cartCount } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 850);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveRoute = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(href);
  };

  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Loja', href: '/loja' },
    { name: 'Nossa História', href: '/sobre-nos' },
    { name: 'Contactos', href: '/contactos' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: isMobile ? '10px' : (scrolled ? '12px' : '20px'),
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: isMobile ? '0 12px' : '0 2rem',
      display: 'flex',
      justifyContent: 'center',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {/* CSS-only Menu Toggle Checkbox */}
      <input 
        type="checkbox" 
        id="menu-toggle" 
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none', zIndex: -1 }} 
      />

      <div 
        className="header-bar"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          padding: isMobile ? '8px 16px' : (scrolled ? '10px 28px' : '16px 36px'),
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled 
            ? '0 10px 30px -10px rgba(133, 73, 49, 0.12), 0 1px 3px rgba(0, 0, 0, 0.02)' 
            : '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
          border: scrolled 
            ? '1px solid rgba(133, 73, 49, 0.08)' 
            : '1px solid rgba(255, 255, 255, 0.6)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Logo */}
        <Link href="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <img 
            src="/logo.png" 
            alt="Inpe Logo" 
            style={{ 
              height: isMobile ? '32px' : (scrolled ? '38px' : '45px'), 
              width: 'auto',
              transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }} 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: isMobile ? 'none' : 'flex', gap: '8px', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`nav-item ${isActiveRoute(item.href) ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          {/* Search container */}
          <div 
            className="search-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: isSearchOpen ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              border: isSearchOpen ? '1px solid rgba(244, 196, 102, 0.5)' : '1px solid transparent',
              boxShadow: isSearchOpen ? '0 0 10px rgba(244, 196, 102, 0.15)' : 'none',
              borderRadius: '50px',
              padding: isSearchOpen ? '2px 8px' : '0',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: isSearchOpen ? 'var(--color-accent-brown)' : 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                transition: 'color 0.2s ease',
              }}
              aria-label="Pesquisar"
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
              className="search-input"
              style={{
                width: isSearchOpen ? (isMobile ? '110px' : '160px') : '0px',
                opacity: isSearchOpen ? 1 : 0,
                padding: isSearchOpen ? '0 8px 0 4px' : '0',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-main)',
                transition: 'width 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s, padding 0.3s',
              }}
            />
          </div>

          {/* Cart Icon */}
          <button 
            onClick={openCart}
            className="cart-btn"
            style={{
              position: 'relative',
              background: isMobile ? 'none' : 'rgba(244, 196, 102, 0.08)',
              color: 'var(--color-text)',
              width: isMobile ? 'auto' : '42px',
              height: isMobile ? 'auto' : '42px',
              borderRadius: '50%',
              border: isMobile ? 'none' : '1.5px solid rgba(244, 196, 102, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: isMobile ? '8px' : '0',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            aria-label="Carrinho"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Toggle Label (Triggers checkbox natively on tap/click) */}
          <label 
            htmlFor="menu-toggle" 
            className="mobile-toggle-label" 
            style={{ 
              display: isMobile ? 'flex' : 'none', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              padding: '12px',
              marginRight: '-8px',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1002
            }}
          >
            <div className="hamburger-toggle">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </label>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            onClick={() => { 
              if (typeof document !== 'undefined') { 
                const el = document.getElementById('menu-toggle'); 
                if (el) el.checked = false; 
              } 
            }} 
            className={`mobile-nav-item ${isActiveRoute(item.href) ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <style>{`
        /* Desktop navigation links styles */
        .nav-item {
          position: relative;
          color: var(--color-text-light);
          font-weight: 600;
          font-size: 0.92rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
        }

        .nav-item:hover {
          color: var(--color-text);
          background-color: rgba(244, 196, 102, 0.08);
        }

        .nav-item.active {
          color: var(--color-accent-brown);
          font-weight: 700;
          background-color: rgba(133, 73, 49, 0.05);
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: var(--color-accent-brown);
          border-radius: 999px;
          transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), left 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .nav-item.active::after {
          width: 14px;
          left: calc(50% - 7px);
        }

        .nav-item:hover::after {
          width: 20px;
          left: calc(50% - 10px);
        }

        .logo-link:hover {
          transform: scale(1.04);
        }

        /* Cart Button Micro-interactions */
        .cart-btn:hover {
          background-color: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: var(--color-text) !important;
          transform: translateY(-2px);
        }

        .cart-btn:hover svg {
          transform: scale(1.1) rotate(-8deg);
        }

        .cart-btn:active {
          transform: translateY(0);
        }

        /* Cart Badge Pulse keyframes */
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: linear-gradient(135deg, var(--color-accent-brown) 0%, #a66247 100%);
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(133, 73, 49, 0.25);
          animation: cart-badge-pulse 2.5s infinite;
        }

        @keyframes cart-badge-pulse {
          0% { box-shadow: 0 0 0 0 rgba(133, 73, 49, 0.5); }
          70% { box-shadow: 0 0 0 6px rgba(133, 73, 49, 0); }
          100% { box-shadow: 0 0 0 0 rgba(133, 73, 49, 0); }
        }

        /* Mobile Hamburger icon styles */
        .hamburger-toggle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 22px;
          height: 15px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.3s ease;
        }

        .hamburger-toggle span {
          display: block;
          width: 100%;
          height: 2px;
          background-color: var(--color-text);
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease, background-color 0.3s ease;
        }

        #menu-toggle:checked ~ div .hamburger-toggle span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
          background-color: var(--color-accent-brown);
        }

        #menu-toggle:checked ~ div .hamburger-toggle span:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }

        #menu-toggle:checked ~ div .hamburger-toggle span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
          background-color: var(--color-accent-brown);
        }

        /* Mobile menu slide down fade in transition */
        .mobile-menu-overlay {
          position: fixed;
          top: 72px;
          left: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem 1.5rem;
          box-shadow: 0 15px 35px rgba(133, 73, 49, 0.12), 0 1px 3px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
          z-index: 999;
          border: 1px solid rgba(255, 255, 255, 0.5);
          transform: translateY(-20px) scale(0.95);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        #menu-toggle:checked ~ .mobile-menu-overlay {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-item {
          padding: 12px;
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--color-text);
          border-radius: 12px;
          transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .mobile-nav-item:hover, .mobile-nav-item.active {
          background-color: rgba(244, 196, 102, 0.12);
          color: var(--color-accent-brown);
          transform: scale(1.02);
        }
      `}</style>
    </header>
  );
};

export default Header;