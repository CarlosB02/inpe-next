'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, FileText, UserCheck, Scale, Target,
  Mail, MapPin, ChevronRight, Info, User
} from 'lucide-react';
import Layout from './Layout';

const privacySections = [
  {
    id: 'dados-recolhidos',
    icon: FileText,
    title: 'Dados Recolhidos',
    shortDesc: 'Que informação pessoal guardamos e como a recolhemos.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Recolhemos apenas as informações estritamente necessárias para processar as tuas compras e garantir a melhor experiência na nossa loja. Estes dados podem incluir:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
            <div><strong>Dados de Compra e Envio:</strong> Nome completo, morada de entrega, morada de faturação, número de identificação fiscal (NIF), endereço de e-mail e número de telefone.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
            <div><strong>Dados de Apoio ao Cliente:</strong> O teu nome, e-mail e o histórico das mensagens trocadas connosco através de formulários de contacto ou e-mail de suporte.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
            <div><strong>Dados de Navegação:</strong> Endereço IP (encriptado), tipo de dispositivo, cookies de sessão e analíticos, páginas visitadas e dados geográficos aproximados (estatísticas puramente anónimas).</div>
          </li>
        </ul>
        <div style={{ backgroundColor: '#fff9ed', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)', fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          <strong>Nota de Segurança:</strong> Não guardamos nem recolhemos dados de pagamento diretamente (cartões de crédito, acessos bancários, etc.). Todos os pagamentos são processados em ligações 100% seguras através de entidades financeiras externas parceiras (como Stripe, PayPal, Multibanco ou MBWay).
        </div>
      </div>
    )
  },
  {
    id: 'finalidades',
    icon: Target,
    title: 'Finalidades do Tratamento',
    shortDesc: 'Para que fins utilizamos os teus dados pessoais.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Os dados recolhidos são tratados única e exclusivamente para as seguintes finalidades legítimas:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>•</span>
            <div><strong>Execução de Encomendas:</strong> Processar a compra, expedir os sapatos barefoot, emitir faturas e enviar e-mails de acompanhamento sobre a entrega.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>•</span>
            <div><strong>Suporte ao Cliente:</strong> Responder a questões sobre tamanhos, trocas, devoluções, reembolsos ou estado da encomenda.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>•</span>
            <div><strong>Obrigações Fiscais e Legais:</strong> Emissão de faturação e arquivo de registos financeiros obrigatórios nos termos da legislação fiscal em vigor.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>•</span>
            <div><strong>Melhoria do Website:</strong> Monitorização do desempenho do site a nível técnico e análise estatística de dados agregados (nunca individuais) para otimizar a usabilidade.</div>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'base-legal',
    icon: Scale,
    title: 'Base Legal',
    shortDesc: 'Os fundamentos jurídicos que legitimam o uso da tua informação.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD), o tratamento de dados pessoais na nossa loja online assenta nos seguintes pilares legais:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>•</span>
            <div><strong>Contrato de Compra e Venda:</strong> Necessário para enviar os sapatinhos e cumprir a transação acordada aquando da compra.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>•</span>
            <div><strong>Consentimento:</strong> Solicitado ativamente para cookies de marketing avançados, análise de navegação opcional e subscrição de comunicações.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>•</span>
            <div><strong>Cumprimento de Deveres Jurídicos:</strong> Necessário para arquivar faturas fiscais durante os prazos determinados pelo Estado português.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>•</span>
            <div><strong>Interesse Legítimo:</strong> Para manter a segurança técnica da plataforma, prevenir atividades fraudulentas e analisar a estabilidade do site.</div>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'direitos',
    icon: UserCheck,
    title: 'Direitos do Utilizador',
    shortDesc: 'As tuas prerrogativas de controlo e esquecimento.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>A qualquer momento podes exercer os teus direitos de privacidade previstos na lei através do e-mail do suporte. Os teus direitos são:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: '#E06A55', fontWeight: 'bold' }}>•</span>
            <div><strong>Acesso e Retificação:</strong> Direito de obter cópia dos teus dados que temos arquivados e de solicitar a correção imediata de erros.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: '#E06A55', fontWeight: 'bold' }}>•</span>
            <div><strong>Eliminação (Esquecimento):</strong> Podes solicitar que apaguemos permanentemente os teus dados de contacto de bases promocionais (esta eliminação não pode abranger faturas fiscais arquivadas legalmente).</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: '#E06A55', fontWeight: 'bold' }}>•</span>
            <div><strong>Oposição e Limitação:</strong> Podes recusar que os teus dados continuem a ser analisados ou limitar temporariamente a sua utilização.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: '#E06A55', fontWeight: 'bold' }}>•</span>
            <div><strong>Portabilidade:</strong> Solicitar o envio dos teus dados estruturados num formato digital comum para exportares para outro serviço.</div>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'contacto-privacidade',
    icon: Mail,
    title: 'Contacto para Privacidade',
    shortDesc: 'Fale diretamente connosco para esclarecer qualquer dúvida sobre os teus dados.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <p>Para qualquer pedido, retificação, oposição ou dúvidas relativas à recolha e proteção de dados, podes contactar-nos diretamente pelos seguintes meios:</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '0.5rem'
        }}>
          <div style={{ backgroundColor: '#E0F2F1', padding: '1rem', borderRadius: '16px', border: '2px solid white', boxShadow: 'var(--shadow-card)', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Mail size={20} color="var(--color-winter-blue)" style={{ flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#007396', textTransform: 'uppercase', display: 'block' }}>E-mail</span>
              <a href="mailto:geral@inpe.pt" style={{ fontWeight: '800', color: 'var(--color-text)', wordBreak: 'break-all' }}>geral@inpe.pt</a>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFF3E0', padding: '1rem', borderRadius: '16px', border: '2px solid white', boxShadow: 'var(--shadow-card)', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <MapPin size={20} color="var(--color-accent-brown)" style={{ flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#854931', textTransform: 'uppercase', display: 'block' }}>Morada Sede</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-text)', lineHeight: '1.2' }}>Av. Sá carneiro 224, 1º esq., S. Pedro do Sul</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const PrivacyClient = () => {
  // Mobile accordions toggle map
  const [openSections, setOpenSections] = useState({
    'dados-recolhidos': true
  });

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <Layout backgroundColor="var(--color-background)">
      {/* Responsive Styles Injection */}
      <style>{`
        .privacy-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          align-items: start;
        }
        .sidebar-menu {
          position: sticky;
          top: 110px;
          background: white;
          border-radius: var(--border-radius);
          padding: 1.5rem;
          box-shadow: var(--shadow-card);
          border: 1px solid rgba(133, 73, 49, 0.05);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .sidebar-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          text-align: left;
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 700;
          color: #777;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sidebar-btn:hover {
          background-color: #fafafa;
          color: var(--color-text);
        }
        .desktop-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .privacy-card {
          background: white;
          border-radius: var(--border-radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-card);
          border: 1px solid rgba(133, 73, 49, 0.05);
        }
        .mobile-accordions {
          display: none;
        }
        
        @media (max-width: 900px) {
          .privacy-grid {
            display: block;
          }
          .sidebar-menu {
            display: none;
          }
          .desktop-content {
            display: none;
          }
          .mobile-accordions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .accordion-header {
            width: 100%;
            background: white;
            border: 1px solid rgba(133, 73, 49, 0.05);
            padding: 1.25rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-card);
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.2s;
          }
          .accordion-content {
            background: white;
            border-radius: var(--border-radius);
            border: 1px solid rgba(0,0,0,0.02);
            padding: 1.5rem;
            box-shadow: inset 0 2px 8px rgba(0,0,0,0.01);
            margin-top: -6px;
            border-top: none;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
      `}</style>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>

        {/* HERO HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '1rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: '900',
            color: 'var(--color-winter-blue)',
            marginBottom: '1.2rem',
            lineHeight: 1.1,
            textTransform: 'uppercase'
          }}>
            Política de Privacidade
          </h1>
          <p style={{
            maxWidth: '650px',
            margin: '0 auto',
            color: 'var(--color-text-light)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            O respeito pela segurança e privacidade dos teus dados é prioritário. Sabe aqui de forma transparente que informação recolhemos e como a protegemos.
          </p>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="privacy-grid">

          {/* DESKTOP SIDEBAR INDEX */}
          <div className="sidebar-menu">
            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '12px' }}>
              Secções do Documento
            </span>
            {privacySections.map((sect) => {
              const IconComp = sect.icon;
              return (
                <button
                  key={sect.id}
                  onClick={() => scrollToSection(sect.id)}
                  className="sidebar-btn"
                >
                  <IconComp size={16} />
                  <span>{sect.title}</span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP CONTENT VIEW */}
          <div className="desktop-content">
            {privacySections.map((sect) => {
              const IconComp = sect.icon;
              return (
                <div id={sect.id} key={sect.id} className="privacy-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                    <div style={{ padding: '8px', backgroundColor: 'var(--color-background)', borderRadius: '12px', color: 'var(--color-winter-blue)' }}>
                      <IconComp size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--color-text)', margin: 0 }}>
                        {sect.title}
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{sect.shortDesc}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: '1.6' }}>
                    {sect.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE ACCORDIONS VIEW */}
          <div className="mobile-accordions">
            {privacySections.map((sect) => {
              const IconComp = sect.icon;
              const isOpen = openSections[sect.id];
              return (
                <div key={sect.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={() => toggleSection(sect.id)}
                    className="accordion-header"
                    style={{
                      borderBottomLeftRadius: isOpen ? '0' : 'inherit',
                      borderBottomRightRadius: isOpen ? '0' : 'inherit',
                      borderColor: isOpen ? 'var(--color-primary)' : 'rgba(133, 73, 49, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <IconComp size={18} color="var(--color-winter-blue)" />
                      <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--color-text)' }}>
                        {sect.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={18} color="#999" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="accordion-content"
                      >
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: '1.5' }}>
                          {sect.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default PrivacyClient;
