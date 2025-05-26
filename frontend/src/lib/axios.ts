import axios from "axios";

// ❌ Incorrect approach for React SPA
// import { auth } from "@clerk/clerk-js";
// import { auth } from "@clerk/clerk-react";

// ✅ Correct: use useAuth from Clerk React
//import { useAuth } from "@clerk/clerk-react";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"
});

// ❗️We can't use useAuth() directly here because it's a React hook and this file is NOT a React component.
// Instead, you'll pass the token manually from inside your components (see below).

/*
axiosInstance.interceptors.request.use(
  async (config) => {
    const { getToken } = useAuth(); // ❌ This will crash because useAuth() is a hook
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
*/
