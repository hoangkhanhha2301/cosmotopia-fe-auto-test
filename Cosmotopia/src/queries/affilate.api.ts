import { api } from '@/config/axios.config';

export const registerAffiliate = (model) =>
  api.post('api/User/register-affiliate', model);
export const generalLink = (model) =>
  api.post('api/Affiliate/generate-link', model);
