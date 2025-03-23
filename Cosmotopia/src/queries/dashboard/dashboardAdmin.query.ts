import BaseRequest, { api } from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';
// AccoutUser
export const getAllAccount = () => api.get('api/User/GetAllUsers');
export const getAccountById = (id) => api.get(`api/User/GetUserById/${id}`);
export const getAccountSelf = () => api.get('api/User/GetCurrentUser');
export const updateAccountSelf = (model) => api.put(`api/User/EditSelf`, model);
export const updateAccountByAdmin = (model, id) =>
  api.put(`api/User/EditUserStatusAndRole/${id}`, model);

// Product
// const SUB_URL = `api/Product`;
export const getAllProduct = (page, pageSize, search) =>
  api.get(`api/Product/GetAllProduct`, {
    params: {
      page: page,
      pageSize: pageSize,
      search: search
    }
  });
export const getProductDetail = (id) =>
  api.get(`api/Product/GetProductBy/${id}`);
export const AddProduct = (data) => api.post(`api/Product/CreateProduct`, data);
export const UpdateProduct = (data, id) =>
  api.put(`api/Product/UpdateProduct/${id}`, data);
// Category
export const getAllCategory = (page?, pageSize?) =>
  api.get('api/Category/GetAllCategory', {
    params: {
      page: page,
      pageSize: pageSize
    }
  });
export const getCategoryById = (id) =>
  api.get(`api/Category/GetCategoryBy/${id}`);
export const AddCategory = (model) =>
  api.post('api/Category/CreateCategory', model);
export const UpdateCategory = (model, id) =>
  api.put(`api/Category/UpdateCategoryBy/${id}`, model);
export const DeleteCategory = (id) =>
  api.delete(`api/Category/DeleteCategoryBy/${id}`);
// Brand
export const getAllBrand = (page?, pageSize?) =>
  api.get('api/Brand/GetAllBrand', {
    params: {
      page: page,
      pageSize: pageSize
    }
  });
export const getBrandById = (id) => api.get(`api/Brand/GetBrandBy/${id}`);
export const AddBrand = (model) => api.post('api/Brand/CreateBrand', model);
export const UpdateBrand = (model, id) =>
  api.put(`api/Brand/UpdateBrandBy/${id}`, model);
export const DeleteBrand = (id) => api.delete(`api/Brand/DeleteBrandBy/${id}`);

// Order
export const getAllOrder = () => api.get('api/Order');
export const getOrderById = (id) => api.get(`api/Order/${id}`);
export const AddOrder = (model) => api.post('api/Order', model);
export const UpdateOrder = (model, id) => api.put(`api/Order/${id}`, model);
export const DeleteOrder = (id) => api.delete(`api/Order/${id}`);
