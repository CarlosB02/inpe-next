import Layout from '@/components/Layout';
import CookiesClient from '@/components/CookiesClient';

export const metadata = {
  title: 'Política de Cookies – Inpe',
  description: 'Saiba como utilizamos cookies para melhorar a sua experiência na Inpe.',
};

export default function CookiesPage() {
  return (
    <Layout>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
        fontFamily: 'var(--font-main, sans-serif)',
        color: 'var(--color-text, #2c3e50)',
        lineHeight: '1.7'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '900',
          color: 'var(--color-winter-blue, #007396)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Política de Cookies
        </h1>
        
        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: 'var(--color-text-light, #666)' }}>
          Na <strong>Inpe</strong>, acreditamos na transparência e no respeito pela sua privacidade. Esta Política de Cookies explica de forma clara o que são cookies, como os utilizamos na nossa loja online e como pode gerir as suas preferências.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '2.5rem', marginBottom: '1rem' }}>
          O que são Cookies?
        </h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Cookies são pequenos ficheiros de texto que são descarregados e armazenados no seu dispositivo (computador, telemóvel ou tablet) quando visita um website. Estes ficheiros permitem que o site reconheça o seu dispositivo, guarde as suas preferências (como itens no carrinho ou credenciais de sessão) e recolha dados estatísticos de navegação.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '2.5rem', marginBottom: '1rem' }}>
          Como e por que utilizamos Cookies?
        </h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Utilizamos cookies para assegurar que a sua experiência de compra seja fluida e personalizada. Especificamente, dividimos os nossos cookies nas seguintes categorias:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Cookies Necessários:</strong> Cruciais para que o website funcione de forma correta. Permitem adicionar produtos ao carrinho, avançar para o checkout de forma segura e aceder a áreas protegidas do site.</li>
          <li><strong>Cookies Analíticos (Desempenho):</strong> Ajudam-nos a monitorizar o tráfego da loja, medir quais as páginas mais populares e identificar possíveis erros. Toda a informação recolhida é agregada e anónima.</li>
          <li><strong>Cookies de Marketing:</strong> Usados para apresentar promoções ou anúncios adaptados aos seus interesses, tanto no nosso site como em plataformas de terceiros (como redes sociais).</li>
        </ul>

        {/* Interactive Preferences Panel */}
        <CookiesClient />

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '2.5rem', marginBottom: '1rem' }}>
          Como controlar ou eliminar Cookies?
        </h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Para além de usar o painel acima para gerir os seus consentimentos, pode configurar o seu navegador de internet (browser) para bloquear ou alertar sobre estes cookies. Tenha em atenção que desativar os cookies necessários poderá afetar o correto funcionamento de certas funcionalidades da loja online.
        </p>
        <p style={{ marginBottom: '1.2rem' }}>
          Para gerir cookies diretamente no seu navegador, consulte a secção de ajuda do mesmo.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '2.5rem', marginBottom: '1rem' }}>
          Atualizações desta Política
        </h2>
        <p style={{ marginBottom: '1.2rem' }}>
          Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nos cookies que utilizamos ou por motivos operacionais, legais ou regulamentares. Aconselhamos a consulta regular desta página para se manter informado.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light, #666)', marginTop: '2rem', fontStyle: 'italic' }}>
          Última atualização: {new Date().toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </Layout>
  );
}
