// Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../atoms/Logo';
import { useTranslations } from 'next-intl';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('footerLinks');

  const footerLinks = {
    company: [
      { label: t('company.about'), href: '/about' },
      { label: t('company.team'), href: '/team' },
      { label: t('company.careers'), href: '/careers' },
      { label: t('company.contact'), href: '/contact' },
      { label: t('company.news'), href: '/news' }
    ],
    account: [
      { label: t('account.yourAccount'), href: '/account' },
      { label: t('account.shipping'), href: '/shipping' },
      { label: t('account.refunds'), href: '/refunds' },
      { label: t('account.delivery'), href: '/delivery' },
      { label: t('account.tracking'), href: '/tracking' },
      { label: t('account.taxes'), href: '/taxes' }
    ],
    customerService: [
      { label: t('customerService.payment'), href: '/payment' },
      { label: t('customerService.guarantee'), href: '/guarantee' },
      { label: t('customerService.returns'), href: '/returns' },
      { label: t('customerService.support'), href: '/support' },
      { label: t('customerService.shipping'), href: '/shipping' },
      { label: t('customerService.terms'), href: '/terms' }
    ],
    categories: [
      t('categories.computers'),
      t('categories.smartphones'),
      t('categories.tvVideo'),
      t('categories.speakers'),
      t('categories.cameras'),
      t('categories.printers'),
      t('categories.videoGames'),
      t('categories.headphones'),
      t('categories.wearable'),
      t('categories.hddSsd'),
      t('categories.smartHome'),
      t('categories.appleDevices'),
      t('categories.tablets'),
      t('categories.monitors'),
      t('categories.scanners'),
      t('categories.servers'),
      t('categories.heatingCooling'),
      t('categories.eReaders'),
      t('categories.dataStorage'),
      t('categories.networking'),
      t('categories.powerStrips'),
      t('categories.plugsOutlets'),
      t('categories.detectorsSensors'),
      t('categories.accessories')
    ]
  };

  return (
    <footer className="dark:bg-Gary-900 bg-Gary-800 text-gray-300 py-12 px-6">
      <div className=" px-[20px]  md:px-[50px] xl:px-[100px]">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 gap-8  md:grid-cols-4 md:gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
          <div className="w-full">
          <Logo textDark="dark:text-[#ffffff]" textLight="text-[#ffffff]" />
        </div>
            <p className="text-sm">Got question? Contact us 24/7</p>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
              <span>Help and consultation</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("title.company")}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={link.href + index}>
                  <Link href={link.href} className="hover:text-white transition-colors text-bodySmall">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("title.account")}</h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link, i) => (
                <li key={link.href + i}>
                  <Link href={link.href} className="hover:text-white transition-colors text-bodySmall">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("title.customerService")}</h3>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link, i) => (
                <li key={link.href + i }>
                  <Link href={link.href} className="hover:text-white transition-colors text-bodySmall">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Categories Section */}
        <div className="border-t border-gray-800 py-8">
          <ul className="flex flex-wrap gap-4">
            {footerLinks.categories.map((category, i) => (
              <li key={category + i}>
                <span className={`${i === 0 ? 'hidden' : '' } text-Gary-700 items-center justify-center` }> / </span> <Link href={`/category/${category.toLowerCase().replace(/ /g, '-')}`} 
                      className=" hover:text-white transition-colors text-bodySmall">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
   <hr className="w-full border border-Gary-700" />
        {/* Bottom Section */}
        <div className="border-t border-gray-800  pt-[24px] flex flex-col md:flex-row justify-between items-center">
          <p className="text-bodySmall mb-4 md:mb-0">
            © {currentYear} All rights reserved. Made by Virunga
          </p>
          <div className="flex items-center justify-center gap-1 sm:gap-2 ">
            <div className='hover:bg-Gary-900 rounded-[6px] flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/visa-logo.svg" alt="Visa" width={40} height={25} className=" w-auto" />
            </div>
            <div className='hover:bg-Gary-900 rounded-[6px] flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/Mastercard-logo.svg" alt="Mastercard" width={40} height={25} className="h-6 w-auto" />
            </div>

            <div className='hover:bg-Gary-900 rounded-[6px] flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/PayPal-logo.svg" alt="PayPal" width={40} height={25} className="h-6 w-auto" />
            </div>
            <div className='hover:bg-Gary-900 rounded-[6px] flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/GooglePay-logo.svg" alt="Google Pay" width={40} height={25} className="h-6 w-auto" />

            </div>
            <div className='hover:bg-Gary-900 rounded-[6px] flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/ApplePay-logo.svg" alt="Apple Pay" width={40} height={25} className="h-6 w-auto" />
            </div>
           
          
        
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;