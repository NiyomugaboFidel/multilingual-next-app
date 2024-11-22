 import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
 
 const CategoryElNavFilter = () => {
    const t =  useTranslations();
   return (
     <div>      <nav className="mb-4">
     <ol className="flex items-center space-x-2 text-bodySmall text-gray-500">
       <li>
         <Link
           href="/"
           className="hover:text-gray-700 hover:underline text-bodySmall text-textColor-dark dark:text-textColor-light"
         >
           {t("Home")}
         </Link>
       </li>
       <li>{"/"}</li>
       <li className="text-gray-700 text-bodySmall dark:text-Gary-300">
       {t("Categories")}
       </li>
     </ol>
   </nav>

   {/* Title */}
   <h1 className="text-headingH3 text-textColor-dark font-[600] dark:text-textColor-light">
     {t("ShopCategory")}
   </h1></div>
   )
 }
 
 export default CategoryElNavFilter