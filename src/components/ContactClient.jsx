'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import Layout from './Layout';

const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);


const ContactClient = () => (
  <Layout>
    <div style={{ backgroundColor: '#FDFBF7', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'calc(80px + 4rem) 2rem 4rem', marginTop: '-80px' }}>
      <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'normal' }}>Estamos sempre disponíveis!</h1>
          <p style={{ color: '#666', marginBottom: '4rem', lineHeight: 1.8, fontSize: '1.1rem', maxWidth: '450px' }}>Tem dúvidas sobre o tamanho ideal ou sobre os nossos materiais? Estamos aqui para ajudar em cada passo da sua jornada barefoot.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(235,175,108,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Mail size={24} color="var(--color-primary)" /></div>
              <div><h3 style={{ color: '#999', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 600 }}>Email</h3><a href="mailto:geral@inpe.pt" style={{ color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 500 }}>geral@inpe.pt</a></div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(235,175,108,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={24} color="var(--color-primary)" /></div>
              <div><h3 style={{ color: '#999', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 600 }}>Morada</h3><p style={{ color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 500 }}>Morada a definir</p></div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(235,175,108,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><InstagramIcon size={24} color="var(--color-primary)" /></div>
              <div>
                <h3 style={{ color: '#999', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 600 }}>Redes Sociais</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <a href="https://www.facebook.com/profile.php?id=61556669931835" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text)', display: 'flex', alignItems: 'center' }} aria-label="Facebook"><FacebookIcon /></a>
                  <a href="https://www.instagram.com/inpe_barefoot/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text)', display: 'flex', alignItems: 'center' }} aria-label="Instagram"><InstagramIcon size={24} /></a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div><label style={{ display: 'block', marginBottom: '0.8rem', color: '#333', fontWeight: 500, fontSize: '0.95rem' }}>Nome</label><input type="text" placeholder="Seu nome" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#f9f9f9', fontFamily: 'inherit', fontSize: '1rem', outline: 'none' }} /></div>
          <div><label style={{ display: 'block', marginBottom: '0.8rem', color: '#333', fontWeight: 500, fontSize: '0.95rem' }}>Email</label><input type="email" placeholder="seu@email.com" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#f9f9f9', fontFamily: 'inherit', fontSize: '1rem', outline: 'none' }} /></div>
          <div><label style={{ display: 'block', marginBottom: '0.8rem', color: '#333', fontWeight: 500, fontSize: '0.95rem' }}>Mensagem</label><textarea rows={4} placeholder="Como podemos ajudar?" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#f9f9f9', fontFamily: 'inherit', fontSize: '1rem', outline: 'none', resize: 'vertical' }} /></div>
          <button type="button" style={{ padding: '16px 32px', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginTop: '1rem' }}>
            <span>Enviar Mensagem</span><Send size={18} />
          </button>
        </motion.form>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ width: '100%', maxWidth: '1200px', height: '450px', marginTop: '6rem', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Vouzela&t=&z=13&ie=UTF8&iwloc=&output=embed" title="Localização Vouzela"></iframe>
      </motion.div>
    </div>
  </Layout>
);
export default ContactClient;
