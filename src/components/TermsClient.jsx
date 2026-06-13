'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building, ShoppingBag, CreditCard, Truck, RotateCcw,
  ShieldCheck, XCircle, Scale, ChevronRight, HelpCircle, Info
} from 'lucide-react';
import Layout from './Layout';

const termsSections = [
  {
    id: 'identificacao',
    icon: Building,
    title: 'Identificação da Empresa',
    shortDesc: 'Informações fiscais e de contacto da nossa marca.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>A marca comercial <strong>Inpe Barefoot</strong> e o website correspondente são geridos pela seguinte entidade comercial:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <li><strong>Denominação Social:</strong> Inpe Barefoot (ou "Nós")</li>
          <li><strong>Sede Física / Loja:</strong> Av. Sá carneiro 224, 1º andar 2ª loja dto, 3660-428 S. Pedro do Sul, Portugal</li>
          <li><strong>NIPC / Contribuinte Fiscal:</strong> 500000000 (Empresa registada em Portugal)</li>
          <li><strong>Contacto de E-mail:</strong> <a href="mailto:geral@inpe.pt" style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>geral@inpe.pt</a></li>
        </ul>
        <p>Ao navegar no site ou efetuar uma compra, o utilizador concorda na totalidade com as presentes condições gerais de venda.</p>
      </div>
    )
  },
  {
    id: 'processo-compra',
    icon: ShoppingBag,
    title: 'Processo de Compra',
    shortDesc: 'Como funciona a escolha e aquisição dos sapatos.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Comprar na nossa loja online é simples e interativo:</p>
        <ol style={{ marginLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <li>Navega pelas nossas coleções e escolhe o teu sapatinho barefoot favorito.</li>
          <li>Usa o nosso <strong>Guia de Tamanhos</strong> e a calculadora para garantires a medida perfeita para a criança.</li>
          <li>Seleciona o tamanho e clica em <strong>Adicionar ao Carrinho</strong>.</li>
          <li>Acede ao carrinho, preenche os dados exatos de envio e faturação (indica o teu NIF se pretenderes fatura com número fiscal) e finaliza a compra.</li>
        </ol>
        <p>Após a receção da encomenda, enviaremos um e-mail automático de confirmação com os detalhes da mesma. O processamento é efetuado nas 24h úteis seguintes.</p>
      </div>
    )
  },
  {
    id: 'metodos-pagamento',
    icon: CreditCard,
    title: 'Métodos de Pagamento',
    shortDesc: 'Opções seguras e encriptadas para pagar as tuas compras.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>A segurança dos teus pagamentos é a nossa prioridade absoluta. Aceitamos as seguintes opções de pagamento seguras e rápidas:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
            <div><strong>Cartão de Crédito ou Débito:</strong> Visa, Mastercard e Maestro (processado sob ligações encriptadas SSL).</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
            <div><strong>MBWay / Referência Multibanco:</strong> Paga comodamente na tua app bancária ou numa caixa eletrónica ATM. O processamento é imediato.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
            <div><strong>PayPal:</strong> Uma das carteiras eletrónicas mais seguras e utilizadas no mundo.</div>
          </li>
        </ul>
        <p>As encomendas serão expedidas apenas após a receção e validação do pagamento por parte da entidade financeira.</p>
      </div>
    )
  },
  {
    id: 'envios',
    icon: Truck,
    title: 'Envios e Prazos de Entrega',
    shortDesc: 'Como fazemos chegar os sapatinhos e quais os custos.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Queremos simplificar ao máximo a tua compra, por isso garantimos condições de envio excecionais:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>•</span>
            <div><strong>Portes de Envio Grátis:</strong> Oferecemos portes de envio gratuitos em todas as encomendas enviadas para Portugal Continental.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>•</span>
            <div><strong>Prazo de Expedição:</strong> Em dias úteis, as encomendas pagas até às 14h são normalmente expedidas no próprio dia ou no dia útil seguinte.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>•</span>
            <div><strong>Prazo de Entrega Estimado:</strong> Entre <strong>24 e 72 horas úteis</strong> (para Portugal Continental) e 3 a 7 dias úteis para os Açores e Madeira através das nossas transportadoras parceiras CTT Express / DPD.</div>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'trocas-devolucoes',
    icon: RotateCcw,
    title: 'Trocas e Devoluções',
    shortDesc: 'Comprar sem risco: prazo alargado e condições.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Queremos que os teus pequenos exploradores adorem os sapatos descalços. Se não servirem ou não gostares, tens uma garantia alargada:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>•</span>
            <div><strong>Prazo de 30 Dias:</strong> Podes solicitar a troca ou devolução até 30 dias após receberes a encomenda em casa.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>•</span>
            <div><strong>Estado do Produto:</strong> Os artigos devem estar em estado novo (sem terem sido usados na rua), na embalagem original protetora e com todas as etiquetas intactas.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>•</span>
            <div><strong>Trocas Gratuitas:</strong> O primeiro processo de recolha e envio do novo tamanho é totalmente gratuito para o cliente, garantindo que o pezinho tem o tamanho certo sem custos adicionais.</div>
          </li>
        </ul>
        <p>Para iniciar uma devolução ou troca, basta enviar um e-mail para <a href="mailto:geral@inpe.pt" style={{ color: 'var(--color-winter-blue)', fontWeight: 'bold' }}>geral@inpe.pt</a> indicando o número da encomenda.</p>
      </div>
    )
  },
  {
    id: 'garantias',
    icon: ShieldCheck,
    title: 'Garantia dos Bens',
    shortDesc: 'A tua compra protegida pela garantia de conformidade de 3 anos.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Todos os nossos produtos gozam da garantia legal de conformidade de <strong>3 anos</strong>, nos termos do Decreto-Lei n.º 84/2021, de 10 de dezembro, contra eventuais defeitos de fabrico a contar da data de entrega.</p>
        <p>A garantia não se aplica ao desgaste natural resultante da utilização intensiva de brincadeiras ao ar livre, fricção continuada ou uso inadequado dos calçados (lavagens incorretas, produtos abrasivos, etc.). Em caso de defeito de fabrico comprovado, o cliente terá direito à reparação, substituição do artigo ou reembolso total do valor.</p>
      </div>
    )
  },
  {
    id: 'cancelamento',
    icon: XCircle,
    title: 'Cancelamento de Encomendas',
    shortDesc: 'Como podes anular uma compra e receber o reembolso.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>O cliente pode anular ou cancelar a sua encomenda sem qualquer custo adicional sob as seguintes condições:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: '#E06A55', fontWeight: 'bold' }}>•</span>
            <div><strong>Antes do Envio:</strong> Podes solicitar o cancelamento imediato enviando um e-mail para o suporte. Se os sapatos ainda não tiverem sido expedidos, o reembolso será processado a 100%.</div>
          </li>
          <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
            <span style={{ color: '#E06A55', fontWeight: 'bold' }}>•</span>
            <div><strong>Direito de Livre Resolução (14 dias):</strong> Nos termos da lei de contratos celebrados à distância, o cliente dispõe do direito de resolver o contrato (cancelar a compra após entrega) no prazo de 14 dias seguidos, sem necessidade de justificação. O reembolso inclui o preço do produto e portes pagos, sendo efetuado no prazo máximo de 14 dias úteis a contar da receção dos bens devolvidos.</div>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'resolucao-litigios',
    icon: Scale,
    title: 'Resolução Alternativa de Litígios (RAL)',
    shortDesc: 'Entidades competentes e meios extrajudiciais de arbitragem.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Em caso de litígio decorrente de uma compra online, o consumidor pode recorrer a uma entidade de Resolução Alternativa de Litígios de Consumo (RAL) em Portugal, nos termos da Lei n.º 144/2015.</p>
        <p>Entidades RAL de referência:</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <li style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>•</span>
            <div><strong>CNIACC:</strong> Centro Nacional de Informação e Arbitragem de Conflitos de Consumo (<a href="https://www.cniacc.pt" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--color-winter-blue)' }}>www.cniacc.pt</a>)</div>
          </li>
          <li style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>•</span>
            <div><strong>CACCL:</strong> Centro de Arbitragem de Conflitos de Consumo de Lisboa (<a href="http://www.centroarbitragemlisboa.pt" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--color-winter-blue)' }}>www.centroarbitragemlisboa.pt</a>)</div>
          </li>
        </ul>
        <p>Poderá também registar uma reclamação eletrónica formal acedendo diretamente à Plataforma Oficial do Livro de Reclamações Eletrónico português: <a href="https://www.livrodereclamacoes.pt" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'var(--color-winter-blue)', textDecoration: 'underline' }}>www.livrodereclamacoes.pt</a>.</p>
      </div>
    )
  }
];

const TermsClient = () => {
  // Mobile accordions toggle map
  const [openSections, setOpenSections] = useState({
    'identificacao': true
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
            Termos e Condições
          </h1>
          <p style={{
            maxWidth: '650px',
            margin: '0 auto',
            color: 'var(--color-text-light)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Lê atentamente as regras e condições de funcionamento da nossa loja online para que a tua experiência de compra seja totalmente informada e segura.
          </p>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="privacy-grid">

          {/* DESKTOP SIDEBAR INDEX */}
          <div className="sidebar-menu">
            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '12px' }}>
              Secções dos Termos
            </span>
            {termsSections.map((sect) => {
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
            {termsSections.map((sect) => {
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
            {termsSections.map((sect) => {
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

export default TermsClient;
