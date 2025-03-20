import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  checked: false,
  setChecked: (checked) => set({ checked }),
  pdfs: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setPdfs: (pdfs) => set({ pdfs }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useStore;
