import HomeClient2 from '@/components/HomeClient2';
import { getProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Inpe – Pés livres, e felizes!',
  description: 'Sapatos barefoot que acompanham cada passo, permitindo que os pés das crianças cresçam e explorem o mundo com liberdade e conforto.',
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