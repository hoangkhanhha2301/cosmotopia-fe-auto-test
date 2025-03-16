import { api } from '@/config/axios.config';

export const forgotPassword = (email) =>
  api.post('api/User/forgotpassword', { email: email });
export const resetPassword = (model) => api.post('api/User/newPass', model);
export const getAccountSelf = () => api.get('api/User/GetCurrentUser');
