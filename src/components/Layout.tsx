import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  noPadding?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, backgroundColor, noPadding }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: backgroundColor || 'transparent' }}>
    <Header />
    <main style={{ flex: 1, paddingTop: noPadding ? '0' : '80px' }}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
