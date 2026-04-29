import Layout from './Layout';

const rows = [
  { size: '19', cm: '11.5 - 12.1', age: '9-12 meses' },
  { size: '20', cm: '12.2 - 12.8', age: '12-15 meses' },
  { size: '21', cm: '12.9 - 13.4', age: '15-18 meses' },
  { size: '22', cm: '13.5 - 14.1', age: '18-21 meses' },
  { size: '23', cm: '14.2 - 14.7', age: '21-24 meses' },
  { size: '24', cm: '14.8 - 15.4', age: '2-3 anos' },
  { size: '25', cm: '15.5 - 16.0', age: '3-4 anos' },
];

const SizeGuideClient = () => (
  <Layout>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--color-winter-blue)', marginBottom: '2rem' }}>Guia de Tamanhos</h1>
      <p style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--color-secondary)' }}>Para garantir o conforto e o desenvolvimento natural, é essencial escolher o tamanho certo. Recomendamos deixar uma folga de 0,8 a 1,2 cm.</p>
      <div style={{ overflowX: 'auto', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-card)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Tamanho (EU)</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Comprimento do Pé (cm)</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Idade Aproximada</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem', color: 'var(--color-text)' }}>{row.size}</td>
                <td style={{ padding: '1rem', color: 'var(--color-secondary)' }}>{row.cm}</td>
                <td style={{ padding: '1rem', color: 'var(--color-secondary)' }}>{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#fff5e6', borderRadius: 'var(--border-radius)' }}>
        <h3 style={{ color: 'var(--color-accent-brown)', marginBottom: '1rem' }}>Como Medir?</h3>
        <ol style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-text)' }}>
          <li>Coloque o pé da criança sobre uma folha de papel.</li>
          <li>Marque o calcanhar e a ponta do dedo mais longo.</li>
          <li>Meça a distância entre as marcas.</li>
          <li>Adicione 1cm para a folga ideal.</li>
        </ol>
      </div>
    </div>
  </Layout>
);
export default SizeGuideClient;
