import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <div className='my-10 text-center'>
      <p className='text-center text-sm text-gray-800 leading-[24px]'>{t('copyright')}</p>
    </div>
  );
}