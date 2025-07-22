import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  name: string;
  passions: number[];
  media: Array<{ id: number; url: string }>;
  setName: (name: string) => void;
  setPassions: (ids: number[]) => void;
  setMedia: (items: Array<{ id: number; url: string }>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      name: "",
      passions: [],
      media: [],
      setName: (name) => set({ name }),
      setPassions: (passions) => set({ passions }),
      setMedia: (media) => set({ media }),
      reset: () => set({ name: "", passions: [], media: [] }),
    }),
    {
      name: "onboarding-storage",
      storage: {
        getItem: (key) => {
          const json = sessionStorage.getItem(key);
          return json ? JSON.parse(json) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key);
        },
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setMedia([]);
        }
      },
    }
  )
);
