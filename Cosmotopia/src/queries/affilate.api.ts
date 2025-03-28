import { api } from '@/config/axios.config';

export const getAffiliateProfile = () => api.get('api/Affiliate/profile');

export const registerAffiliate = (model) =>
  api.post('api/Affiliate/register', model);
export const generalLink = (productID) =>
  api.post(`api/Affiliate/generate-link`, { productId: productID });
export const trackClick = (ref) =>
  api.get(`api/Affiliate/track-click`, { params: { referralCode: ref } });
export const getAllWithDrawSelf = () => api.get(`/api/Affiliate/withdrawals`);
export const getAllWithDrawManager = () =>
  api.get(`/api/Affiliate/manager/withdrawals`);
export const withDraw = (model) => api.post(`/api/Affiliate/withdraw`, model);
export const conFirmWithDraw = (id, model?) =>
  api.put(`/api/Affiliate/withdraw/${id}/status`, model);
export const getAllLinkAffiliate = () => api.get(`/api/Affiliate/links`);
