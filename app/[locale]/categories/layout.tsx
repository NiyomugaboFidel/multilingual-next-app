import Header from '@/app/UI/organisms/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'This is a Products Categories',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default Layout;
