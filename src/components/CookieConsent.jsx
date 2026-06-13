'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

export default function CookieConsent() {
  const [isMounted, setIsMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [customizeMode, setCustomizeMode] = useState(false);
  
  // Default GDPR preferences: necessary is always true, others false until accepted
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    setIsMounted(true);
    let timer;

    // Check if user has already saved preferences
    const savedPrefs = localStorage.getItem('cookie-consent-preferences');
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs));
      } catch (e) {
        console.error('Erro ao ler preferências de cookies:', e);
        timer = setTimeout(() => setShowBanner(true), 3000); // 3 seconds delay
      }
    } else {
      timer = setTimeout(() => setShowBanner(true), 3000); // 3 seconds delay
    }

    // Listener to open settings from the Cookie Policy page or footer
    const handleOpenSettings = () => {
      setShowBanner(true);
      setCustomizeMode(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(allAccepted));
    setShowBanner(false);
    setCustomizeMode(false);
  };

  const handleDeclineAll = () => {
    const allDeclined = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(allDeclined);
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(allDeclined));
    setShowBanner(false);
    setCustomizeMode(false);
  };

  const handleSaveSelection = () => {
    localStorage.setItem('cookie-consent-preferences', JSON.stringify(preferences));
    setShowBanner(false);
    setCustomizeMode(false);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Avoid SSR hydration mismatch: do not render the banner on the server
  if (!isMounted) return null;

  return (
    <>
      {/* Conditionally load Google Analytics script based on user preference */}
      {preferences.analytics && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-LTB0CDNR8T"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LTB0CDNR8T');
            `}
          </Script>
        </>
      )}

      {/* Cookie Banner Overlay / Container */}
      {showBanner && (
        <div className="cookie-banner-overlay" aria-modal="true" role="dialog" aria-labelledby="cookie-title">
          <div className="cookie-card">
            
            {/* Header: Title and Cookie Icon */}
            <div className="cookie-header">
              <svg 
                className="cookie-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
                <path d="M8.5 8.5v.01" strokeWidth="2.5" />
                <path d="M16 15.5v.01" strokeWidth="2.5" />
                <path d="M12 12v.01" strokeWidth="2.5" />
                <path d="M7.5 14.5v.01" strokeWidth="2.5" />
                <path d="M11 18v.01" strokeWidth="2.5" />
              </svg>
              <h3 id="cookie-title">Preferências de Cookies</h3>
            </div>

            {/* Standard banner text */}
            {!customizeMode ? (
              <p className="cookie-text">
                Utilizamos cookies para analisar o tráfego e melhorar o site. Ao clicar em <strong>"Aceitar tudo"</strong>, concorda com o seu uso.
              </p>
            ) : (
              <div className="cookie-custom-panel">
                <p className="cookie-text-small">
                  Escolha que tipo de cookies deseja autorizar. Os cookies necessários garantem o funcionamento correto do nosso site e carrinho de compras.
                </p>

                {/* Preference Toggles */}
                <div className="toggles-container">
                  {/* Necessary (disabled toggle) */}
                  <div className="toggle-row disabled">
                    <div className="toggle-info">
                      <span className="toggle-label">Necessários</span>
                      <span className="toggle-description">Essenciais para navegar e fazer compras. Não podem ser desativados.</span>
                    </div>
                    <div className="toggle-switch-wrapper">
                      <input type="checkbox" checked disabled id="cookie-necessary" />
                      <label htmlFor="cookie-necessary" className="switch-slider"></label>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="toggle-row" onClick={() => togglePreference('analytics')}>
                    <div className="toggle-info">
                      <span className="toggle-label">Analíticos</span>
                      <span className="toggle-description">Google Analytics. Ajudam-nos a entender como os clientes utilizam a loja.</span>
                    </div>
                    <div className="toggle-switch-wrapper">
                      <input 
                        type="checkbox" 
                        checked={preferences.analytics} 
                        onChange={() => {}} // Handled by container onClick
                        id="cookie-analytics" 
                      />
                      <label htmlFor="cookie-analytics" className="switch-slider"></label>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="toggle-row" onClick={() => togglePreference('marketing')}>
                    <div className="toggle-info">
                      <span className="toggle-label">Marketing</span>
                      <span className="toggle-description">Permitem-nos apresentar novidades e publicidade relevantes para si.</span>
                    </div>
                    <div className="toggle-switch-wrapper">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketing} 
                        onChange={() => {}} // Handled by container onClick
                        id="cookie-marketing" 
                      />
                      <label htmlFor="cookie-marketing" className="switch-slider"></label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Buttons */}
            <div className="cookie-actions">
              {!customizeMode ? (
                <>
                  <button onClick={handleDeclineAll} className="btn-cookie-secondary">
                    Recusar
                  </button>
                  <button onClick={() => setCustomizeMode(true)} className="btn-cookie-link">
                    Definições
                  </button>
                  <button onClick={handleAcceptAll} className="btn-cookie-primary">
                    Aceitar tudo
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setCustomizeMode(false)} className="btn-cookie-secondary">
                    Voltar
                  </button>
                  <button onClick={handleSaveSelection} className="btn-cookie-primary">
                    Guardar Escolha
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Embedded CSS styling for premium look, branding compliance and smooth animations */}
      <style jsx="true">{`
        .cookie-banner-overlay {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          font-family: var(--font-main, sans-serif);
          animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          max-width: 440px;
          width: calc(100vw - 48px);
        }

        .cookie-card {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(244, 196, 102, 0.45);
          box-shadow: 0 15px 40px -10px rgba(133, 73, 49, 0.15), 0 2px 10px rgba(0, 0, 0, 0.04);
          border-radius: 24px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          transition: all 0.3s ease;
        }

        .cookie-header {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text, #2c3e50);
        }

        .cookie-icon {
          width: 26px;
          height: 26px;
          color: var(--color-primary, #F4C466);
          flex-shrink: 0;
          animation: cookieWobble 4s ease-in-out infinite;
        }

        .cookie-header h3 {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .cookie-text {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--color-text-light, #666);
          margin: 0;
        }
        
        .cookie-text-small {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--color-text-light, #666);
          margin: 0 0 1rem 0;
        }

        .cookie-custom-panel {
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 1rem;
        }

        .toggles-container {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.02);
          cursor: pointer;
          transition: background 0.2s ease;
          border: 1px solid transparent;
        }

        .toggle-row:hover:not(.disabled) {
          background: rgba(244, 196, 102, 0.06);
          border-color: rgba(244, 196, 102, 0.2);
        }

        .toggle-row.disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .toggle-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-right: 12px;
        }

        .toggle-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-text, #2c3e50);
        }

        .toggle-description {
          font-size: 0.75rem;
          color: var(--color-text-light, #666);
          line-height: 1.3;
        }

        /* Switch toggle styles */
        .toggle-switch-wrapper {
          position: relative;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }

        .toggle-switch-wrapper input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .switch-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .3s;
          border-radius: 34px;
        }

        .switch-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        input:checked + .switch-slider {
          background-color: var(--color-winter-blue, #007396);
        }

        input:checked + .switch-slider:before {
          transform: translateX(20px);
        }

        /* Cookie Action Buttons */
        .cookie-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.6rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 1rem;
          margin-top: 0.2rem;
        }

        .btn-cookie-primary {
          background-color: var(--color-winter-blue, #007396);
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 115, 150, 0.15);
          transition: all 0.2s ease;
        }

        .btn-cookie-primary:hover {
          background-color: #005f7c;
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(0, 115, 150, 0.25);
        }

        .btn-cookie-secondary {
          background-color: transparent;
          color: var(--color-text, #2c3e50);
          padding: 8px 14px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          border: 1.5px solid rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-cookie-secondary:hover {
          background-color: rgba(0, 0, 0, 0.03);
          border-color: rgba(0, 0, 0, 0.3);
        }

        .btn-cookie-link {
          background: none;
          border: none;
          color: var(--color-text-light, #666);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          padding: 8px 10px;
          border-radius: 8px;
          transition: all 0.2s ease;
          margin-right: auto;
        }

        .btn-cookie-link:hover {
          color: var(--color-winter-blue, #007396);
          background-color: rgba(0, 115, 150, 0.05);
        }

        /* Wobble keyframes for the cookie icon to draw gentle attention */
        @keyframes cookieWobble {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.03); }
          52% { transform: rotate(-8deg) scale(1.03); }
          54% { transform: rotate(4deg) scale(1.03); }
          56% { transform: rotate(0deg) scale(1); }
        }

        /* Slide-up entrance animation */
        @keyframes slideUpFade {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Mobile Responsive adjustments with spacing from edges */
        @media (max-width: 580px) {
          .cookie-banner-overlay {
            bottom: 16px;
            right: 16px;
            left: 16px;
            width: auto;
            max-width: calc(100vw - 32px);
            animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .cookie-card {
            border-radius: 20px;
            padding: 1rem;
            gap: 0.8rem;
            border: 1px solid rgba(244, 196, 102, 0.45);
          }

          .cookie-header h3 {
            font-size: 1rem;
          }

          .cookie-icon {
            width: 20px;
            height: 20px;
          }

          .cookie-text {
            font-size: 0.8rem;
            line-height: 1.45;
          }

          .cookie-custom-panel {
            padding-top: 0.6rem;
          }

          .cookie-text-small {
            font-size: 0.75rem;
            margin-bottom: 0.6rem;
          }

          .toggles-container {
            gap: 0.5rem;
          }

          .toggle-row {
            padding: 6px 10px;
          }

          .toggle-label {
            font-size: 0.78rem;
          }

          .toggle-description {
            font-size: 0.68rem;
          }

          .toggle-switch-wrapper {
            width: 38px;
            height: 20px;
          }

          .switch-slider:before {
            height: 14px;
            width: 14px;
            left: 3px;
            bottom: 3px;
          }

          input:checked + .switch-slider:before {
            transform: translateX(18px);
          }

          .cookie-actions {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px;
            width: 100%;
            padding-top: 0.8rem;
          }

          .btn-cookie-primary {
            order: 1;
            flex: 1;
            min-width: 100px;
            padding: 8px;
            font-size: 0.8rem;
          }

          .btn-cookie-secondary {
            order: 2;
            flex: 1;
            min-width: 100px;
            padding: 8px;
            font-size: 0.8rem;
          }

          .btn-cookie-link {
            order: 3;
            width: 100%;
            text-align: center;
            margin: 0;
            padding: 4px;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </>
  );
}
