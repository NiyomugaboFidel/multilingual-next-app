import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocalSwitcher from './local-switcher';

export default function Header() {
  const t = useTranslations('Navigation');
  const routes =  [
    {
      name: t('bestSellers'),
      href: '/bestsellers',
    },
    {
      name: t('deals'),
      href: '/deals',
    },
    {
      name: t('newArrivals'),
      href: '/new',
    },
    {
      name: t('giftCards'),
      href: '/gift',
    },
    {
      name: t('helpCenter'),
      href: '/help',
    },
  ];

  return (
    <header className='p-4'>
      <nav className='flex items-center justify-between'>
        {routes.map((item, i)=>(
              <Link key={i} href={item.href}>{item.name}</Link>
 
        ))}
    
        <LocalSwitcher />
      </nav>
    </header>
  );
}