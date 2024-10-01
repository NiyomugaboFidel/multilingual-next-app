import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocalSwitcher from './local-switcher';

export default function Header() {
  const t = useTranslations('Navigation');

  return (
    <header className='p-4'>
      <nav className='flex items-center justify-between'>
        <Link href='/'>{t('home')}</Link>
        <Link href='/about'>About</Link>
        <Link href='/services'>Services</Link>
        <LocalSwitcher />
      </nav>
    </header>
  );
}