'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
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
      width: '100%',
      zIndex: 100,
      padding: isMobile ? '0 10px' : '0 2rem',
      display: 'flex',
      justifyContent: 'center',
      transition: 'transform 0.3s ease-in-out',
      transform: isVisible ? 'translateY(0)' : 'translateY(-200%)',
    }}>
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
        <nav className="desktop-nav" style={{ display: 'flex', gap: '24px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555', textTransform: 'uppercase' }}>
          <Link href="/" className="nav-item">Início</Link>
          <Link href="/loja" className="nav-item">Loja</Link>
          <Link href="/historia" className="nav-item">Nossa História</Link>
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
              onKeyDown={(e) => { if (e.key === 'Escape') setIsSearchOpen(false); }}
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

          <button style={{
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
          }}>
            <ShoppingBag size={20} />
          </button>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="mobile-toggle" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '2rem',
          right: '2rem',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <Link href="/" onClick={() => setIsOpen(false)}>Início</Link>
          <Link href="/loja" onClick={() => setIsOpen(false)}>Loja</Link>
          <Link href="/historia" onClick={() => setIsOpen(false)}>Nossa História</Link>
          <Link href="/contactos" onClick={() => setIsOpen(false)}>Contactos</Link>
        </div>
      )}

      <style>{`
        .nav-item:hover { color: var(--color-primary); }
        @media (max-width: 850px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;