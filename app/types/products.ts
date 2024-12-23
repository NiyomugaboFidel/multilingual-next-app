interface Product {
    id: string;
    name: string;
    title: string;
    description?: string;
    category_id: string;
    sub_category_id?: string;
    nestedsub_category_id?: string;
    brand?: string;
    price: number;
    discount?: number;
    currency: string;
    stock_availability: string;
    stock_quantity?: number;
    average_rating?: number;
    ratings?: number[];
    review_count?: number;
    tags?: string[];
    isAvailable: boolean;
    expiry_date?: string;
    isExpired?: boolean;
    seller_id: string;
    seller_name?: string;
    seller_rating?: number;
    free_shipping?: boolean;
    delivery_time?: string;
    return_policy?: string;
    createdAt: string;
    updatedAt?: string;
    category: Category;
    productimages?: ProductImage[];
    productvariations?: ProductVariation[];
    productspecifications?: ProductSpecification[];
  }
  
  interface Category {
    id: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
    subcategories?: SubCategory[];
  }
  
  interface SubCategory {
    id: string;
    category_id: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
    nestedsubcategories?: NestedSubCategory[];
  }
  
  interface NestedSubCategory {
    id: string;
    subcategory_id: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
  }
  
  interface ProductImage {
    id: string;
    product_id: string;
    url: string;
    alt_text?: string;
    imageColor?: string;
    createdAt: string;
    updatedAt?: string;
  }
  
  interface ProductVariation {
    id: string;
    product_id: string;
    color?: string | null;
    price: number;
    createdAt: string;
    updatedAt?: string;
  }
  
  interface ProductSpecification {
    id: string;
    product_id: string;
    spec_key: string;
    spec_value: string;
    createdAt: string;
    updatedAt?: string;
  }
  