import { useMutation } from "@tanstack/react-query";
import BaseRequest from "@/config/axios.config";

const SUB_URL = `api/Product`;

interface ProductPagingParams {
  page: number;
  pageSize: number;
}

export const useGetListProductsByPaging = () => {
  return useMutation({
    mutationKey: ["get_products"],
    mutationFn: async ({ page, pageSize }: ProductPagingParams) => {
      return BaseRequest.Get(`/${SUB_URL}/GetAllProduct?page=${page}&pageSize=${pageSize}`);
    },
  });
};
