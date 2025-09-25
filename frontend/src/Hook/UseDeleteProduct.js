// src/Hooks/useDeleteProduct.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../ApiRoute/ApiRoute";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/product/${id}`, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
