import { useFetchData } from "./useFetch";

const useFetchProducts = () => {
  return useFetchData("products", "/products",{
    staleTime: 10 * 60 * 1000,   // Cache data for 5 minutes
  });
};

export default useFetchProducts;
