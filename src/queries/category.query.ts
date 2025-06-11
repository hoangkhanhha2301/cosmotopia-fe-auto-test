import { useQuery } from "@tanstack/react-query";
import BaseRequest from "@/config/axios.config";

const SUB_URL = "api/Category";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["get_all_categories"],
    queryFn: async () => {
      return await BaseRequest.Get2(`/${SUB_URL}/GetAllCategory`);
    },
    staleTime: 1000 * 60 * 5, 
  });
};
