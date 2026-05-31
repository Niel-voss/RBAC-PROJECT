import DashboardStats from "@/components/DashboardStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import Schedule from "@/components/Schedule";
import { SidebarProvider } from "@/components/SidebarContext";

export default function Home() {
  return (
    <>
      <SidebarProvider >
        <WelcomeBanner />
        <DashboardStats />
        <Schedule />
      </SidebarProvider>
    </>
  );
}
