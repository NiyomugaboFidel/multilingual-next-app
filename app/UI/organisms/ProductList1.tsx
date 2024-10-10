'use client'
import ProductCardArrival from "../molecules/ProductCardArrival"

const ProductList1 = () => {
  return (
    <div className="w-full  min-h-full h-full">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-[24px] min-h-full h-full ">
        {
          Array(8)
          .fill(null)
          .map((_, index) => (
            <ProductCardArrival image="/images/product1.png" id={`${index}`} star={5} price="$449.00 " name="Smart Watch Series 7, White" />
          ))
        }
   
      </div>
    </div>
  )
}

export default ProductList1