import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/app/UI/organisms/Header';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Categories',
  description = 'This is a Products Categories',
  keywords = 'Categories, Products, Game, Electronics',
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        {/* Basic SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Social Media Metadata */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://virunga.vercel.app" />
        <meta property="og:image" content="https://virunga.vercel.app/og-image.png" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://virunga.vercel.app/twitter-image.png" />
      </Head>
      <Header />
      <main className="flex-grow p-4">{children}</main>
    
    </div>
  );
};

export default Layout;
