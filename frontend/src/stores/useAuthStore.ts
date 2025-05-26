import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  error: string | null;
  isLoading: boolean;

  checkAdminStatus: () => Promise<void>;
  checkAdminStatusWithToken: (token: string) => Promise<void>; // ✅ Added this
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  // ✅ OLD: Without token — commented
  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response?.data?.admin || false });
    } catch (error: any) {
      // set({ isAdmin: false, error: error.response.data.message });
      const message =
        error?.response?.data?.message || "Failed to check admin status";
      set({ isAdmin: false, error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ NEW: With token passed from component
  checkAdminStatusWithToken: async (token: string) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axiosInstance.get("/admin/check", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Attach token manually
      },
    });
    set({ isAdmin: response.data.admin });
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to check admin status";
    set({ isAdmin: false, error: message });
  } finally {
    set({ isLoading: false });
  }
},


  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
