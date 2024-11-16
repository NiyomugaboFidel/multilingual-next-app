// Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../atoms/Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  const footerLinks = {
    company: [
      { label: 'About company', href: '/about' },
      { label: 'Our team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact us', href: '/contact' },
      { label: 'News', href: '/news' }
    ],
    account: [
      { label: 'Your account', href: '/account' },
      { label: 'Shipping rates & policies', href: '/shipping' },
      { label: 'Refunds & replacements', href: '/refunds' },
      { label: 'Delivery info', href: '/delivery' },
      { label: 'Order tracking', href: '/tracking' },
      { label: 'Taxes & fees', href: '/taxes' }
    ],
    customerService: [
      { label: 'Payment methods', href: '/payment' },
      { label: 'Money back guarantee', href: '/guarantee' },
      { label: 'Product returns', href: '/returns' },
      { label: 'Support center', href: '/support' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Term and conditions', href: '/terms' }
    ],
    categories: [
      'Computers', 'Smartphones', 'TV, Video', 'Speakers', 'Cameras', 'Printers',
      'Video Games', 'Headphones', 'Wearable', 'HDD/SSD', 'Smart Home', 
      'Apple Devices', 'Tablets', 'Monitors', 'Scanners', 'Servers',
      'Heating and Cooling', 'E-readers', 'Data Storage', 'Networking',
      'Power Strips', 'Plugs and Outlets', 'Detectors and Sensors', 'Accessories'
    ]
  };

  return (
    <footer className="bg-Gary-800 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 gap-8  md:grid-cols-4 md:gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
          <div className="w-full">
          <Logo textDark="dark:text-[#ffffff]" textLight="text-[#ffffff]" />
        </div>
            <p className="text-sm">Got question? Contact us 24/7</p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center space-x-2">
              <span>Help and consultation</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer service</h3>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
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
              <li key={category}>
                <span className={`${i === 0 ? 'hidden' : '' } text-Gary-700 items-center justify-center` }> / </span> <Link href={`/category/${category.toLowerCase().replace(/ /g, '-')}`} 
                      className="text-sm hover:text-white transition-colors">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {currentYear} All rights reserved. Made by Virunga
          </p>
          <div className="space-x-4 grid grid-cols-3 md:grid-cols-5 ">
            <div className='bg-Gary-800 rounded-[6px] hover:bg-Gary-900 flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/visa-logo.svg" alt="Visa" width={40} height={25} className=" w-auto" />
            </div>
            <div className='bg-Gary-800 rounded-[6px] hover:bg-Gary-900 flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/Mastercard-logo.svg" alt="Mastercard" width={40} height={25} className="h-6 w-auto" />
            </div>

            <div className='bg-Gary-800 rounded-[6px] hover:bg-Gary-900 flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/PayPal-logo.svg" alt="PayPal" width={40} height={25} className="h-6 w-auto" />
            </div>
            <div className='bg-Gary-800 rounded-[6px] hover:bg-Gary-900 flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/GooglePay-logo.svg" alt="Google Pay" width={40} height={25} className="h-6 w-auto" />

            </div>
            <div className='bg-Gary-800 rounded-[6px] hover:bg-Gary-900 flex items-center justify-normal p-2 w-[58px] h-[40px]'>
            <Image src="/icons/ApplePay-logo.svg" alt="Apple Pay" width={40} height={25} className="h-6 w-auto" />
            </div>
           
          
        
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;