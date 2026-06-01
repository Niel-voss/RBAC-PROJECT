"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Bell, GraduationCap, Search, HelpCircle, LogOut, ChevronUp } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function NavBar() {
  const { setIsOpen } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const activeRole = pathSegments[1] || "student";

  const userProfiles: Record<string, { name: string; avatarAlt: string }> = {
    student: { name: "Thomas Daniel", avatarAlt: "Daniel's Avatar" },
    lecturer: { name: "Dr. Adewale", avatarAlt: "Lecturer Avatar" },
    admin: { name: "System Admin", avatarAlt: "Admin Avatar" },
  };

  const currentUser = userProfiles[activeRole] || userProfiles["student"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

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
            <span className="font-bold text-slate-800 text-sm leading-tight">Federal Univ.</span>
            <span className="text-[10px] text-slate-500 font-medium leading-tight">of Oluku</span>
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

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3 sm:gap-5 justify-end shrink-0">
        <button className="text-slate-500 hover:text-slate-800 transition-colors relative p-1">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0.5 right-0.5 block w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="relative flex items-center gap-1" ref={dropdownRef}>
          <img
            src="/api/placeholder/150/150"
            alt={currentUser.avatarAlt}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 cursor-pointer hover:ring-2 hover:ring-[#0B173D]/20 transition-all"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <button
            aria-label="Open profile menu"
            className="flex items-center justify-center p-1 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ transform: "rotate(180deg)" }}
          >
            <ChevronUp className="w-4 h-4 text-slate-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
              <div className="relative z-10 bg-white rounded-xl flex flex-col">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-sm font-semibold text-slate-800">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">{activeRole}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <HelpCircle className="w-4 h-4 text-slate-400" /> Help Center
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                  <LogOut className="w-4 h-4 text-red-400" /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}