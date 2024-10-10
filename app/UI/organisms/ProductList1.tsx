'use client'
import ProductCardArrival from "../molecules/ProductCardArrival"

const ProductList1 = () => {
  return (
    <div className="w-full min-w-[300px]  2xl:w-[416px] h-full ">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-[24px] h-full ">
        {
          Array(8)
          .fill(null)
          .map((_, index) => (
            <ProductCardArrival />
          ))
        }
   
      </div>
    </div>
  )
}

export default ProductList1