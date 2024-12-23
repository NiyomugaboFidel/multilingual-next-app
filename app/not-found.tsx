'use client';

import { useRouter } from 'next/navigation';
// import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();
  // const locale = useLocale();

  useEffect(() => {
    router.push(`/en/not-found`);
  }, [router]);

  return (<>
  <html>
    <body>
    </body>
  </html>
 
  </>)
}
