// src/Hooks/useUpdateProduct.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../ApiRoute/ApiRoute";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await api.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
