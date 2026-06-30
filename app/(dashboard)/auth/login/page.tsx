'use client'

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import SubmitButton from "@/components/submitButton";
import InputField from "@/components/InputField";

import {
  Mail,
  Lock,
  Lightbulb,
  SquarePen,
  ArrowLeft, // <-- Added ArrowLeft
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDemoFill = () => {
    setFormData({
      email: "mark001@gmail.com",
      password: "demo_password_123",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Use NextAuth's built-in signIn method for credentials
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // Set to false so we can handle the routing manually
      });

      if (result?.error) {
        // NextAuth returns an error string if credentials fail
        setError("Invalid email or password.");
        setLoading(false);
      } else if (result?.ok) {
        // If successful, push them straight to the secure route
        router.push('/student');
        router.refresh(); // Forces the server to re-run layout checks (important for middleware/RBAC)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      {/* --- ADDED BACK BUTTON --- */}
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium z-50"
      >
        <ArrowLeft size={20} />
        {/* Added optional text for better UX */}
        <span className="hidden sm:inline">Back</span>
      </Link>

      {/* ------------------------- */}
      <div className="w-full max-w-[340px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white p-6 sm:p-7">

        <div className="flex flex-col items-center mb-5">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 mb-1 tracking-tight text-center">Welcome Back</h2>
          <p className="text-slate-500 text-[11px] text-center">Login to the Univ. of Miradelle Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" method="POST">

          {/* Error Message Animation */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-600"
            >
              <svg className="mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </motion.div>
          )}

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={<Mail />}
          />

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <Link href="/auth/forgot-password" className="text-[10px] text-[#0a1845] font-medium hover:underline">
                Forgot password?
              </Link>
            </div>
            <InputField
              // We omit the label here because we added a custom one above with the "Forgot password" link
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={<Lock />}
            />
          </div>

          <div className="mt-4">
            <SubmitButton isLoading={loading} text="Log In" />
          </div>

        </form>

        {/* --- ADDED UI SECTION --- */}
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="px-3 text-slate-800 text-[12px]">or</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <button
          type="button"
          onClick={handleDemoFill}
          className="w-full flex items-center justify-center gap-2 bg-blue-50/50 hover:bg-blue-50 text-[#285b9b] border border-blue-200/80 rounded-lg py-2.5 text-[13px] font-medium transition-colors mb-5"
        >
          <SquarePen size={16} />
          Fill Demo Student Credentials ⏩
        </button>

        <div className="flex items-start justify-center gap-2 text-slate-800">
          <Lightbulb size={16} className="mt-0.5 flex-shrink-0 text-[#285b9b]" />
          <p className="text-[11px] leading-tight pt-0.5">
            Want to explore quickly? Use the demo credentials button.
          </p>
        </div>
        {/* --- END OF ADDED UI SECTION --- */}

      </div>

      {/* Moved slightly below the card to perfectly match the provided image layout */}
      <p className="text-center text-[13px] text-slate-700 mt-6">
        Don&apos;t have an account? <Link href="/auth/signUp" className="text-[#0a1845] font-semibold hover:underline">create account</Link>
      </p>

    </div>
  );
}