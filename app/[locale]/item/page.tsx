'use client';

import { useProductDetails } from "@/app/hooks/useFetchProducts";
import { useSearchBYElectronics } from "@/app/hooks/useSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

const Item = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const { data: item, isLoading, isFetched } = useProductDetails(id);
  const [query, setQuery] = useState<string>('');
  const  search_query = searchParams.get('search_query') ?? '';
  // Use the custom search hook here with the query
  const router = useRouter()

  const { data: searchResults } = useSearchBYElectronics(search_query);
  const currentRoute = usePathname();
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`${currentRoute}?search_query=${encodeURIComponent(query)}`);
    }
    console.log("results", searchResults);
    console.log(search_query)
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 justify-center items-center text-center font-semibold bg-gray-100 text-gray-700">
      <div>
        <input
          className="w-full py-[10px] border rounded-md"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {isLoading && <p className="text-black">Loading...</p>}
      {item && isFetched && (
        <div className="p-4 rounded-md shadow-md font-[400] bg-gray-200 text-black w-[250px] h-[250px]">
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
