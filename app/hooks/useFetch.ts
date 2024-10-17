import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import api from "../lib/Axios";

const fetchData = async(url: string, params = {}) => {
  const response = await api.get(url, { params });
  // console.log(response.data?.allProducts);
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
    staleTime: 5000, // Data will be considered stale after 5 seconds
    refetchOnWindowFocus: true, // Automatically refetch when the window is focused
    refetchOnReconnect: true, // Refetch when the network reconnects
    refetchInterval: false, // You can set this to a number to enable polling
    ...options,
  });
};
