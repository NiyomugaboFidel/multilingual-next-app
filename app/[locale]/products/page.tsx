'use client'
import { useProductsListBYElectronics } from '@/app/hooks/useFetchProducts';
import React from 'react'

const Products = () => {
      const { data: products, isLoading, error } = useProductsListBYElectronics()
    console.log("list of product", products)
  

  return (
    <div>Products</div>
  )
}

export default Products