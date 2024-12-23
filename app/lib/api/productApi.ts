import api from '../Axios';

interface Product {
  id: string;
}

interface RatingData {
  rating: number;
  comment?: string;
}

const fetchProducts = async (id:string) => {
  const { data } = await api.get(`/products?category_id=${id}`);
  // console.log("message", data.message);
  return data.data;
};

const fetchProductById = async (id: string) => {
  const { data } = await api.get(`/products/item/${id}`);
  return data.data;
};

const fetchSellerItems = async () => {
  const { data } = await api.get('/products/get-items');
  return data.data;
};

const searchProducts = async (query: string) => {
  const { data } = await api.get(`/products/search?query=${query}`);
  return data.data;
};

const getNearExpiryProducts = async () => {
  const { data } = await api.get('/products/near-exp');
  return data.data;
};

const createProduct = async (productData: FormData) => {
  const { data } = await api.post('/products/create', productData);
  return data.data;
};

const updateProduct = async (id: string, productData: FormData) => {
  const { data } = await api.put(`/products/update/${id}`, productData);
  return data.data;
};

const toggleProductAvailability = async (id: string) => {
  const { data } = await api.put(`/products/isavailable/${id}`);
  return data.data;
};

const uploadProductImages = async (id: string, images: FormData) => {
  const { data } = await api.put(`/products/upload/${id}`, images);
  return data.data;
};

const deleteProductImage = async (productId: string, imageId: string) => {
  const { data } = await api.delete(`/products/${productId}/images/${imageId}`);
  return data.data;
};

const rateProduct = async (id: string, ratingData: RatingData) => {
  const { data } = await api.post(`/products/${id}/rating`, ratingData);
  return data.data;
};

// Define fetch functions for categories
const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data.data;
};

const fetchSubcategoriesByCategoryId = async (categoryId: string) => {
  const { data } = await api.get(`/categories/${categoryId}/subcategories`);
  return data.data;
};

// API object with functions and keys
export const PRODUCT_API = {
  products: {
    key: 'products',
    fetchAll: fetchProducts,
    fetchById: fetchProductById,
    fetchSellerItems,
    search: searchProducts,
    getNearExpiry: getNearExpiryProducts,
    create: createProduct,
    update: updateProduct,
    toggleAvailability: toggleProductAvailability,
    uploadImages: uploadProductImages,
    deleteImage: deleteProductImage,
    rate: rateProduct
  }
};

