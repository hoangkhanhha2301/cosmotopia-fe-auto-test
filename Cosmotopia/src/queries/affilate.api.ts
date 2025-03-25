import { api } from '@/config/axios.config';

export const registerAffiliate = (model) =>
  api.post('api/Affiliate/register', model);
export const generalLink = (productID) =>
  api.post(`api/Affiliate/create-link?productId=${productID}`);
export const trackClick = (ref) =>
  api.get(`api/Affiliate/track-click?referralCode=${ref}`);
