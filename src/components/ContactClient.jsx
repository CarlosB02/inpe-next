'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import Layout from './Layout';

const FacebookIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const ContactClient = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const infoItemStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start'
  };

  const iconContainerStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(235, 175, 108, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  const labelStyle = {
    color: '#999',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
    fontWeight: 600
  };

  const valueStyle = {
    color: 'var(--color-text)',
    fontSize: '1.1rem',
    textDecoration: 'none',
    fontWeight: 500
  };

  return (
    <Layout>
      <div style={{
        backgroundColor: '#FDFBF7',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? 'calc(80px + 1.5rem) 1rem 2rem' : 'calc(80px + 4rem) 2rem 4rem',
        marginTop: '-80px'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: isMobile ? '3rem' : '6rem',
          alignItems: 'start'
        }}>
          {/* Left Side - Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ color: 'var(--color-primary)', fontSize: isMobile ? '1.8rem' : '2.5rem', marginBottom: isMobile ? '1rem' : '2rem', fontWeight: 'normal' }}>
              Estamos sempre disponíveis!
            </h1>
            <p style={{ color: '#666', marginBottom: isMobile ? '2rem' : '4rem', lineHeight: 1.8, fontSize: isMobile ? '1rem' : '1.1rem', maxWidth: '450px' }}>
              Tem dúvidas sobre o tamanho ideal ou sobre os nossos materiais? Estamos aqui para ajudar em cada passo da sua jornada barefoot.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2.5rem' }}>
              <div style={infoItemStyle}>
                <div style={iconContainerStyle}><Mail size={24} color="var(--color-primary)" /></div>
                <div><h3 style={labelStyle}>Email</h3><a href="mailto:geral@inpe.pt" style={valueStyle}>geral@inpe.pt</a></div>
              </div>
              <div style={infoItemStyle}>
                <div style={iconContainerStyle}><MapPin size={24} color="var(--color-primary)" /></div>
                <div><h3 style={labelStyle}>Morada</h3><p style={valueStyle}>Morada a definir</p></div>
              </div>
              <div style={infoItemStyle}>
                <div style={iconContainerStyle}><InstagramIcon size={24} color="var(--color-primary)" /></div>
                <div>
                  <h3 style={labelStyle}>Redes Sociais</h3>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <a href="https://www.facebook.com/profile.php?id=61556669931835" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text)', display: 'flex', alignItems: 'center' }} aria-label="Facebook">
                      <FacebookIcon size={24} />
                    </a>
                    <a href="https://www.instagram.com/inpe_barefoot/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text)', display: 'flex', alignItems: 'center' }} aria-label="Instagram">
                      <InstagramIcon size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ backgroundColor: 'white', padding: isMobile ? '1.5rem' : '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: isMobile ? '1.2rem' : '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', color: '#333', fontWeight: 500, fontSize: '0.95rem' }}>Nome</label>
              <input type="text" placeholder="Seu nome" style={{ width: '100%', padding: isMobile ? '12px 16px' : '16px 20px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#f9f9f9', fontFamily: 'inherit', fontSize: '1rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', color: '#333', fontWeight: 500, fontSize: '0.95rem' }}>Email</label>
              <input type="email" placeholder="seu@email.com" style={{ width: '100%', padding: isMobile ? '12px 16px' : '16px 20px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#f9f9f9', fontFamily: 'inherit', fontSize: '1rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.8rem', color: '#333', fontWeight: 500, fontSize: '0.95rem' }}>Mensagem</label>
              <textarea rows={4} placeholder="Como podemos ajudar?" style={{ width: '100%', padding: isMobile ? '12px 16px' : '16px 20px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#f9f9f9', fontFamily: 'inherit', fontSize: '1rem', outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="button" style={{ padding: '16px 32px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginTop: '1rem' }}>
              <span>Enviar Mensagem</span><Send size={18} />
            </button>
          </motion.form>
        </div>

        {/* Map Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ width: '100%', maxWidth: '1200px', height: isMobile ? '300px' : '450px', marginTop: isMobile ? '3rem' : '6rem', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Vouzela&t=&z=13&ie=UTF8&iwloc=&output=embed" title="Localização Vouzela"></iframe>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ContactClient;
