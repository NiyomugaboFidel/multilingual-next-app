import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import api from "../lib/Axios";

const fetchData = async(url: string, params = {}) => {
  const response = await api.get(url, { params });
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
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true, 
    refetchInterval: false,
    refetchOnMount: false,
    
    ...options,
  });
};
