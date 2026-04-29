'use client';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Headset, ShieldCheck, Truck, Gift, ChevronLeft, ChevronRight, Palette, Leaf, Award, Lightbulb, Users, Heart, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

import Link from 'next/link';
import ProductCard from './ProductCard';
import ModelViewer from './ModelViewer';
import Layout from './Layout';
import products from '@/data/products';

const AnimatedCounter = ({ from, to, duration }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  useEffect(() => {
    const controls = animate(count, to, { duration });
    return controls.stop;
  }, []);
  return <motion.span>{rounded}</motion.span>;
};

const HomeClient = () => {
  const { bestSellers, newCollection, summerProducts, winterProducts } = useMemo(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const summer = products.filter(p => p.category === 'crianca').slice(0, 3);
    const winter = products.filter(p => p.category === 'homem').slice(0, 3);
    while (summer.length < 3) summer.push(products[Math.floor(Math.random() * products.length)]);
    while (winter.length < 3) winter.push(products[Math.floor(Math.random() * products.length)]);
    return { bestSellers: shuffled.slice(0, 4), newCollection: shuffled.slice(4, 8), summerProducts: summer, winterProducts: winter };
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const [summerIndex, setSummerIndex] = useState(0);
  const [winterIndex, setWinterIndex] = useState(0);

  const nextSummer = () => setSummerIndex((prev) => (prev + 1) % summerProducts.length);
  const prevSummer = () => setSummerIndex((prev) => (prev - 1 + summerProducts.length) % summerProducts.length);
  const nextWinter = () => setWinterIndex((prev) => (prev + 1) % winterProducts.length);
  const prevWinter = () => setWinterIndex((prev) => (prev - 1 + winterProducts.length) % winterProducts.length);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }
  }, []);

  const handleAddToCart = (name) => alert(name + ' adicionado ao carrinho!');

  const features = [
    { icon: Headset, title: 'Suporte Gratuito 24/7', desc: 'Apoio online a qualquer hora' },
    { icon: ShieldCheck, title: 'Garantia de Reembolso', desc: 'Pagamento 100% Seguro' },
    { icon: Truck, title: 'Envios Gratuitos', desc: 'Em encomendas acima de 49€' },
    { icon: Gift, title: 'Cartões Presente', desc: 'A oferta perfeita' }
  ];

  const offerItems = [
    { icon: Palette, title: 'Design', text: 'Estilo moderno e atrativo para todas as ocasiões.', color: '#f7c969', bg: '#fffcf2' },
    { icon: Leaf, title: 'Sustentabilidade', text: 'Materiais eco-friendly e produção consciente.', color: '#006D8F', bg: '#e0f2f1' },
    { icon: Award, title: 'Qualidade', text: 'Durabilidade e conforto em cada detalhe.', color: '#f7c969', bg: '#fffcf2' },
    { icon: Lightbulb, title: 'Inovação', text: 'Tecnologia barefoot de ponta.', color: '#006D8F', bg: '#e0f2f1' },
    { type: 'image', src: products[26] ? products[26].image : '' },
    { icon: Users, title: 'Trabalho de Equipa', text: 'Focados na sua satisfação.', color: '#f7c969', bg: '#fffcf2' }
  ];

  return (
    <Layout>
      <div style={{ paddingTop: '0', paddingBottom: '0', marginTop: '-80px' }}>

        {/* HERO */}
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', color: 'white', textAlign: 'center' }}>
          <video ref={videoRef} autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>

          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 2 }} />

          <div style={{ zIndex: 10, maxWidth: '800px', padding: '0 20px' }}>
            <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', borderRadius: '20px', color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
              🌱 100% Orgânico &amp; Ajustado para o pé
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1.1, color: 'white', fontWeight: '900', marginBottom: '1rem', textTransform: 'uppercase', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Deixe os pezinhos <br /> andar livremente
            </h1>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0f0f0', marginBottom: '3rem' }}>Descubra o conforto natural para toda a família.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/loja" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1rem' }}>VER COLEÇÃO &rarr;</Link>
              <button className="btn-outline" style={{ padding: '16px 32px', fontSize: '1rem', color: 'white', borderColor: 'white' }}>SUGESTÕES</button>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div style={{ backgroundColor: '#006D8F', color: 'white', padding: '12px 0', overflow: 'hidden', display: 'flex', whiteSpace: 'nowrap', position: 'relative', zIndex: 10 }}>
          <style>{`@keyframes scroll-ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.ticker-content{display:flex;width:max-content;animation:scroll-ticker 20s linear infinite}.ticker-item{display:flex;align-items:center;gap:10px;padding:0 40px;font-weight:600;font-size:.95rem;text-transform:uppercase}.ticker-item svg{color:#f7c969}`}</style>
          <div className="ticker-content">
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="ticker-item"><Headset size={20} /> Suporte Gratuito 24/7</div>
                <div className="ticker-item"><ShieldCheck size={20} /> Garantia de Devolução</div>
                <div className="ticker-item"><Truck size={20} /> Envios gratuitos</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, backgroundImage: 'url(/images/products_background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <section style={{ padding: '0 12% 4rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#333', textTransform: 'uppercase', marginBottom: '2rem' }}>Mais Vendidos</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                {bestSellers.map(p => <ProductCard key={p.id} title={p.name} price={p.price} image={p.image} category={p.subcategory || p.category} id={p.id} />)}
              </div>
            </section>
            <section style={{ padding: '0 12%' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#333', textTransform: 'uppercase', marginBottom: '2rem' }}>Nova Coleção</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                {newCollection.map(p => <ProductCard key={p.id} title={p.name} price={p.price} image={p.image} category={p.subcategory || p.category} id={p.id} />)}
              </div>
            </section>
          </div>
        </div>

        {/* COMFORT / 3D MODEL */}
        <section style={{ backgroundColor: 'var(--color-teal)', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#854931', textTransform: 'uppercase', marginBottom: '3rem' }}>Conforto</h2>
          <div style={{ margin: '0 auto 3rem', maxWidth: '800px', height: '400px', position: 'relative', width: '100%' }}>
            <ModelViewer modelPath="/shoe.glb" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/loja" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>VER COLEÇÃO &rarr;</Link>
          </div>
          <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '300px', height: '300px', border: '20px solid var(--color-primary)', borderRadius: '50%', opacity: 0.6 }} />
        </section>

        {/* SEASONS */}
        <section className="seasons-section" style={{ display: 'flex', height: isMobile ? 'auto' : '80vh', flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ backgroundColor: 'var(--color-primary)', display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '3rem 1.5rem' : '2rem 2rem 5rem', position: 'relative', minHeight: isMobile ? '500px' : 'auto', height: '100%' }}>
            <img src="/images/verao.png" alt="Verão" style={{ height: '60px', width: 'auto', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '900', color: '#006D8F', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Verão</h2>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', gap: '1rem', flex: 1 }}>
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={prevSummer} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#006D8F', padding: '10px' }}><ChevronLeft size={48} /></motion.button>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '60%' }}>
                <AnimatePresence mode="wait">
                  <motion.img key={summerIndex} src={summerProducts[summerIndex] ? summerProducts[summerIndex].image : ''} alt="Verão" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))' }} />
                </AnimatePresence>
              </div>
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={nextSummer} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#006D8F', padding: '10px' }}><ChevronRight size={48} /></motion.button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
              <Link href="/loja" style={{ textDecoration: 'none', width: '100%' }}>
                <motion.div whileHover={{ scale: 1.05 }} style={{ backgroundColor: '#006D8F', color: 'white', padding: '14px 28px', borderRadius: '99px', fontWeight: 'bold', textAlign: 'center' }}>VER COLEÇÃO &rarr;</motion.div>
              </Link>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => handleAddToCart(summerProducts[summerIndex] ? summerProducts[summerIndex].name : '')} style={{ backgroundColor: 'transparent', color: '#006D8F', padding: '14px 28px', borderRadius: '99px', border: '2px solid #006D8F', fontWeight: 'bold', fontFamily: 'var(--font-main)', cursor: 'pointer', width: '100%' }}>ADICIONAR AO CARRINHO</motion.button>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--color-winter-blue)', display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '3rem 1.5rem' : '2rem 2rem 5rem', position: 'relative', minHeight: isMobile ? '500px' : 'auto', height: '100%' }}>
            <img src="/images/inverno.png" alt="Inverno" style={{ height: '60px', width: 'auto', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '900', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Inverno</h2>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', gap: '1rem', flex: 1 }}>
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={prevWinter} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', padding: '10px' }}><ChevronLeft size={48} /></motion.button>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '60%' }}>
                <AnimatePresence mode="wait">
                  <motion.img key={winterIndex} src={winterProducts[winterIndex] ? winterProducts[winterIndex].image : ''} alt="Inverno" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))' }} />
                </AnimatePresence>
              </div>
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={nextWinter} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', padding: '10px' }}><ChevronRight size={48} /></motion.button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
              <Link href="/loja" style={{ textDecoration: 'none', width: '100%' }}>
                <motion.div whileHover={{ scale: 1.05 }} style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '14px 28px', borderRadius: '99px', fontWeight: 'bold', textAlign: 'center' }}>VER COLEÇÃO &rarr;</motion.div>
              </Link>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => handleAddToCart(winterProducts[winterIndex] ? winterProducts[winterIndex].name : '')} style={{ backgroundColor: 'transparent', color: 'var(--color-primary)', padding: '14px 28px', borderRadius: '99px', border: '2px solid var(--color-primary)', fontWeight: 'bold', fontFamily: 'var(--font-main)', cursor: 'pointer', width: '100%' }}>ADICIONAR AO CARRINHO</motion.button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: '4rem 10%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', backgroundColor: '#ffffff' }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ backgroundColor: '#f0f9f8', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <f.icon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#333', marginBottom: '0.25rem', textTransform: 'uppercase' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* WHAT WE OFFER */}
        <section className="what-we-offer-section" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#333', marginBottom: '1rem', textTransform: 'uppercase' }}>O Que Oferecemos</h2>
          </div>
          <div className="offer-grid">
            {offerItems.map((item, idx) => {
              if (item.type === 'image') return (
                <motion.div key={idx} whileHover={{ scale: 1.03 }} style={{ borderRadius: '24px', overflow: 'hidden', height: '100%', minHeight: '200px', backgroundColor: '#fff', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.src && <img src={item.src} alt="Feature" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />}
                </motion.div>
              );
              return (
                <motion.div key={idx} whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }} style={{ backgroundColor: item.bg, padding: '2rem', borderRadius: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.3s ease', border: '1px solid ' + item.color + '20' }}>
                  <div style={{ backgroundColor: item.color, color: 'white', padding: '16px', borderRadius: '50%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px ' + item.color + '40' }}>
                    <item.icon size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2c3e50', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.5' }}>{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* BUILT FOR EVERYDAY */}
        <section style={{ padding: '6rem 10%', backgroundColor: '#fffdf9', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'relative', width: '300px', height: '300px', borderRadius: '50%' }}>
              {bestSellers.slice(0, 3).map((prod, i) => {
                const angle = (i * 360) / 3;
                const radius = 150;
                return (
                  <motion.div key={prod.id} style={{ position: 'absolute', top: '50%', left: '50%', width: '200px', marginLeft: '-100px', marginTop: '-120px', transform: 'rotate(' + angle + 'deg) translate(' + radius + 'px) rotate(-' + angle + 'deg)' }}>
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', border: '1px solid #eee' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                        <div style={{ background: '#fafafa', borderRadius: '50%', padding: '4px' }}><Heart size={14} fill="#eb5757" color="#eb5757" /></div>
                      </div>
                      <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>{prod.name}</div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.1', marginBottom: '1.5rem' }}>Criado para o seu <br /> Dia a Dia</h2>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', marginBottom: '3rem' }}>Desenhado para acompanhar o ritmo da sua vida, oferecendo o equilíbrio perfeito entre estilo, conforto e saúde para os seus pés.</p>
            <div style={{ display: 'flex', gap: '4rem', marginBottom: '3rem', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '2rem 0' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '800', color: '#006D8F', display: 'flex', alignItems: 'center' }}><AnimatedCounter from={0} to={15} duration={2} />+</div>
                <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Anos de Inovação</div>
              </div>
              <div style={{ width: '1px', backgroundColor: '#ddd' }}></div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: '800', color: '#006D8F', display: 'flex', alignItems: 'center' }}><AnimatedCounter from={0} to={95} duration={2} />k</div>
                <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Pés Felizes</div>
              </div>
            </div>
            <Link href="/loja" className="btn-primary" style={{ padding: '18px 40px', fontSize: '1rem', fontWeight: 'bold', display: 'inline-block' }}>Explorar Categorias</Link>
          </div>
        </section>
        {/* INSTAGRAM */}
        <section style={{ padding: '6rem 10%', backgroundColor: '#fffdf9', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <InstagramIcon size={32} color="#E1306C" />
              <h2 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: '900', color: '#1a1a1a', textTransform: 'uppercase', margin: 0 }}>Acompanhe a nossa caminhada</h2>
            </div>
            <a href="https://www.instagram.com/inpe_barefoot/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: '#006D8F', fontWeight: 'bold' }}>@inpe_barefoot</a>
          </div>
          <div className="instagram-grid" style={{ width: '100%', marginBottom: '3rem' }}>
            {[...bestSellers, ...newCollection].slice(0, 4).map((prod, i) => (
              <a key={i} href="https://www.instagram.com/inpe_barefoot/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div whileHover="hover" initial="initial" style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                  <img src={prod.image} alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <motion.div variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.2 }} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}><Heart size={28} fill="white" /> {Math.floor(Math.random() * 200) + 50}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}><MessageCircle size={28} fill="white" /> {Math.floor(Math.random() * 20) + 2}</div>
                  </motion.div>
                </motion.div>
              </a>
            ))}
          </div>
          <a href="https://www.instagram.com/inpe_barefoot/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: 'clamp(14px,2.5vh,20px) clamp(30px,5vw,50px)', fontWeight: 'bold', backgroundColor: '#E1306C', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <InstagramIcon size={24} /> Siga-nos no Instagram
          </a>
          <style>{`.instagram-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem}@media(max-width:1024px){.instagram-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:768px){.instagram-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:1rem;padding-bottom:1rem;scroll-behavior:smooth}.instagram-grid>*{flex:0 0 85%;scroll-snap-align:center}}`}</style>
        </section>
      </div>
    </Layout>
  );
};

export default HomeClient;
