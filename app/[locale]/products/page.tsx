'use client'
import { useProductsListBYElectronics, useProductsListBYFashion, useProductsListBYFurniture, useProductsListBYGrocery } from '@/app/hooks/useFetchProducts';
import React from 'react'

const Products = () => {
      const { data: Electronicsproducts } = useProductsListBYElectronics()
    console.log({Electronicsproducts})
  
    const { data: Fashionproducts } = useProductsListBYFashion()
    console.log({Fashionproducts})
  
    const { data: Furnitureproducts } = useProductsListBYFurniture()
    console.log({Furnitureproducts})
    const { data: Groceryproducts } = useProductsListBYGrocery()
    console.log({Groceryproducts})
  return (
    <div className=" flex items-center justify-center min-h-screen w-full text-center font-semibold text-primaryColor-light">
    Produts
</div>
  )
}

export default Products