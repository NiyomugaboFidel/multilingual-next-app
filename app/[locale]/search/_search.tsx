import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchBYElectronics } from '@/app/hooks/useSearch';
import { useProductsListBYElectronics } from '@/app/hooks/useFetchProducts';

const SearchProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search_query = searchParams.get('search_query') ?? '';
  
  const { data: searchResults, isLoading } = useSearchBYElectronics(search_query);
  const products = searchResults?.data?.results || [];
  const { data:product, error , isLoading:isLoadingExists } = useProductsListBYElectronics();
  // Debounce search to avoid too many API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search_query);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearchTerm !== search_query) {
        if (debouncedSearchTerm.trim()) {
          router.push(`/search?search_query=${encodeURIComponent(debouncedSearchTerm)}`);
        } else {
          router.push('/search');
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, router, search_query]);

  const handleSearch = (e:any) => {
    setDebouncedSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative mb-6">
        <Input
          type="search"
          placeholder="Search electronics..."
          className="w-full pl-10 pr-4 py-2"
          value={debouncedSearchTerm}
          onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product:any) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={product.productimages[0]?.url || '/api/placeholder/400/400'}
                    alt={product.name}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-green-600">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="mr-2">★ {product.average_rating}</span>
                  <span>({product.review_count} reviews)</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.map((tag:any, index:number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {products.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-600">No products found</p>
        </div>
      )}
 <hr />
 <h2>other product you can like</h2>
{products.length === 0 && !isLoading &&  product &&(


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.map((product:any) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={product.productimages[0]?.url || '/api/placeholder/400/400'}
                    alt={product.name}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-green-600">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="mr-2">★ {product.average_rating}</span>
                  <span>({product.review_count} reviews)</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.map((tag:any, index:number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>)} 
      
    </div>
  );
};

export default SearchProducts;