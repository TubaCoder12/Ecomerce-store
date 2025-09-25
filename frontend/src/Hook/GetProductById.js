// src/Hooks/useGetProductById.js
import { useQuery } from "@tanstack/react-query";
import { api } from "../ApiRoute/ApiRoute";

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(`/product/${id}`, { withCredentials: true });
      return res.data.product;
    },
    enabled: !!id, // id na ho to query na chale
  });
};
