import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import CookieConsent from '@/components/CookieConsent';

export const metadata = {
  title: 'Inpe – Barefoot Shoes',
  description: 'Descubra o conforto natural para toda a família.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          {children}
          <CartDrawer />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}