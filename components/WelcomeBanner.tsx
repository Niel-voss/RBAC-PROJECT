"use client";

import { motion } from "framer-motion";

// 1. Define the props the banner expects to receive
interface WelcomeBannerProps {
  name: string;
  matricNumber: string;
  department: string;
  level?: string; // Optional, defaults to "400 Level" if not provided
}

export default function WelcomeBanner({
  name,
  matricNumber,
  department,
  level = "400 Level - Semester 2"
}: WelcomeBannerProps) {

  // 2. Extract just the first name for the greeting (optional but looks nice)
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full overflow-hidden bg-[#0A2268] rounded-xl p-4 shadow-sm flex items-center min-h-[96px]"
    >
      <div className="relative z-10 flex flex-col gap-1.5 max-w-2xl">
        {/* Dynamic Greeting */}
        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Welcome back, {firstName}! <span className="animate-wave origin-bottom-right inline-block text-base">👋</span>
        </h1>

        <div className="flex flex-wrap gap-1.5 mt-0.5">
          {/* Dynamic Badges */}
          <span className="px-2 py-0.5 bg-[#25419A] text-white text-[10px] font-medium rounded-full shadow-inner border border-white/5">
            Matric {matricNumber}
          </span>
          <span className="px-2 py-0.5 bg-[#25419A] text-white text-[10px] font-medium rounded-full shadow-inner border border-white/5">
            {department}
          </span>
          <span className="px-2 py-0.5 bg-[#25419A] text-white text-[10px] font-medium rounded-full shadow-inner border border-white/5">
            {level}
          </span>
        </div>

        <p className="text-blue-100 text-[11px] mt-0.5 font-medium">
          You&apos;re doing great! Keep up the excellent work this semester.
        </p>
      </div>

      {/* Right Background Illustration (Unchanged) */}
      <div className="absolute right-0 bottom-0 h-full w-1/3 max-w-[200px] opacity-20 pointer-events-none overflow-hidden flex items-end justify-end">
        <svg viewBox="0 0 400 200" className="w-full h-auto translate-y-1 translate-x-1 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" fillOpacity="0.4" d="M330 90c0-13.3 10.7-24 24-24 10.2 0 19 6.4 22.4 15.6 2.5-2.3 6-3.6 10-3.6 7.9 0 14.4 6.5 14.4 14.4s-6.5 14.4-14.4 14.4h-56.4c-13.3 0-24-10.7-24-24z" />
          <path fill="currentColor" fillOpacity="0.3" d="M70 120c0-10 8-18 18-18 7.7 0 14.2 4.8 16.8 11.8 1.9-1.7 4.4-2.8 7.2-2.8 6 0 10.8 4.8 10.8 10.8s-4.8 10.8-10.8 10.8H88c-10 0-18-8-18-18z" />
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M80 200v-50h60v-30h120v30h60v50" />
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M140 120V60l60-40 60 40v60" />
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M180 60v-40M220 60v-40" />
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M200 20v-15" />
          <circle cx="200" cy="85" r="12" stroke="currentColor" strokeWidth="1.5" />
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M200 85v-6m0 0h4" />
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M185 120v80m30-80v80" />
          <rect x="190" y="110" width="20" height="30" rx="10" stroke="currentColor" strokeWidth="1.5" />
          <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M190 200v-30h20v30" />
          <rect x="95" y="165" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
          <rect x="115" y="165" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
          <rect x="95" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
          <rect x="115" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
          <rect x="275" y="165" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
          <rect x="295" y="165" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
          <rect x="275" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
          <rect x="295" y="135" width="12" height="20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </motion.div>
  );
}