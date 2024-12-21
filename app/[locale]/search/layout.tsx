import Footer from '@/app/UI/organisms/Footer';
import Header from '@/app/UI/organisms/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'This is a Products Search',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
