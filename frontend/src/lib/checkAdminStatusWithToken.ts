// src/lib/checkAdminStatusWithToken.ts
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";

export const checkAdminStatusWithToken = async (): Promise<boolean> => {
  try {
    const { getToken } = useAuth();
    const token = await getToken();
    
    const response = await axiosInstance.get("/admin/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data?.admin || false;
  } catch (error: any) {
    console.error("Admin check failed:", error?.response?.data?.message || error.message);
    return false;
  }
};
