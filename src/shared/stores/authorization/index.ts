import { http } from "@/shared/http";
import type { AxiosResponse } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IUser {
  passions: number[];
  name: string;
  media: Array<{ id: number; url: string }>;
}

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  isPending: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthStore extends AuthState {
  login: (user: IUser) => Promise<IUser | undefined>;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isPending: false,
  error: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    ...initialState,

    login: async (user) => {
      try {
        set((state) => {
          state.isPending = true;
          state.error = null;
        });

        const getResp: AxiosResponse<IUser[]> = await http.get("custom_users");

        let found = getResp.data.find((u) => u.name === user.name);

        if (!found) {
          const postResp: AxiosResponse<IUser> = await http.post(
            "custom_users",
            user
          );
          found = postResp.data;
        }

        set((state) => {
          state.user = found!;
          state.isAuthenticated = true;
          state.isPending = false;
        });

        return found;
      } catch (error) {
        console.error("Auth error:", error);
        return undefined;
      }
    },

    logout: () =>
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
      }),
  }))
);
