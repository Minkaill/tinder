export interface AppConfig {
  apiUrl: string;
  enableZustandDevtools: boolean;
}

export const config: AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL as string,
  enableZustandDevtools:
    import.meta.env.VITE_ENABLE_ZUSTAND_DEVTOOLS === "true",
};
