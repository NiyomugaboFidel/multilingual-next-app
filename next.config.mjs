/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, 
  },
    images: {
      domains: ['res.cloudinary.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', 
        },
      ],
      },
};
export const dynamic = 'force-dynamic' 

export default withNextIntl(nextConfig);
