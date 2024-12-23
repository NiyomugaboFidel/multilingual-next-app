import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
type QueryConfig<TData> = Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;

export const useCustomQuery = <TData>(
  queryKey: QueryKey,
  fetchFn: () => Promise<TData>,
  config?: QueryConfig<TData>
) =>{
  return useQuery({
    queryKey:queryKey,
    queryFn: fetchFn,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true, 
    refetchInterval: false,
    refetchOnMount: false,
    ...config,
  });
}
