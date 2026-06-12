'use client';
import React from 'react';
import Link from 'next/link';

const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-footer-yellow)', padding: '4rem 2rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4rem', marginBottom: '4rem' }}>
        <div style={{ flex: '1 1 300px' }}>
          <img src='/logo.png' alt='Inpe Logo' style={{ height: '60px', width: 'auto', marginBottom: '1rem' }} />
          <p style={{ fontWeight: 'bold', fontSize: '0.9rem', maxWidth: '300px', lineHeight: 1.6 }}>
            Calçado ético, sustentável e que respeita a anatomia do pé.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <a href='https://www.facebook.com/profile.php?id=61556669931835' target='_blank' rel='noopener noreferrer' style={{ width: '40px', height: '40px', background: 'var(--color-winter-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><FacebookIcon /></a>
            <a href='https://www.instagram.com/inpe_barefoot/' target='_blank' rel='noopener noreferrer' style={{ width: '40px', height: '40px', background: 'var(--color-winter-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><InstagramIcon /></a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#333' }}>Loja</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: 'bold', fontSize: '0.9rem' }}>
              <li><Link href='#'>Mais Vendidos</Link></li>
              <li><Link href='#'>Nova Coleção</Link></li>
              <li><Link href='#'>Crianças</Link></li>
              <li><Link href='#'>Adultos</Link></li>
              <li><Link href='/design2' style={{ color: 'var(--color-winter-blue)', textDecoration: 'underline' }}>Design 2 (Nova Versão)</Link></li>
              <li><Link href='/loja2' style={{ color: 'var(--color-winter-blue)', textDecoration: 'underline' }}>Loja Design 2 (Nova Versão)</Link></li>
              <li><Link href='/historia2' style={{ color: 'var(--color-winter-blue)', textDecoration: 'underline' }}>História Design 2 (Nova Versão)</Link></li>
              <li><Link href='/extras' style={{ color: 'var(--color-winter-blue)', textDecoration: 'underline' }}>Extras</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#333' }}>Ajuda</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: 'bold', fontSize: '0.9rem' }}>
              <li><Link href='#'>Guia de Tamanhos</Link></li>
              <li><Link href='#'>Envios e Devoluções</Link></li>
              <li><Link href='/contactos'>Contactos</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontSize: '0.8rem', fontWeight: 'bold', color: '#444' }}>
        <span>© 2026 Inpe. Todos os direitos reservados.</span>
        <span>Feito com amor por <span style={{ color: 'var(--color-winter-blue)' }}>E-Nimble</span></span>
      </div>
    </footer>
  );
};
export default Footer;