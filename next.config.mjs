/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','upload.wikimedia.org'], // Add the Cloudinary domain here
      },
};
 
export default withNextIntl(nextConfig);
