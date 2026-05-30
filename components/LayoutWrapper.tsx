"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/Sidebar-temp";
import { SidebarProvider } from "@/components/SidebarContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Add any routes here where you DO NOT want the navbar and sidebar
  const isAuthPage = pathname === "/signup" || pathname === "/login";

  // If it's the signup or login page, just render the plain content
  if (isAuthPage) {
    return (
      <main className="flex-1 h-screen overflow-y-auto bg-slate-50">
        {children}
      </main>
    );
  }

  // Otherwise, render the full app layout with NavBar and SideBar
  return (
    <SidebarProvider>
      {/* Top Navigation spans the full width */}
      <NavBar />

      {/* Bottom section: Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        <SideBar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}