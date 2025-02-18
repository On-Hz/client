import { create } from "zustand";

type AuthMode = "login" | "signup";

interface AuthModalState {
  isModalOpen: boolean;
  authMode: AuthMode;
  openAuthModal: (mode: AuthMode) => void;
  closeAuthModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isModalOpen: false,
  authMode: "login",
  openAuthModal: (mode: AuthMode) => set({ isModalOpen: true, authMode: mode }),
  closeAuthModal: () => set({ isModalOpen: false }),
}));
