import { PRODUCT_API } from "../lib/api/productApi";
import { useCustomQuery } from "./useCustomQuery";
import { useFetchData } from "./useFetch";

const useFetchProducts = ({id}:{id:string}) => {
  return useFetchData("products", `/products?c=${id}`,{
    staleTime:  30 * 1000,
    cacheTime: 5 * 60 * 1000   
  });
};

export default useFetchProducts;

// Usage example with useCustomQuery
export function useProductsListBYElectronics() {
  const categoryId = "f7151f84-3bdb-4bcc-ae2f-1780b44312ab"
  return useCustomQuery(
    [PRODUCT_API.products.key, "Electronics" ],
    ()=> PRODUCT_API.products.fetchAll(categoryId)
  );
}

export function useProductsListBYFashion() {
  const categoryId = "016a5ae4-5d97-481d-b72b-4d5e968c0071"
  return useCustomQuery(
    [PRODUCT_API.products.key, "Fashion" ],
    ()=> PRODUCT_API.products.fetchAll(categoryId)
  );
}

export function useProductsListBYFurniture() {
  const categoryId = "cd006f4e-0054-4f7a-a28e-fc117fb5283f"
  return useCustomQuery(
    [PRODUCT_API.products.key, "Furniture" ],
    ()=> PRODUCT_API.products.fetchAll(categoryId)
  );
}
export function useProductsListBYGrocery() {
  const categoryId = "7e6c8bab-6384-4641-9e54-e6bc5193fb61"
  return useCustomQuery(
    [PRODUCT_API.products.key, "Grocery" ],
    ()=> PRODUCT_API.products.fetchAll(categoryId)
  );
}


export function useSellerProducts() {
  const { data: products } = useCustomQuery(
    ['seller-products'],
    PRODUCT_API.products.fetchSellerItems
  );
}

export function useProductDetails({ id }: { id: string }) {
  const { data: product } = useCustomQuery(
    [PRODUCT_API.products.key, id],
    () => PRODUCT_API.products.fetchById(id)
  );
}