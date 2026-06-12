import HomeClient2 from '@/components/HomeClient2';
import { getProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Inpe – Pegadas Felizes (Barefoot Natural)',
  description: 'Um novo design divertido e saudável para os pezinhos das crianças!',
};

export default async function HomePage() {
  let shopifyProducts = [];
  try {
    shopifyProducts = await getProducts({ first: 20 });
  } catch (err) {
    console.error('Failed to load Shopify products for home:', err);
  }
  return <HomeClient2 initialProducts={shopifyProducts} />;
}