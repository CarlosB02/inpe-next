import ContactClient from '@/components/ContactClient';
export const metadata = { title: 'Contactos – Inpe Barefoot', description: 'Entre em contacto connosco.' };
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function ContactosPage() { return <ContactClient />; }