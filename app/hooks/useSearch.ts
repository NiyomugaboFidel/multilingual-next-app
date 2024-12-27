import { PRODUCT_API } from "../lib/api/productApi";
import { useCustomQuery } from "./useCustomQuery";

export function useSearchBYElectronics(query: string) {
    const categoryId = "f7151f84-3bdb-4bcc-ae2f-1780b44312ab";
    
    return useCustomQuery(
      [PRODUCT_API.products.key, `Electronics+${query}`],
      () => PRODUCT_API.products.search(query, categoryId),
      {
        enabled: !!query, 
      }
    );
  }