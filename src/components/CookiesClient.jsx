'use client';

import React, { useState, useEffect } from 'react';

export default function CookiesClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('cookie-consent-preferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar preferências:', e);
      }
    }
  }, []);

  const handleToggle = (key) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSavedStatus(false);
  };

  const handleSave = () => {
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(preferences));
    setSavedStatus(true);
    
    // Dispatch custom event to let the layout / CookieConsent component know to reload preferences
    window.dispatchEvent(new CustomEvent('cookie-preferences-updated'));
    
    // If analytics was toggled off, reload the page to ensure script and tracker state are reset
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleOpenBanner = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  if (!isMounted) {
    return (
      <div className="cookies-loading">
        Carregando as suas preferências de privacidade...
      </div>
    );
  }

  return (
    <div className="cookies-client-card">
      <h3 className="cookies-client-title">Painel de Preferências de Rastreamento</h3>
      <p className="cookies-client-desc">
        Abaixo pode gerir ativamente o consentimento para os diferentes tipos de cookies que utilizamos neste website.
      </p>

      <div className="preferences-list">
        {/* Necessary */}
        <div className="preference-item disabled">
          <div className="preference-text-col">
            <div className="preference-name">
              Necessários <span className="badge-required">Sempre Ativo</span>
            </div>
            <p className="preference-desc">
              Estes cookies são estritamente necessários para o funcionamento básico do site, tais como a gestão do carrinho de compras, finalização de encomenda e início de sessão. Não guardam informações pessoais.
            </p>
          </div>
          <div className="preference-toggle-col">
            <input type="checkbox" checked disabled id="page-cookie-necessary" />
            <label htmlFor="page-cookie-necessary" className="switch-slider-custom disabled"></label>
          </div>
        </div>

        {/* Analytics */}
        <div className="preference-item" onClick={() => handleToggle('analytics')}>
          <div className="preference-text-col">
            <div className="preference-name">
              Analíticos 
              <span className={`badge-status ${preferences.analytics ? 'active' : 'inactive'}`}>
                {preferences.analytics ? 'Autorizado' : 'Bloqueado'}
              </span>
            </div>
            <p className="preference-desc">
              Utilizamos o Google Analytics para recolher dados anónimos sobre as páginas mais visitadas, a duração das visitas e o desempenho da loja. Estes dados ajudam-nos a melhorar a usabilidade e qualidade do site.
            </p>
          </div>
          <div className="preference-toggle-col">
            <input 
              type="checkbox" 
              checked={preferences.analytics} 
              onChange={() => {}} // Handled by container onClick
              id="page-cookie-analytics" 
            />
            <label htmlFor="page-cookie-analytics" className="switch-slider-custom"></label>
          </div>
        </div>

        {/* Marketing */}
        <div className="preference-item" onClick={() => handleToggle('marketing')}>
          <div className="preference-text-col">
            <div className="preference-name">
              Marketing 
              <span className={`badge-status ${preferences.marketing ? 'active' : 'inactive'}`}>
                {preferences.marketing ? 'Autorizado' : 'Bloqueado'}
              </span>
            </div>
            <p className="preference-desc">
              Estes cookies servem para apresentar campanhas publicitárias baseadas nos seus interesses fora do nosso site e personalizar comunicações.
            </p>
          </div>
          <div className="preference-toggle-col">
            <input 
              type="checkbox" 
              checked={preferences.marketing} 
              onChange={() => {}} // Handled by container onClick
              id="page-cookie-marketing" 
            />
            <label htmlFor="page-cookie-marketing" className="switch-slider-custom"></label>
          </div>
        </div>
      </div>

      <div className="cookies-client-actions">
        <button onClick={handleOpenBanner} className="btn-cookies-open-banner">
          Abrir Janela de Consentimento
        </button>
        <button onClick={handleSave} className="btn-cookies-save">
          Guardar Configurações
        </button>
      </div>

      {savedStatus && (
        <div className="save-success-banner">
          <svg className="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Preferências guardadas com sucesso! A aplicar alterações...
        </div>
      )}

      <style jsx="true">{`
        .cookies-loading {
          padding: 2rem;
          color: var(--color-text-light, #666);
          font-style: italic;
        }

        .cookies-client-card {
          background: white;
          border-radius: var(--border-radius, 16px);
          padding: 2rem;
          box-shadow: var(--shadow-card, 0 4px 12px rgba(0, 0, 0, 0.05));
          border: 1px solid rgba(0,0,0,0.06);
          text-align: left;
          margin: 3rem 0;
          font-family: var(--font-main, sans-serif);
        }

        .cookies-client-title {
          font-size: 1.4rem;
          fontWeight: 800;
          color: var(--color-text, #2c3e50);
          margin-bottom: 0.5rem;
        }

        .cookies-client-desc {
          font-size: 0.92rem;
          color: var(--color-text-light, #666);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .preferences-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .preference-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.25rem;
          border-radius: 12px;
          background: #fdfdfd;
          border: 1px solid rgba(0,0,0,0.05);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .preference-item:hover:not(.disabled) {
          border-color: rgba(244, 196, 102, 0.5);
          background: #fffdf9;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .preference-item.disabled {
          cursor: not-allowed;
          background: #fafafa;
          opacity: 0.85;
        }

        .preference-text-col {
          flex: 1;
          padding-right: 1.5rem;
        }

        .preference-name {
          font-size: 1rem;
          font-weight: 800;
          color: var(--color-text, #2c3e50);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .badge-required {
          background: #e0f2f1;
          color: #00796b;
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .badge-status {
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .badge-status.active {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .badge-status.inactive {
          background: #ffebee;
          color: #c62828;
        }

        .preference-desc {
          font-size: 0.85rem;
          color: var(--color-text-light, #666);
          line-height: 1.5;
          margin: 0;
        }

        .preference-toggle-col {
          display: flex;
          align-items: center;
          align-self: center;
        }

        /* Toggle switch */
        .preference-toggle-col input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch-slider-custom {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
          background-color: #ccc;
          border-radius: 34px;
          transition: .3s;
          cursor: pointer;
        }

        .switch-slider-custom:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: .3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        input:checked + .switch-slider-custom {
          background-color: var(--color-winter-blue, #007396);
        }

        input:checked + .switch-slider-custom:before {
          transform: translateX(24px);
        }

        .switch-slider-custom.disabled {
          background-color: var(--color-winter-blue, #007396);
          cursor: not-allowed;
          opacity: 0.5;
        }

        .cookies-client-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-cookies-open-banner {
          background: transparent;
          color: var(--color-text, #2c3e50);
          border: 1.5px solid rgba(0,0,0,0.15);
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-cookies-open-banner:hover {
          background: rgba(0,0,0,0.03);
          border-color: rgba(0,0,0,0.3);
        }

        .btn-cookies-save {
          background: var(--color-winter-blue, #007396);
          color: white;
          border: none;
          padding: 11px 24px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 115, 150, 0.15);
          transition: all 0.25s ease;
        }

        .btn-cookies-save:hover {
          background: #005f7c;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 115, 150, 0.25);
        }

        .save-success-banner {
          margin-top: 1.5rem;
          background: #e8f5e9;
          color: #2e7d32;
          padding: 1rem;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideDownIn 0.3s ease forwards;
        }

        .success-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        @keyframes slideDownIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .cookies-client-card {
            padding: 1.25rem;
            margin: 1.5rem 0;
          }

          .preference-item {
            flex-direction: column;
            gap: 12px;
          }

          .preference-text-col {
            padding-right: 0;
          }

          .preference-toggle-col {
            align-self: flex-end;
          }

          .cookies-client-actions {
            flex-direction: column;
            width: 100%;
          }

          .cookies-client-actions button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
