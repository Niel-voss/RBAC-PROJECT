import { Menu, Moon, Bell, ChevronDown, GraduationCap } from 'lucide-react';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-100 w-full">

      {/* Left Section: Menu & Brand */}
      <div className="flex items-center gap-6 min-w-[200px]">

        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="bg-[#2548C5] p-2 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          {/* Brand Text */}
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm leading-tight">Apex</span>
            <span className="text-xs text-slate-500 font-medium leading-tight">University</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Search Bar Component */}
      <div className="flex-1 flex justify-center px-8">
        <SearchBar />
      </div>

      {/* Right Section: Actions & User Profile */}
      <div className="flex items-center gap-6 min-w-[200px] justify-end">
        {/* Theme Toggle */}
        <button className="text-slate-500 hover:text-slate-800 transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="text-slate-500 hover:text-slate-800 transition-colors relative">
          <Bell className="w-5 h-5" />
          {/* Red Notification Dot */}
          <span className="absolute top-0 right-0.5 block w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <img
            src="/api/placeholder/150/150" // Replace with actual user image source
            alt="Daniel's Avatar"
            className="w-9 h-9 rounded-full object-cover bg-slate-200"
          />
          <div className="flex flex-col hidden sm:flex">
            <span className="text-sm font-semibold text-slate-900 leading-tight">Daniel</span>
            <span className="text-xs text-slate-500 font-medium leading-tight">Student</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>

    </nav>
  );
}