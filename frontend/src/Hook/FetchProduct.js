import { useQuery } from "@tanstack/react-query";
import { api } from "../ApiRoute/ApiRoute";

const fetchProducts = async () => {
  const res = await api.get("/product/fetch");
  console.log(res.data.products); // 👈 yahan sahi jagah hai
  return res.data.products || []; // sirf array return karo
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
