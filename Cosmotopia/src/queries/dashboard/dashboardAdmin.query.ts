import BaseRequest, { api } from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

// Product
// const SUB_URL = `api/Product`;
export const getAllProduct = () => api.get('api/Product/GetAllProduct');
export const getProductDetail = (id) =>
  api.get(`api/Product/GetProductBy/${id}`);
export const AddProduct = (data) => api.post(`api/Product/CreateProduct`, data);

// Category
export const getAllCategory = () => api.get('api/Category/GetAllCategory');
export const getCategoryById = (id) =>
  api.get(`api/Category/GetCategoryBy/${id}`);
export const AddCategory = (model) =>
  api.post('api/Category/CreateCategory', model);
export const UpdateCategory = (model, id) =>
  api.put(`api/Category/UpdateCategoryBy/${id}`, model);
export const DeleteCategory = (id) =>
  api.delete(`api/Category/DeleteCategoryBy/${id}`);
// Brand
export const getAllBrand = () => api.get('api/Brand/GetAllBrand');
export const getBrandById = (id) => api.get(`api/Brand/GetBrandBy/${id}`);
export const AddBrand = (model) => api.post('api/Brand/CreateBrand', model);
export const UpdateBrand = (model, id) =>
  api.put(`api/Brand/UpdateBrandBy/${id}`, model);
export const DeleteBrand = (id) => api.delete(`api/Brand/DeleteBrandBy/${id}`);
