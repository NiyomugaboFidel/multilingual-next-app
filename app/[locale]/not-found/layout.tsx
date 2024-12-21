import Footer from '@/app/UI/organisms/Footer';
import Header from '@/app/UI/organisms/Header';
import NewsletterSectionTempalete from '@/app/UI/templat/NewsletterSectionTempalete';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not-found',
  description: 'This is a Not-found page Virunga online shop',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <main>{children}</main>
      <NewsletterSectionTempalete />
      <Footer/>
    </div>
  );
};

export default Layout;
