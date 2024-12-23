import { CATEGORY_API } from "../lib/api/categoryApi";
import { useCustomQuery } from "./useCustomQuery";

export function useCategoryList() {
    return useCustomQuery(
        [CATEGORY_API.categories.key],
        ()=> CATEGORY_API.categories.fetchAll()
      );
}

export function useCategoryListByElectronics() {
    const categoryId = "f7151f84-3bdb-4bcc-ae2f-1780b44312ab"
    return useCustomQuery(
      [CATEGORY_API.categories.key, categoryId ],
      ()=> CATEGORY_API.categories.fetchById(categoryId)
    );
  }