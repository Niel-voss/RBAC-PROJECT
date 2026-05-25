import DashboardStats from "@/components/DashboardStats";
import WelcomeBanner from "@/components/WelcomeBanner";
import Schedule from "@/components/Schedule";

export default function Home() {
  return (
    <>
      <WelcomeBanner />
      <DashboardStats />
      <Schedule />
    </>
  );
}
