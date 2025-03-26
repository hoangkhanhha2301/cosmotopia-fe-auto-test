import { api } from '@/config/axios.config';

export const registerAffiliate = (model) =>
  api.post('api/Affiliate/register', model);
export const generalLink = (productID) =>
  api.post(`api/Affiliate/create-link?productId=${productID}`);
export const trackClick = (ref) =>
  api.get(`api/Affiliate/track-click?referralCode=${ref}`);
export const getAllWithDrawSefl = (model) =>
  api.post(`/api/Affiliate/withdraw`, model);
export const getAllWithDraw = (model) =>
  api.post(`/api/Affiliate/withdraw`, model);
export const withDraw = (model) => api.post(`/api/Affiliate/withdraw`, model);
export const conFirmWithDraw = (model) =>
  api.put(`/api/Affiliate/withdraw`, model);
