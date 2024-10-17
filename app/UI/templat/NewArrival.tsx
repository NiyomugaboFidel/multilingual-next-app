
import React from 'react'
import ProductList1 from '../organisms/ProductList1'
import NewArrivalBanner from '../molecules/NewArrivalBanner'
import { useTranslations } from 'next-intl'

const NewArrival = () => {
  const t = useTranslations('HomePage.Heading');
  return (
    <div className='py-[72px] w-full h-full'>
       <h2 className='text-headingH2 font-semibold py-[32px] p-3'>{t('NewArrivals')}</h2>
        <div className=' flex lg:flex-row flex-col w-full h-full  justify-between items-start  gap-[24px]'>
        <div className='w-full lg:w-1/3 h-full  '>
        <NewArrivalBanner/>
        </div>
        <div className='w-full lg:w-2/3 h-full  '>
        <ProductList1 />
        </div>
        </div>
        
    </div>
  )
}

export default NewArrival