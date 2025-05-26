import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

// ✅ For admin check
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

// ✅ New: Clerk useAuth to get token
import { useAuth } from "@clerk/clerk-react";

function App() {
  // ✅ OLD: token-less admin check
  // const { checkAdminStatus } = useAuthStore();

  // ✅ NEW: token-based admin check
  const { checkAdminStatusWithToken, isAdmin, isLoading } = useAuthStore();
  const { getToken } = useAuth();

  useEffect(() => {
    const check = async () => {
      const token = await getToken();
      if (token) {
        await checkAdminStatusWithToken(token);
      }
    };
    check();

    // ✅ OLD call without token
    // checkAdminStatus();
  }, []);

  console.log("Is admin?", isAdmin); // ✅ For debug

  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
        />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        {/* ✅ Conditional admin route */}
        <Route
          path="/admin"
          element={
            isLoading ? (
              <div>Loading...</div>
            ) : isAdmin ? (
              <AdminPage />
            ) : (
              <Navigate to="/" /> // ✅ Redirect non-admins to home
              // <NotFoundPage /> // ❌ Old behavior: show error page
            )
          }
        />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
