'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Sparkles, Smile, Heart, ExternalLink } from 'lucide-react';
import Layout from './Layout';

const FacebookIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

// Playful custom badge component
const PlayfulBadge = ({ children, color = '#FF9F1C', icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 18px',
      backgroundColor: 'white',
      borderRadius: '30px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
      border: `2px dashed ${color}`,
      color: '#2C3E50',
      fontWeight: '800',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '1.5rem'
    }}
  >
    {Icon && <Icon size={16} color={color} />}
    {children}
  </motion.div>
);

const ContactClient = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <Layout backgroundColor="#FFFDF9">
      <div style={{ backgroundColor: '#FFFDF9', minHeight: '100vh', overflowX: 'hidden', paddingBottom: 'clamp(3rem, 8vw, 6rem)' }}>

        {/* HERO INTRO */}
        <section style={{
          backgroundColor: '#FFFDF9',
          padding: 'clamp(5rem, 12vw, 8rem) clamp(1rem, 5vw, 2rem) clamp(2rem, 6vw, 4rem)',
          textAlign: 'center',
          position: 'relative'
        }}>

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 7vw, 3.8rem)',
              fontWeight: '900',
              color: '#2C3E50',
              lineHeight: 1.1,
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              Sempre Juntos, <br />
              <span style={{ color: '#F4C466' }}>Em Cada Passo!</span>
            </h1>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 5vw, 5rem) clamp(1rem, 5vw, 2rem) 2rem'
        }}>
          <div className="contact-grid" style={{
            display: 'grid',
            alignItems: 'start'
          }}>

            {/* Left Side: Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 4vw, 1.8rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', fontWeight: '900', color: '#2C3E50', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Estamos sempre disponíveis!
              </h2>

              {/* Email Card */}
              <motion.a
                href="mailto:geral@inpe.pt"
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  display: 'flex',
                  gap: 'clamp(1rem, 3vw, 1.5rem)',
                  padding: 'clamp(1.2rem, 4vw, 2rem)',
                  borderRadius: '28px',
                  backgroundColor: '#E0F2F1',
                  border: '3px solid #FFF',
                  boxShadow: '0 10px 30px rgba(159,226,221,0.15)',
                  textDecoration: 'none',
                  color: 'inherit',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: 'clamp(48px, 12vw, 60px)',
                  height: 'clamp(48px, 12vw, 60px)',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#007396',
                  flexShrink: 0
                }}>
                  <Mail size={24} />
                </div>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <h3 style={{ fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: '900', color: '#007396', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Envia um Email</h3>
                  <span style={{ fontSize: 'clamp(1rem, 3.8vw, 1.25rem)', fontWeight: '800', color: '#2C3E50', wordBreak: 'break-all' }}>geral@inpe.pt</span>
                </div>
              </motion.a>

              {/* Address Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  display: 'flex',
                  gap: 'clamp(1rem, 3vw, 1.5rem)',
                  padding: 'clamp(1.2rem, 4vw, 2rem)',
                  borderRadius: '28px',
                  backgroundColor: '#FFF3E0',
                  border: '3px solid #FFF',
                  boxShadow: '0 10px 30px rgba(255,159,28,0.1)',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: 'clamp(48px, 12vw, 60px)',
                  height: 'clamp(48px, 12vw, 60px)',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#854931',
                  flexShrink: 0
                }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: '900', color: '#854931', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Visita a nossa Loja</h3>
                  <p style={{ fontSize: 'clamp(0.9rem, 3.2vw, 1.05rem)', fontWeight: '800', color: '#2C3E50', margin: 0, lineHeight: 1.4 }}>
                    Av. Sá carneiro 224, 1º andar 2ª loja dto<br />3660-428 S. Pedro do Sul
                  </p>
                </div>
              </motion.div>

              {/* Social Media Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  display: 'flex',
                  gap: 'clamp(1rem, 3vw, 1.5rem)',
                  padding: 'clamp(1.2rem, 4vw, 2rem)',
                  borderRadius: '28px',
                  backgroundColor: '#FFEBEE',
                  border: '3px solid #FFF',
                  boxShadow: '0 10px 30px rgba(224,106,85,0.1)',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: 'clamp(48px, 12vw, 60px)',
                  height: 'clamp(48px, 12vw, 60px)',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E06A55',
                  flexShrink: 0
                }}>
                  <Smile size={24} />
                </div>
                <div style={{ width: '100%' }}>
                  <h3 style={{ fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: '900', color: '#E06A55', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Segue as nossas aventuras</h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a
                      href="https://www.facebook.com/profile.php?id=61556669931835"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 14px',
                        borderRadius: '30px',
                        backgroundColor: 'white',
                        color: '#2C3E50',
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                      }}
                    >
                      <FacebookIcon size={14} /> Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/inpe_barefoot/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 14px',
                        borderRadius: '30px',
                        backgroundColor: 'white',
                        color: '#2C3E50',
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                      }}
                    >
                      <InstagramIcon size={14} /> Instagram
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Playful Contact Form */}
            <div>
              <div>
                {!formSubmitted ? (
                  <form
                    onSubmit={handleFormSubmit}
                    style={{
                      backgroundColor: 'white',
                      padding: 'clamp(1.5rem, 5vw, 3.5rem) clamp(1.2rem, 4vw, 3rem)',
                      borderRadius: '36px',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.2rem'
                    }}
                  >
                    <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.5rem)', fontWeight: '900', color: '#2C3E50', margin: '0 0 5px', textTransform: 'uppercase' }}>
                      Envia-nos uma Mensagem
                    </h2>

                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', color: '#2C3E50', fontWeight: '800', fontSize: '0.85rem' }}>Como te chamas?</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="O teu nome"
                        required
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '16px',
                          border: '2px solid #eee',
                          backgroundColor: '#fbfbfb',
                          fontFamily: 'inherit',
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#2C3E50',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', color: '#2C3E50', fontWeight: '800', fontSize: '0.85rem' }}>Qual é o teu email?</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="exemplo@email.com"
                        required
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '16px',
                          border: '2px solid #eee',
                          backgroundColor: '#fbfbfb',
                          fontFamily: 'inherit',
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#2C3E50',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', color: '#2C3E50', fontWeight: '800', fontSize: '0.85rem' }}>A tua mensagem</label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Conta-nos como te podemos ajudar..."
                        required
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '16px',
                          border: '2px solid #eee',
                          backgroundColor: '#fbfbfb',
                          fontFamily: 'inherit',
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#2C3E50',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'all 0.3s'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        padding: '16px 32px',
                        backgroundColor: '#FF9F1C',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1.05rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 8px 25px rgba(255,159,28,0.3)',
                        marginTop: '0.5rem',
                        width: '100%'
                      }}
                    >
                      <span>Enviar Mensagem</span>
                      <Send size={18} />
                    </button>
                  </form>
                ) : (
                  <div
                    style={{
                      backgroundColor: 'white',
                      padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)',
                      borderRadius: '36px',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.02)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.5rem'
                    }}
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#E8F5E9',
                      color: '#4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <Heart size={38} fill="#4CAF50" />
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#2C3E50', margin: 0 }}>Mensagem Enviada!</h3>
                    <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.05rem', margin: 0, maxWidth: '300px' }}>
                      Obrigado por entrares em contacto, <strong>{formState.name}</strong>. A nossa equipa de fisioterapeutas vai responder-te muito em breve.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* MAP SECTION */}
        <section style={{ maxWidth: '1200px', margin: 'clamp(2rem, 6vw, 4rem) auto 0', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', fontWeight: '900', color: '#2C3E50', textTransform: 'uppercase', margin: 0 }}>
              Visita-nos em Vouzela
            </h2>
          </div>
          <div
            className="map-container"
            style={{
              width: '100%',
              height: 'clamp(280px, 45vh, 500px)',
              borderRadius: '36px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.04)'
            }}
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Vouzela&t=&z=13&ie=UTF8&iwloc=&output=embed"
              title="Localização Inpe"
            ></iframe>
          </div>
        </section>

      </div>
      <style>{`
        .contact-grid {
          grid-template-columns: 1.1fr 1fr;
          gap: 5rem;
        }
        .map-container {
          border: 6px solid white;
        }
        .contact-grid input, 
        .contact-grid textarea {
          border: 2px solid #cdd5de !important;
          background-color: #ffffff !important;
          -webkit-appearance: none;
          border-radius: 16px;
        }
        .contact-grid input:focus, 
        .contact-grid textarea:focus {
          border-color: #FF9F1C !important;
          background-color: #fffbf2 !important;
          outline: none;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: clamp(2rem, 6vw, 3rem);
          }
          .map-container {
            border: 4px solid white;
          }
        }
      `}</style>
    </Layout>
  );
};

export default ContactClient;
