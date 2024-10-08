
import React from 'react'
import ProductList1 from '../organisms/ProductList1'
import NewArrivalBanner from '../molecules/NewArrivalBanner'

const NewArrival = () => {
  return (
    <div className=' flex lg:flex-row flex-col w-full h-full py-[72px] justify-between items-center min-h-[50vh] gap-[24px]'>
        <div className='w-full lg:w-1/3 h-full  '>
        <NewArrivalBanner/>
        </div>
        <div className='w-full lg:w-2/3 bg-black h-full  '>
        <ProductList1 />
        </div>
    </div>
  )
}

export default NewArrival