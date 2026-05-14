'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Footprints, Heart, TreeDeciduous, Maximize, Activity, Zap, HeartPlus, Feather, Sprout, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from './Layout';

const sectionTitleStyle = {
  textAlign: 'center',
  color: 'var(--color-primary)',
  fontSize: '2.5rem',
  marginBottom: '4rem'
};

const HistoryClient = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const essencia = [
    { icon: <Footprints size={32} />, title: 'Liberdade', text: 'Respeitamos a anatomia natural do pé.', bg: '/history-liberdade.png', ctaText: 'Sinta a liberdade', targetId: 'porque-inpe' },
    { icon: <TreeDeciduous size={32} />, title: 'Sustentabilidade', text: 'Materiais amigos do ambiente sempre que possível.', bg: '/history-sustentabilidade.png', ctaText: 'A nossa responsabilidade' },
    { icon: <Heart size={32} />, title: 'Cuidado', text: 'Cada par é selecionado a pensar no conforto absoluto.', bg: '/history-carinho.png', ctaText: 'Fale com a equipa' }
  ];

  const porqueCards = [
    { icon: <Maximize size={32} color="white" />, title: 'Espaço para os Dedos', text: 'Zona dos dedos alargada para permitir que os dedos se espalhem naturalmente.', color: '#F4C466' },
    { icon: <Activity size={32} color="white" />, title: 'Flexibilidade Total', text: 'Solas que se dobram em todas as direções, acompanhando o pé.', color: '#E8A87C' },
    { icon: <Zap size={32} color="white" />, title: 'Conexão Sensorial', text: 'Sola fina para sentir o terreno e estimular o desenvolvimento motor.', color: '#F4C466' },
    { icon: <HeartPlus size={32} color="white" />, title: 'Fisioterapeuticas', text: 'Desenvolvidos com base em princípios fisioterapêuticos para promover o desenvolvimento saudável do pé.', color: '#E8A87C' },
    { icon: <Feather size={32} color="white" />, title: 'Leveza', text: 'Sapatos tão leves que as crianças esquecem que os têm calçados.', color: '#F4C466' },
    { icon: <Sprout size={32} color="white" />, title: 'Estrutura Natural', text: 'Sem suporte de arco artificial, fortalecendo os músculos do pé.', color: '#E8A87C' }
  ];

  return (
    <Layout>
      <div style={{ paddingBottom: '6rem', overflowX: 'hidden' }}>
        <style jsx>{`
          .history-hero-title {
            color: var(--color-primary);
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.1;
          }

          .mobile-only {
            display: none !important;
          }

          @media (max-width: 768px) {
            .history-hero-title {
              text-align: center;
              font-size: 3rem;
            }
            .mobile-only {
              display: flex !important;
            }
          }
        `}</style>

        {/* A Origem Section */}
        <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <img src="/founders.png" alt="Inês Santos e Inês Oliveira" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h1 className="history-hero-title">A Nossa Pegada</h1>
            <div style={{ color: 'var(--color-text)', lineHeight: 1.8, fontSize: '1.1rem' }}>
              <p style={{ marginBottom: '1.5rem', fontWeight: '500', fontStyle: 'italic' }}>
                "Não é apenas sobre sapatos. É sobre dar liberdade a cada passo e deixar as crianças explorarem o mundo como a natureza planeou."
              </p>

              <div className="history-bio-text">
                <AnimatePresence initial={false}>
                  {(isExpanded || (isClient && isDesktop)) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ marginBottom: '1.5rem' }}>
                        Inês Santos e Inês Oliveira, são fisioterapeutas e mães de dois casais de crianças entre os 2 e os 6 anos. Foi a fisioterapia que as uniu há mais de 14 anos, mas foi a cumplicidade, a amizade e as aventuras por que passaram juntas que fizeram com que se mantivessem unidas até hoje.
                      </p>
                      <p style={{ marginBottom: '1.5rem' }}>
                        A Inês Santos, ou Inês pequenina como carinhosamente a chamam para as diferenciarem, é hoje fisioterapeuta especialista em pediatria olhando as crianças de uma forma completa em simbiose com a natureza.
                      </p>
                      <p>
                        A Inês Oliveira, empreendedora nata e uma verdadeira líder, é alguém que inspira com a sua visão e determinação. É sócia gerente da Clínica Fisiátrica de S. Pedro do Sul e tem como compromisso o bem-estar das pessoas e sua capacidade de transformar desafios em oportunidades.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isDesktop && isClient && (
                  <button
                    className="mobile-only"
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-primary)',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      marginTop: '1.5rem',
                      padding: '0'
                    }}
                  >
                    {isExpanded ? (
                      <>Ver Menos <ChevronUp size={20} /></>
                    ) : (
                      <>Ler História Completa <ChevronDown size={20} /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Philosophy/Values */}
        <section style={{ backgroundColor: '#fff', padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={sectionTitleStyle}>A Nossa Essência</h2>
            <div className="mobile-carousel">
              {essencia.map((val, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: 'var(--color-background)',
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${val.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '24px',
                    transition: 'box-shadow 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ width: '70px', height: '70px', margin: '0 auto 1.5rem', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', boxShadow: '0 4px 10px #0000000d' }}>
                    {val.icon}
                  </div>
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>{val.title}</h3>
                  <p style={{ color: '#854931', marginBottom: '1.5rem' }}>{val.text}</p>
                  <Link href={val.targetId ? `#${val.targetId}` : "/contactos"} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-primary)', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', marginTop: 'auto', padding: '0.8rem 1.5rem', borderRadius: '50px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    {val.ctaText} <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-winter-blue)', color: 'white', textAlign: 'center' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
            {[
              { num: '5k+', label: 'Pés Felizes' },
              { num: '12', label: 'Coleções' },
              { num: '100%', label: 'Amor' }
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 100, delay: idx * 0.1 }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>{stat.num}</div>
                <div style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.9 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filosofia Barefoot */}
        <section id="porque-inpe" style={{ backgroundColor: 'var(--color-background)', padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ ...sectionTitleStyle, color: '#F4C466' }}>Porquê Inpe?</h2>
            <div className="mobile-carousel">
              {porqueCards.map((card, idx) => (
                <motion.div key={idx} whileHover={{ y: -5 }} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2.5rem', textAlign: 'left', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    {card.icon}
                  </div>
                  <h3 style={{ color: card.color, fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: 'bold' }}>{card.title}</h3>
                  <p style={{ color: 'var(--color-text)', lineHeight: 1.6, fontSize: '0.95rem' }}>{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HistoryClient;
