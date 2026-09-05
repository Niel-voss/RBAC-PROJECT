'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);

  // The magic function that securely logs the user in without a form
  const handleAdminDemo = async () => {
    setIsLoading(true);

    await signIn('credentials', {
      email: 'admin@oluku.edu.ng',
      password: 'adminpassword123',
      redirectTo: '/admin',
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 sm:pt-24 pb-8 px-4 sm:px-6 bg-[#FAFAFA] font-sans overflow-x-hidden">

      <div className="w-full max-w-3xl z-10 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-[#111827] mb-3 leading-tight">
            Welcome to the<br /> University of Benin
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Please select your portal to continue:
          </p>
        </div>

        {/* Main Portals - Width tightly constrained to remove excess right space */}
        <div className="flex flex-row gap-3 sm:gap-4 w-full max-w-md mb-8">

          {/* Student Portal */}
          <Link
            href="/auth/login"
            className="flex-1 flex items-center justify-center sm:justify-between px-3 sm:px-5 py-3 sm:py-4 bg-[#0F172A] text-white rounded-xl sm:rounded-2xl hover:bg-[#1e293b] transition-all shadow-md group"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-[0.75rem] sm:text-sm font-medium">Student Portal</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>

          {/* Lecturer Portal */}
          <Link
            href="/auth/lecturer-login"
            className="flex-1 flex items-center justify-center sm:justify-between px-3 sm:px-5 py-3 sm:py-4 bg-[#F97316] text-white rounded-xl sm:rounded-2xl hover:bg-[#ea580c] transition-all shadow-md group"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-100">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <line x1="3" x2="21" y1="9" y2="9" />
                <line x1="9" x2="9" y1="21" y2="9" />
              </svg>
              <span className="text-[0.75rem] sm:text-sm font-medium">Lecturer Portal</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>

        </div>

        {/* Divider - Matched to the new button width */}
        <div className="w-full max-w-md flex items-center mb-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-[0.65rem] text-gray-400 font-medium tracking-wide uppercase">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Admin Demo Section - Matched to the new button width */}
        {/* Admin Demo Section - Centered and scaled to fit text content naturally */}
        <div className="w-full max-w-md mb-10 flex justify-center">
          <button
            onClick={handleAdminDemo}
            disabled={isLoading}
            className="w-auto px-6 sm:px-8 py-3 sm:py-3.5 border border-[#D8B4FE] bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#6B21A8] rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-60 disabled:cursor-not-allowed group shadow-sm"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-[#6B21A8] flex-shrink-0" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9.5 14l2.5-6 2.5 6" />
                <path d="M10.5 12h3" />
              </svg>
            )}
            <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
              {isLoading ? 'Authenticating...' : 'Demo Log in as Admin'}
            </span>
            {!isLoading && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block flex-shrink-0">
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
          </button>
        </div>

        {/* Postscript / About Card */}
        <div className="w-full max-w-3xl bg-[#FFFBF4] border border-[#FDEECE] rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 relative overflow-hidden shadow-sm flex flex-col">

          <div className="flex flex-row gap-3 sm:gap-5 relative z-10 items-stretch">

            {/* Left Quote Icon - Top aligned */}
            <div className="flex-shrink-0 flex items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F3E8FF] text-[#6B21A8] rounded-full flex items-center justify-center text-xl sm:text-2xl font-serif font-bold">
                “
              </div>
            </div>

            {/* Content Box with BOTH Left and Right Borders */}
            <div className="flex-1 border-l-2 border-r-2 border-[#E9D5FF] px-4 sm:px-6 flex flex-col md:flex-row gap-6">

              {/* Text Area */}
              <div className="flex-1">
                <h2 className="text-[#111827] text-lg sm:text-xl font-bold mb-3">About this project</h2>
                <div className="space-y-3 text-gray-700 text-xs sm:text-sm leading-relaxed">

                  <div className="space-y-3 text-gray-700 text-xs sm:text-sm leading-relaxed">
                    <p>
                      This is a software engineering portfolio project, not a real academic institution. <br className="hidden sm:block" />
                      It was built from the ground up to demonstrate a production-ready <br className="hidden sm:block" />
                      <strong className="text-[#6B21A8] font-semibold">Role-Based Access Control (RBAC)</strong> system.
                    </p>
                  </div>
                  <p>
                    Ps: My primary focus of this project lies under the hood: demonstrating <br className="hidden sm:block" />
                    enterprise-grade security, centralized authentication, and the decoupling <br className="hidden sm:block" />
                    of authorization logic from the application code, so if any feature is&apos;nt functional, they were left intentionaly unstyled to keep the focus on the security architecture.
                  </p>
                </div>
              </div>

              {/* Graphic Area */}
              <div className="hidden md:flex items-end justify-end opacity-90 pb-2">
                <svg width="160" height="120" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <circle cx="160" cy="50" r="40" fill="#FEF3C7" className="opacity-50" />
                  <path d="M0 140 H200" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M20 140 V110 M20 110 C 10 110, 10 90, 20 90 C 30 90, 30 110, 20 110 Z" stroke="currentColor" strokeWidth="1" fill="#FFFBF4" />
                  <path d="M180 140 V105 M180 105 C 170 105, 170 85, 180 85 C 190 85, 190 105, 180 105 Z" stroke="currentColor" strokeWidth="1" fill="#FFFBF4" />
                  <path d="M165 140 V120 M165 120 C 158 120, 158 105, 165 105 C 172 105, 172 120, 165 120 Z" stroke="currentColor" strokeWidth="1" fill="#FFFBF4" />
                  <rect x="50" y="80" width="100" height="60" stroke="currentColor" strokeWidth="1" fill="#FFFBF4" />
                  <rect x="60" y="80" width="10" height="60" stroke="currentColor" strokeWidth="1" />
                  <rect x="85" y="80" width="10" height="60" stroke="currentColor" strokeWidth="1" />
                  <rect x="105" y="80" width="10" height="60" stroke="currentColor" strokeWidth="1" />
                  <rect x="130" y="80" width="10" height="60" stroke="currentColor" strokeWidth="1" />
                  <path d="M45 80 L100 50 L155 80 Z" stroke="currentColor" strokeWidth="1" fill="#FFFBF4" />
                  <circle cx="100" cy="68" r="4" stroke="currentColor" strokeWidth="1" />
                  <path d="M100 50 V30 L115 35 L100 40" stroke="currentColor" strokeWidth="1" fill="none" />
                  <rect x="92" y="110" width="16" height="30" stroke="currentColor" strokeWidth="1" />
                  <rect x="62" y="100" width="6" height="12" stroke="currentColor" strokeWidth="1" />
                  <rect x="132" y="100" width="6" height="12" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Right Quote Icon - Bottom aligned */}
            <div className="flex-shrink-0 flex items-end">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F3E8FF] text-[#6B21A8] rounded-full flex items-center justify-center text-xl sm:text-2xl font-serif font-bold mt-auto">
                ”
              </div>
            </div>

          </div>

          {/* Card Footer */}
          <div className="mt-6 pt-5 border-t border-[#FDEECE] flex items-center gap-2 text-[#6B7280] text-xs font-medium z-10 relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Built as a Final Year Project.
          </div>
        </div>

        {/* Global Footer */}
        <div className="mt-10 mb-6 text-center text-gray-500 text-xs flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">

          {/* Name and Tagline Group (Always on same line) */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">Thomas Daniel</span>
            <span className="text-gray-300">|</span>
            <span>Secure. Role-based. Built for Learning.</span>
          </div>

          {/* Desktop Divider */}
          <span className="hidden sm:inline text-gray-300">|</span>

          {/* Copyright */}
          <span>© 2025 Miradelle</span>

        </div>

      </div>
    </div>
  );
}
