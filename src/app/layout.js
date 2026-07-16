import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import CookieConsent from '@/components/CookieConsent';

export const metadata = {
  metadataBase: new URL("https://inpe.pt"),

  title: {
    default: "Inpe | Calçado Barefoot Infantil",
    template: "%s | Inpe",
  },

  description:
    "Descubra uma seleção de calçado barefoot infantil pensado para acompanhar o desenvolvimento natural dos pés das crianças.",

  keywords: [
    "calçado barefoot",
    "sapatos barefoot",
    "calçado barefoot infantil",
    "primeiros passos",
    "sapatos criança",
    "barefoot portugal",
  ],

  authors: [{ name: "Inpe" }],
  creator: "Inpe",
  publisher: "Inpe",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://inpe.pt",
    siteName: "Inpe",
    title: "Inpe | Calçado Barefoot Infantil",
    description:
      "Descubra uma seleção de calçado barefoot infantil pensado para acompanhar o desenvolvimento natural dos pés das crianças.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Inpe",
      },
    ],
  },

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