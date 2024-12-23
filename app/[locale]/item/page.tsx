'use client';

import { useProductDetails } from "@/app/hooks/useFetchProducts";
import { useSearchParams } from "next/navigation";

const Item = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const { data: item, isLoading, isFetched } = useProductDetails(id);

//   console.log("product by id:", item);

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 justify-center items-center text-center font-semibold bg-gray-100 text-gray-700">
      {isLoading && <p className="text-black">Loading...</p>}
      {item && isFetched && (
        <div className="p-4 rounded-md shadow-md font-[400] bg-gray-200 text-black  w-[250px] h-[250px]">
          <p className="text-lg font-bold">{item?.name}</p>
          <p className="text-sm text-gray-600">{item?.brand}</p>
          <p className="text-base mt-2 line-clamp-2">{item?.description}</p>
        </div>
      )}
      {!isLoading && !item && (
        <p className="text-gray-500">No product details found for the given ID.</p>
      )}
    </div>
  );
};

export default Item;
