import { create } from "zustand";

type AuthState = {
  errAuth: string | null;
  setErrAuth: (errAuth: string) => void;
};

export const useAuth = create<AuthState>((set) => ({
  errAuth: "",
  setErrAuth: (errAuth) => set({ errAuth }),
}));
