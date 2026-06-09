"use client";

import { Bell, HelpCircle, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { logout } from "../lib/auth";
import { usePathname } from "next/navigation";

// Define the expected props for dynamic data
interface NotificationAndProfileProps {
  userName?: string;
  userRole?: string;
}

export default function NotificationAndProfile({
  userName = "System User",
  userRole
}: NotificationAndProfileProps) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fallback to URL path if no explicit role is passed from the server
  const pathSegments = pathname.split("/");
  const fallbackRole = pathSegments[1] || "student";
  const activeRole = (userRole || fallbackRole).toLowerCase();

  // --- Helper 1: Extract Initials ---
  const getInitials = (name: string) => {
    if (!name) return "--";
    // Split the name by spaces and remove any empty strings
    const parts = name.trim().split(/\s+/);

    if (parts.length >= 2) {
      // Take the first letter of the first two words (e.g., "Prof Adewale" -> "PA")
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    // Fallback if they only have one name
    return name[0].toUpperCase();
  };

  // --- Helper 2: Determine Avatar Color ---
  const getAvatarColor = (role: string) => {
    if (role === "lecturer") {
      // Orange for Lecturers
      return "bg-[#ea580c]";
    }
    // Dark Blue for Students and default
    return "bg-[#0B173D]";
  };

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
    <div className="flex items-center gap-3 sm:gap-5 justify-end shrink-0">
      <button className="text-slate-500 hover:text-slate-800 transition-colors relative p-1">
        <Bell className="w-5 h-5" />
        <span className="absolute top-0.5 right-0.5 block w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
      </button>

      <div className="relative flex items-center gap-1" ref={dropdownRef}>

        {/* Dynamic Initials Avatar */}
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border border-slate-200 cursor-pointer hover:ring-2 hover:ring-slate-300 transition-all ${getAvatarColor(activeRole)}`}
        >
          {getInitials(userName)}
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
            <div className="relative z-10 bg-white rounded-xl flex flex-col">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                {/* Dynamically display the injected name and role */}
                <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide truncate">{activeRole}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <HelpCircle className="w-4 h-4 text-slate-400" /> Help Center
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                <LogOut className="w-4 h-4 text-red-400" /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}