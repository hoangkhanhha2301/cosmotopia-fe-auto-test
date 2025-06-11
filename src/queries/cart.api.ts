import { api } from '@/config/axios.config';

export const getAllCart = () => api.get(`api/cart`);
export const AddCart = (model) => api.post(`api/cart/add`, model);
export const UpdateCart = (data) => api.put(`api/cart/update`, data);
export const DeleteCart = (id) => api.delete(`api/cart/remove/${id}`);
// Category
export const getAllCategory = (page?, pageSize?) =>
  api.get('api/Category/GetAllCategory', {
    params: {
      page: page,
      pageSize: pageSize
    }
  });
