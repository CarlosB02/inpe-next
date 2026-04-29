import './globals.css';

export const metadata = {
  title: 'Inpe – Barefoot Shoes',
  description: 'Descubra o conforto natural para toda a família.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}