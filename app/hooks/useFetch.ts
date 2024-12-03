import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import api from "../lib/Axios";

const fetchData = async(url: string, params = {}) => {
  const response = await api.get(url, { params });
  // console.log(response);
  return response.data?.allProducts
  ;
};

export const useFetchData = <T>(
  key: string,
  url: string,
  params?: any,
  options?: UseQueryOptions<T>
): UseQueryResult => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(url, params),
    staleTime: 5000,
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true, 
    refetchInterval: false,
    ...options,
  });
};
