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
      email: 'admin@oluku.edu.ng',       // Ensure this exists in your DB!
      password: 'adminpassword123',      // Ensure this matches your DB!
      redirectTo: '/admin', // Bounces them straight to the dashboard
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-[#0B173D] mb-4">Welcome to Univ. Miradelle</h1>
      <p className="text-gray-600 mb-8">Please select your portal to continue:</p>

      {/* Standard Portals */}
      <div className="flex gap-4 mb-16">
        <Link href="/auth/login" className="px-6 py-2 bg-[#0B173D] text-white rounded-lg">
          Student Portal
        </Link>
        <Link href="/auth/lecturer-login" className="px-6 py-2 bg-orange-500 text-white rounded-lg">
          Lecturer Portal
        </Link>
      </div>

      {/* Presentation Demo Section */}
      <div className="pt-8 border-t border-gray-200 flex flex-col items-center w-full max-w-md">
        <button
          onClick={handleAdminDemo}
          disabled={isLoading}
          className="px-6 py-2 border border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                <path d="M8 15a4 4 0 0 1 8 0" />
              </svg>
              Demo Log in as Admin
            </>
          )}
        </button>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Instantly authenticates via JWT and routes to the RBAC management dashboard.
        </p>
      </div>
    </div>
  );
}


// trigger the signIn function from the frontend with the hardcoded email and password, and NextAuth does the exact same security checks as if the user typed it in manually. If the credentials are correct, it creates a session cookie with the admin's info and role, which is then used by your middleware to control access to protected routes. This allows you to demonstrate the full RBAC flow without needing to set up a separate admin account or form.