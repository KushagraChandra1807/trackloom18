import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react"; // ✅ useUser added
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";

const AdminPage = () => {
  const { isLoaded, getToken } = useAuth();
  const { user, isSignedIn } = useUser(); // ✅ useUser added

  const { isAdmin, isLoading, checkAdminStatusWithToken } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  // ✅ Debug logs
  useEffect(() => {
    console.log("🔐 isSignedIn:", isSignedIn);
    console.log("👤 user:", user);
  }, [isSignedIn, user]);

  useEffect(() => {
  const fetchData = async () => {
    if (!isLoaded) return;

    const token = await getToken();
    if (!token) {
      console.warn("❌ No Clerk token found");
      return;
    }

    // Manually check admin status
    await checkAdminStatusWithToken(token);

    // ❗ Re-read Zustand state after awaiting the above
    const latestState = useAuthStore.getState();
    if (!latestState.isAdmin) {
      console.warn("🚫 Not an admin");
      return;
    }

    await Promise.all([
      fetchAlbums(token),
      fetchSongs(token),
      fetchStats(token),
    ]);
  };

  fetchData();
}, [isLoaded, getToken, checkAdminStatusWithToken, fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
