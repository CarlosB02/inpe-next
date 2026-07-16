import CollectionsClient2 from '@/components/CollectionsClient2';
import { getCollectionProducts } from '@/lib/shopify';
import { getAutomaticDiscounts, applyAutomaticDiscounts } from '@/lib/discounts';

export default async function LojaCategoryPage({ params }) {
  const { category } = await params;
  let products = [];
  try {
    products = await getCollectionProducts({ collection: category, first: 100 });
    const discounts = await getAutomaticDiscounts();
    products = applyAutomaticDiscounts(products, discounts);
  } catch (err) {
    console.error('Failed to load category products:', err);
  }
  return <CollectionsClient2 initialProducts={products} />;
}