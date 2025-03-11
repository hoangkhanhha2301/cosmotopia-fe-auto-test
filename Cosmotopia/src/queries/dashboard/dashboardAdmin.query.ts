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

// Brand
export const getAllBrand = () => api.get('api/Brand/GetAllBrand');
