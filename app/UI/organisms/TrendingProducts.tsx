import ProductCard1 from "../molecules/ProductCards"

const TrendingProducts:React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full my-[100px]">
        <div className="flex justify-between items-center w-full  border-gray-500 border-b-[1px] pb-[24px] ">
            <h3 className="text-[28px] leading-[36px] font-semibold">Trending Products</h3>
            <span>View All</span>
        </div>
        <div className="grid grid-cols-3">
          <ProductCard1 />
          <ProductCard1 />
          <ProductCard1 />
          <ProductCard1 />
          <ProductCard1 />
        </div>
    </div>
  )
}

export default TrendingProducts