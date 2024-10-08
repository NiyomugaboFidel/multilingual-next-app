'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { ChangeEvent, useTransition } from 'react';
import Icon from '../UI/atoms/Icon';
import svg from '../data/svgIcon';

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

  const languages = [
    {
      value:'en',
      label:'English'
    },
    {
      value:'fr',
      label:'French'
    },
    {
      value:'rw',
      label:'kinyarwanda'
    },
  ]

  return (
    <label className="w-full flex lg:border-[1.5px] px-1 rounded-sm">
      <Icon iconTag={svg.earth} icontype={false} />
      <select
        defaultValue={localeActive}
        className="w-full bg-transparent border-none outline-none duration-0"
        onChange={onSelectChange}
        disabled={isPending}
      >
       { 
        languages.map((item, index)=>(
          <option className='w-full dark:text-textColor text-textColor-dark dark:bg-primaryColor-dark bg-Gary-100 ' key={index} value={item.value}>{item.label}</option>
        ))

       }
       
      </select>
    </label>


  );
}
