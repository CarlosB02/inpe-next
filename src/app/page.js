import HomeClient2 from '@/components/HomeClient2';
import { getProducts } from '@/lib/shopify';
import { getAutomaticDiscounts, applyAutomaticDiscounts } from '@/lib/discounts';

export const metadata = {
  title: 'Inpe – Por Pés livres e felizes!',
  description: 'Sapatos barefoot que acompanham cada passo, permitindo que os pés das crianças cresçam e explorem o mundo com liberdade e conforto.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://inpe.pt',
  },
  openGraph: {
    title: 'Inpe – Por Pés livres e felizes!',
    description: 'Sapatos barefoot que acompanham cada passo, permitindo que os pés das crianças cresçam e explorem o mundo com liberdade e conforto.',
    url: 'https://inpe.pt',
    siteName: 'Inpe',
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Inpe',
      },
    ],
  },
};

export default async function HomePage() {
  let shopifyProducts = [];
  try {
    shopifyProducts = await getProducts({ first: 20 });
    const discounts = await getAutomaticDiscounts();
    shopifyProducts = applyAutomaticDiscounts(shopifyProducts, discounts);
  } catch (err) {
    console.error('Failed to load Shopify products for home:', err);
  }
  return <HomeClient2 initialProducts={shopifyProducts} />;
}