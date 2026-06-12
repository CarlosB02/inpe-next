import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import Script from 'next/script';

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
        </CartProvider>
      </body>
      {/* Google Analytics */}
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
    </html>
  );
}