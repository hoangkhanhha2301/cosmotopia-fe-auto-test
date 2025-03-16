import { useMutation, useQuery } from "@tanstack/react-query";
import BaseRequest from "@/config/axios.config";

const SUB_URL = `api/Product`;

interface ProductPagingParams {
  page: number;
  pageSize: number;
}

export const useGetListProductsByPaging = ({ page, pageSize }: ProductPagingParams) => {
  return useQuery({
    queryKey: ["get_products", page, pageSize], // Thêm page và pageSize vào key để caching tốt hơn
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/GetAllProduct?page=${page}&pageSize=${pageSize}`);
    },
    staleTime: 1000 * 60 * 5, // Giữ dữ liệu cache trong 5 phút
  });
};

export const useGetDetailProduct = (id?: string) => {
  return useQuery({
    queryKey: ['get_detail_product'], // Thêm id để quản lý cache riêng biệt
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/GetProductBy/${id}`);
    },
  });
};