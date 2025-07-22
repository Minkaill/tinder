import { http } from "@/shared/http";
import { useQuery } from "@tanstack/react-query";
import type { Passion } from "../types/Passios";

export const useGetPassionQuery = () => {
  return useQuery({
    queryKey: ["passionQuery"],
    queryFn: async () => {
      const rs = await http.get<Passion[]>("/passions");

      return rs.data;
    },
  });
};
