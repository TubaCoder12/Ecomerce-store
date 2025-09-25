// src/Hooks/useAddProduct.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../ApiRoute/ApiRoute";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await api.post("/product/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      // refresh products list if available
      queryClient.invalidateQueries(["products"]);
    },
  });
};
