import Link from 'next/link';
import { auth } from '@/auth';

export default async function UnauthorizedPage() {
  const session = await auth();

  // Logic: Send them back to their specific dashboard, or home if unknown
  const dashboardPath = session?.user?.role
    ? `/${session.user.role.toLowerCase()}`
    : '/';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfaf6] p-4 text-[#172554]">
      <div className="text-center max-w-sm">

        <p className="text-5xl font-extrabold text-red-600 tracking-tight mb-4">403 Forbidden</p>
        <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          You do not have permission to view this page.
          Please return to your dashboard or switch to the correct account.
        </p>

        <div className="flex flex-col gap-3">
          {/* Dashboard Button */}
          <Link
            href={dashboardPath}
            className="w-full py-2 px-4 bg-[#1e3a8a] text-white text-sm rounded font-medium hover:bg-[#172554] transition-all"
          >
            Return to Dashboard
          </Link>

          {/* Login Switcher */}
          <Link
            href="/auth/login"
            className="w-full py-2 px-4 border border-[#1e3a8a] text-[#1e3a8a] text-sm rounded font-medium hover:bg-blue-50 transition-all"
          >
            Use a Different Login
          </Link>
        </div>
      </div>
    </div>
  );
}