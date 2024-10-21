'use client'
import useFetchProducts from "@/app/hooks/useFetchProducts";
import ProductCard1 from "../molecules/ProductCards"
import { IoIosArrowForward } from "react-icons/io";

const TrendingProducts:React.FC = () => {
  const { data, error, isFetched , isLoading} = useFetchProducts();
  const products:any = data
  return (
    <div className="flex flex-col w-full h-full my-[100px]">
        <div className="flex justify-between items-start w-full  border-gray-500 border-b-[1px] pb-[24px] ">
            <h3 className="lg:text-[28px]  lg:leading-[36px] text-[23px] leading-[30px] font-semibold">Trending Products</h3>
            <button className=" py-[5px] text-Gary-700 dark:text-textColor-light flex gap-[6px]  items-center  justify-center   text-[14px] leading-[20px] font-[500] "><p>View All</p> <IoIosArrowForward /> </button>

        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px] py-[24px]">
        {products?.rows?.map((item:any, index:number) => (
              <ProductCard1 key={item.id} index={index} 
              image={item.images && item.images.length > 0 ? item.images[0] : '/images/product1.png'}
              id={item.id}
              star={5}
              price={item.price}
              name={item.name}
              bonus={item.bonus}
              title={item.title}
              isLoading={isLoading}
              />
        ))
          }
       
       
       
        </div>
    </div>
  )
}

export default TrendingProducts