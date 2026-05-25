'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Menu, Moon, Bell, ChevronDown, GraduationCap,
  LogOut, HelpCircle, Mail
} from 'lucide-react';
import SearchBar from './SearchBar';

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if you click anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-1.5 bg-white border-b border-slate-100 w-full relative z-40">

      {/* Left Section: Menu & Brand */}
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="bg-[#2548C5] p-1 rounded-md flex items-center justify-center">
            <GraduationCap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          {/* Brand Text */}
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-xs leading-none">New Benin</span>
            <span className="text-[9px] text-slate-500 font-medium mt-0.5 leading-none uppercase tracking-wide">University</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Search Bar Component */}
      <div className="flex-1 flex justify-center px-6">
        <SearchBar />
      </div>

      {/* Right Section: Actions & User Profile */}
      <div className="flex items-center gap-3 min-w-[160px] justify-end">

        <button className="text-slate-500 hover:text-slate-800 transition-colors">
          <Moon className="w-3.5 h-3.5" />
        </button>

        <button className="text-slate-500 hover:text-slate-800 transition-colors relative">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute -top-0.5 -right-0.5 block w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile & Dropdown Wrapper */}
        <div className="relative" ref={dropdownRef}>

          {/* Clickable Profile Trigger */}
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-md transition-colors"
          >
            <img
              src="/api/placeholder/150/150"
              alt="Daniel's Avatar"
              className="w-6 h-6 rounded-full object-cover bg-slate-200"
            />
            <div className="flex flex-col hidden sm:flex">
              <span className="text-xs font-semibold text-slate-900 leading-none">Daniel</span>
              <span className="text-[9px] text-slate-500 font-medium leading-none mt-0.5">Student</span>
            </div>
            {/* The Chevron icon rotates when the menu is open */}
            <ChevronDown
              className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {/* The Speech Bubble Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-100 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">

              {/* The little pointer arrow at the top (Speech bubble tip) */}
              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-slate-100 transform rotate-45"></div>

              {/* Relative wrapper to keep content above the pointer arrow */}
              <div className="relative z-10 bg-white rounded-lg flex flex-col">

                <button className="w-full text-left px-3 py-2 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors">
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  Help Center
                </button>

                <button className="w-full text-left px-3 py-2 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors">
                  <Mail className="w-3 h-3 text-slate-400" />
                  Contact Admin
                </button>

                {/* Divider Line */}
                <div className="h-px bg-slate-100 my-1"></div>

                {/* Red Log Out Button */}
                <button className="w-full text-left px-3 py-2 text-[11px] text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium">
                  <LogOut className="w-3 h-3" />
                  Log out
                </button>

              </div>
            </div>
          )}

        </div>
      </div>

    </nav>
  );
}