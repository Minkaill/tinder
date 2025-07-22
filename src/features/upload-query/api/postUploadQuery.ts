import { useMutation } from "@tanstack/react-query";
import type { UploadResponse } from "../type/Upload";
import { http } from "@/shared/http";

export const useUploadQuery = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await http.post<UploadResponse>("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};
