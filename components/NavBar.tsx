'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Menu, Bell, GraduationCap, Search,
  HelpCircle, Mail, LogOut
} from 'lucide-react';
import { useSidebar } from './SidebarContext';
// 1. Import the role from your Sidebar file
import { currentUserRole } from './Sidebar-temp';

export default function NavBar() {
  const { setIsOpen } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Note: removed <HTMLDivElement> since this looks like standard JS, not TS

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    <nav className="flex items-center justify-between px-3 py-3 bg-white border-b border-slate-100 w-full z-50 h-16 shrink-0 gap-2 sm:gap-4 relative">
      {/* Left: Menu Toggle & Brand */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="bg-[#3B52D9] p-2 rounded-xl flex items-center justify-center shadow-sm shrink-0">
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
        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-full px-3 py-2 w-full transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
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
          <span className="absolute top-0.5 right-0.5 block w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer shrink-0 hover:ring-2 hover:ring-blue-100 rounded-full transition-all"
          >
            <img
              src="/api/placeholder/150/150"
              alt="Daniel's Avatar"
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-t border-l border-slate-100 transform rotate-45"></div>

              <div className="relative z-10 bg-white rounded-xl flex flex-col">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-sm font-semibold text-slate-800">Daniel</p>

                  {/* 2. Dynamically inject the role here */}
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                    {currentUserRole}
                  </p>

                </div>

                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  Help Center
                </button>

                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400" />
                  Contact Admin
                </button>

                <div className="h-px bg-slate-100 my-1"></div>

                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                  <LogOut className="w-4 h-4 text-red-400" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}