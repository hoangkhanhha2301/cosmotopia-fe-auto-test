import BaseRequest from "@/config/axios.config";
import { useMutation, useQuery } from "@tanstack/react-query";

const SUB_URL = `api/Payment`;


export const useGetDetailPayment = (id?: string) => {
    return useQuery({
      queryKey: ['get_detail_payment'], 
      queryFn: async () => {
        return await BaseRequest.Get2(`/${SUB_URL}/payment/${id}`);
      },
    });
};

export const useUpdatePaymentStatus = () => {
    return useMutation({
      mutationKey: ["update_payment_status"],
      mutationFn: async ({ paymentId, newStatus }: { paymentId: string; newStatus: number }) => {
        return await BaseRequest.Put(`/api/Payment/update-payment-status/${paymentId}?newStatus=${newStatus}`, {});
      },
    });
  };
  