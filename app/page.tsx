import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-[#0B173D] mb-4">Welcome to Federal Univ. of Oluku</h1>
      <p className="text-gray-600 mb-8">Please select your portal to continue:</p>

      <div className="flex gap-4">
        <Link href="/signup" className="px-6 py-2 bg-[#0B173D] text-white rounded-lg">
          Student Portal
        </Link>
        <Link href="/lecturer" className="px-6 py-2 bg-orange-500 text-white rounded-lg">
          Lecturer Portal
        </Link>
      </div>
    </div>
  );
}