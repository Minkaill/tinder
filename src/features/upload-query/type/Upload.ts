export interface Upload {
  file: File;
}

export interface UploadResponse {
  id: number;
  url: string;
  format: string;
  bytes: number;
  fileName: string;
  height: number;
  width: number;
}
