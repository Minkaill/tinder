import { http } from "@/shared/http";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../type/User";

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["userQuery"],
    queryFn: async () => {
      const rs = await http<User[]>("custom_users");

      return rs.data;
    },
  });
};
