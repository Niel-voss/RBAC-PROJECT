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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        {/* Added standard <br /> to force the line break exactly where it is in the image */}
        <h1 className="text-[2.5rem] leading-[1.2] font-bold text-[#0B173D] mb-4">
          Welcome to <br /> Univ. of Miradelle
        </h1>
        <p className="text-gray-500 text-base">Please select your portal to continue:</p>
      </div>

      {/* Main Portals - Forced flex-row so they stay side-by-side on mobile */}
      <div className="flex flex-row gap-4 w-full max-w-md px-2 mb-10">
        <Link
          href="/auth/login"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-4 bg-[#0B173D] text-white text-sm sm:text-base font-medium rounded-xl hover:bg-[#1a2a5e] transition-all shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Student Portal
        </Link>
        <Link
          href="/auth/lecturer-login"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-4 bg-[#F97316] text-white text-sm sm:text-base font-medium rounded-xl hover:bg-[#e06612] transition-all shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="12" rx="2" ry="2" />
            <path d="M12 3v2" />
            <path d="M8 17v3" />
            <path d="M16 17v3" />
          </svg>
          Lecturer Portal
        </Link>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[85%] sm:max-w-md mb-10">
        <hr className="border-t border-gray-300" />
      </div>

      {/* Admin Demo Section */}
      <div className="flex flex-col items-center w-full max-w-sm px-4">
        <button
          onClick={handleAdminDemo}
          disabled={isLoading}
          className="w-full py-3 px-4 border border-[#8B5CF6] text-[#8B5CF6] bg-transparent hover:bg-purple-50 font-medium rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Loading...
            </>
          ) : (
            <>
              {/* Custom SVG combining the shield and the letter A */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9.5 14l2.5-6 2.5 6" />
                <path d="M10.5 12h3" />
              </svg>
              Demo Log in as Admin
            </>
          )}
        </button>

        {/* Forced line break on the description text to match the image precisely */}
        <p className="text-sm text-gray-500 mt-6 text-center leading-relaxed">
          Instantly authenticates via JWT <br />
          and routes to the RBAC dashboard.
        </p>
      </div>
    </div>
  );
}