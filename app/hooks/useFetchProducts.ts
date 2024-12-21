import { useFetchData } from "./useFetch";

const useFetchProducts = ({id}:{id:string}) => {
  return useFetchData("products", `/products?c=${id}`,{
    staleTime:  30 * 1000,
    cacheTime: 5 * 60 * 1000   
  });
};

export default useFetchProducts;
