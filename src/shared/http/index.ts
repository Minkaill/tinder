import axios from "axios";
import { config } from "../config";

export const http = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
