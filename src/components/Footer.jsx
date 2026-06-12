'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-footer-yellow)', padding: '4rem 2rem 2rem', fontFamily: 'var(--font-main, sans-serif)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Main Footer Links & Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>

          {/* Col 1: Branding and Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <img src='/logo.png' alt='Inpe Logo' style={{ height: '55px', width: 'auto', alignSelf: 'flex-start' }} />
            <p style={{ fontWeight: '700', fontSize: '0.9rem', color: '#2c3e50', opacity: 0.85, maxWidth: '280px', lineHeight: 1.6 }}>
              Calçado ético, sustentável e que respeita a anatomia do pé.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
              <a href='https://www.facebook.com/profile.php?id=61556669931835' target='_blank' rel='noopener noreferrer' className="social-btn" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href='https://www.instagram.com/inpe_barefoot/' target='_blank' rel='noopener noreferrer' className="social-btn" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Explorar links */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1.2rem', color: '#2c3e50', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Explorar
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link href='/loja' className="footer-link">Loja</Link></li>
              <li><Link href='/sobre-nos#o-que-e-barefoot' className="footer-link">O que é Barefoot?</Link></li>
              <li><Link href='/sobre-nos' className="footer-link">Nossa História</Link></li>
              <li><Link href='/sobre-nos#faq' className="footer-link">FAQ</Link></li>
              <li><Link href='/contactos' className="footer-link">Contactos</Link></li>
            </ul>
          </div>

          {/* Col 3: Informações links */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1.2rem', color: '#2c3e50', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Informações
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link href='/guia-tamanhos' className="footer-link">Guia de Tamanhos</Link></li>
              <li><Link href='/termos' className="footer-link">Termos e Condições</Link></li>
              <li><Link href='/privacidade' className="footer-link">Política de Privacidade</Link></li>
              <li><Link href='/cookies' className="footer-link">Política de Cookies</Link></li>
              <li>
                <a href='https://www.livroreclamacoes.pt' target='_blank' rel='noopener noreferrer' className="complaints-book-link">
                  Livro de Reclamações
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter sign-up widget */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1.2rem', color: '#2c3e50', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Novidades
            </h3>
            <div className="newsletter-container">
              {!submitted ? (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '0.85rem', color: '#2c3e50', fontWeight: '700', marginBottom: '0.8rem', lineHeight: 1.4 }}>
                    Inscreve-te para receber novidades e campanhas exclusivas.
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="O teu e-mail"
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-submit">
                    Subscrever
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎉</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-winter-blue)', fontWeight: '800', margin: 0 }}>
                    Obrigado por te juntares a nós!
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#2c3e50', fontWeight: '600', marginTop: '0.3rem' }}>
                    Fica atento à tua caixa de entrada.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div style={{
          borderTop: '2px solid rgba(0,0,0,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontSize: '0.82rem',
          fontWeight: 'bold',
          color: '#444'
        }}>
          <div>
            <span>© {new Date().getFullYear()} Inpe. Todos os direitos reservados.</span>
          </div>

          {/* Payment Trust Badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge-payment">MB Way</span>
            <span className="badge-payment">Multibanco</span>
            <span className="badge-payment">Visa</span>
            <span className="badge-payment">Mastercard</span>
          </div>

          <div>
            <span>Feito com ❤️ por <a href="https://enimble.pt" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-winter-blue)' }}>E-Nimble</a></span>
          </div>
        </div>

      </div>

      {/* Embedded Style Block for Premium Micro-interactions */}
      <style jsx="true">{`
          .footer-link {
            position: relative;
            color: #2c3e50;
            font-weight: 700;
            font-size: 0.95rem;
            transition: color 0.3s ease;
            display: inline-block;
            padding: 2px 0;
          }
          .footer-link::after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--color-winter-blue);
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
          }
          .footer-link:hover {
            color: var(--color-winter-blue);
          }
          .footer-link:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
          
          .social-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: white;
            color: var(--color-winter-blue);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .social-btn:hover {
            background: var(--color-winter-blue);
            color: white;
            transform: translateY(-4px) scale(1.1);
            box-shadow: 0 8px 15px rgba(0, 115, 150, 0.2);
          }

          .newsletter-container {
            background: rgba(255, 255, 255, 0.45);
            border-radius: 20px;
            padding: 1.2rem;
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.01);
          }
          .newsletter-input {
            width: 100%;
            padding: 10px 16px;
            border-radius: 30px;
            border: 2px solid transparent;
            outline: none;
            font-family: var(--font-main, sans-serif);
            font-weight: 600;
            font-size: 0.88rem;
            background: white;
            color: #2c3e50;
            transition: all 0.3s ease;
          }
          .newsletter-input:focus {
            border-color: var(--color-winter-blue);
            box-shadow: 0 0 0 4px rgba(0, 115, 150, 0.1);
          }
          .newsletter-submit {
            width: 100%;
            margin-top: 0.6rem;
            padding: 10px;
            border-radius: 30px;
            border: none;
            background: var(--color-winter-blue);
            color: white;
            font-family: var(--font-main, sans-serif);
            font-weight: 800;
            font-size: 0.88rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 10px rgba(0, 115, 150, 0.2);
            transition: all 0.3s ease;
          }
          .newsletter-submit:hover {
            background: #005f7c;
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0, 115, 150, 0.3);
          }
          .newsletter-submit:active {
            transform: translateY(0);
          }

          .badge-payment {
            background: rgba(255, 255, 255, 0.55);
            border-radius: 8px;
            padding: 4px 10px;
            font-size: 0.75rem;
            font-weight: 800;
            color: #2c3e50;
            border: 1px solid rgba(255, 255, 255, 0.8);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            cursor: default;
          }
          .badge-payment:hover {
            background: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          }

          .complaints-book-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #2c3e50;
            font-size: 0.95rem;
            font-weight: 700;
            transition: color 0.2s ease;
          }
          .complaints-book-link:hover {
            color: var(--color-winter-blue);
            text-decoration: underline;
          }
        `}</style>
    </footer>
  );
};

export default Footer;