"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/Sidebar-temp";
import { SidebarProvider } from "@/components/SidebarContext";

// 1. Define the props to accept the session data
interface LayoutWrapperProps {
  children: React.ReactNode;
  userName?: string | null;
  userRole?: string | null;
}

export default function LayoutWrapper({ children, userName, userRole }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Add any routes here where you DO NOT want the navbar and sidebar
  const isAuthPage =
    pathname === "/auth/signUp" ||
    pathname === "/auth/login" ||
    pathname === "/unauthorized" ||
    pathname === "/auth/lecturer-login" ||
    pathname === "/terms" ||
    pathname === "/";

  // Extract the role from the URL (e.g., /student/dashboard -> "student")
  const pathSegments = pathname.split('/');

  // Cast it to the specific types your SideBar expects, with a safe fallback to "student"
  const currentRole = (pathSegments[1] === 'lecturer' || pathSegments[1] === 'admin')
    ? pathSegments[1]
    : 'student';

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
      {/* Wrapper to ensure the NavBar and Sidebar take up exactly the full screen height */}
      <div className="flex flex-col h-screen">

        {/* Top Navigation spans the full width */}
        {/* 2. Pass the dynamic session props to NavBar! */}
        <NavBar userName={userName} userRole={userRole} />

        {/* Bottom section: Sidebar and Main Content */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* We pass the dynamic role here! */}
          <SideBar role={currentRole} />

          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}