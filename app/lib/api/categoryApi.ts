import api from '../Axios';

// Define category interfaces
interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

// API functions for categories
const fetchCategories = async () => {
  const { data } = await api.get('products/category');
  return data.data;
};

const fetchCategoryById = async (id: string) => {
  const { data } = await api.get(`products/category/${id}`);
  return data.data;
};

const fetchBrandBySubcategory = async (id: string) => {
  const { data } = await api.get(`products/category/brand/${id}`);
  return data.data;
};


const createCategory = async (categoryData: { name: string }) => {
  const { data } = await api.post('products/category/create', categoryData);
  return data.data;
};

const updateCategory = async (id: string, categoryData: { name: string }) => {
  const { data } = await api.put(`products/category/update/${id}`, categoryData);
  return data.data;
};

const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`products/category/delete/${id}`);
  return data.data;
};

// API functions for subcategories
const fetchSubcategoriesByCategoryId = async (categoryId: string) => {
  const { data } = await api.get(`products/category/${categoryId}/subcategories`);
  return data.data;
};

const createSubcategory = async (subcategoryData: { name: string; categoryId: string }) => {
  const { data } = await api.post('products/category/subcategory', subcategoryData);
  return data.data;
};

const updateSubcategory = async (id: string, subcategoryData: { name: string }) => {
  const { data } = await api.put(`products/category/subcategory/${id}`, subcategoryData);
  return data.data;
};

const deleteSubcategory = async (id: string) => {
  const { data } = await api.delete(`products/category/subcategory/${id}`);
  return data.data;
};

// API functions for nested subcategories
const createNestedSubcategory = async (nestedSubcategoryData: { name: string; parentId: string }) => {
  const { data } = await api.post('products/category/nestedsubcategory', nestedSubcategoryData);
  return data.data;
};

const updateNestedSubcategory = async (id: string, nestedSubcategoryData: { name: string }) => {
  const { data } = await api.put(`products/category/nestedsubcategory/${id}`, nestedSubcategoryData);
  return data.data;
};

const deleteNestedSubcategory = async (id: string) => {
  const { data } = await api.delete(`products/category/nestedsubcategory/${id}`);
  return data.data;
};

// API object for category operations
export const CATEGORY_API = {
  categories: {
    key: 'categories',
    fetchAll: fetchCategories,
    fetchById: fetchCategoryById,
    create: createCategory,
    update: updateCategory,
    delete: deleteCategory
  },
  subcategories: {
    key: 'subcategories',
    fetchByCategoryId: fetchSubcategoriesByCategoryId,
    fetchBrandBySucategory: fetchBrandBySubcategory,
    create: createSubcategory,
    update: updateSubcategory,
    delete: deleteSubcategory
  },
  nestedSubcategories: {
    key: 'nestedSubcategories',
    create: createNestedSubcategory,
    update: updateNestedSubcategory,
    delete: deleteNestedSubcategory
  }
};
