'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { ChangeEvent, useTransition } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname(); // Get the current path

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      // Replace the current locale in the path with the new locale
      const newPath = `/${nextLocale}${pathname.slice(3)}`; // Adjust the path by replacing the locale part
      router.replace(newPath);
    });
  };

  return (
    <label className="border-2 rounded">
      <p className="sr-only">Change language</p>
      <select
        defaultValue={localeActive}
        className="bg-transparent py-2"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="id">Indonesian</option>
        <option value="fr">French</option>
        <option value="rw">Kinyarwanda</option>
      </select>
    </label>
  );
}
