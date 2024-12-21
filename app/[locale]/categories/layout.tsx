import Footer from '@/app/UI/organisms/Footer';
import Header from '@/app/UI/organisms/Header';
import NewsletterSectionTempalete from '@/app/UI/templat/NewsletterSectionTempalete';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'This is a Products Categories',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
      <NewsletterSectionTempalete />
      <Footer />
    </div>
  );
};

export default Layout;
