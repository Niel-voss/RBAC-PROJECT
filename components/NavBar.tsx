"use client";

import NotificationAndProfile from "./NotificationAndProfile";
import { motion } from "framer-motion";
import { Menu, GraduationCap, Search } from "lucide-react";
import { useSidebar } from "./SidebarContext";

interface NavBarProps {
  userName?: string | null;
  userRole?: string | null;
}

// FIX: We pass { userName, userRole } into the function here
export default function NavBar({ userName, userRole }: NavBarProps) {
  const { setIsOpen } = useSidebar();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between px-3 py-3 bg-white border-b border-slate-100 w-full z-50 h-16 shrink-0 gap-2 sm:gap-4 relative"
    >
      {/* Left: Menu Toggle & Brand */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="bg-[#0B173D] p-2 rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <GraduationCap className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-bold text-slate-800 text-sm leading-tight">Univ.</span>
            <span className="text-[10px] text-slate-500 font-medium leading-tight">of Miradelle</span>
          </div>
        </div>
      </div>

      {/* Middle: Adaptive Search Bar */}
      <div className="flex flex-1 justify-center max-w-2xl min-w-0">
        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-full px-3 py-2 w-full transition-all focus-within:ring-2 focus-within:ring-[#0B173D]/20 focus-within:border-[#0B173D]/30">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search for courses, assignments..."
            className="bg-transparent border-none outline-none w-full text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 min-w-0"
          />
        </div>
      </div>

      {/* Right: Profile and Notifications */}
      <NotificationAndProfile
        userName={userName || "User"}
        userRole={userRole || "student"}
      />
    </motion.nav>
  );
}