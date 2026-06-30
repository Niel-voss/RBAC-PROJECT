'use client'
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import SubmitButton from "@/components/submitButton";
import InputField from "@/components/InputField";

import {
  User,
  Mail,
  IdCard,
  Lock,
  Info,
  ArrowLeft, // <-- Added ArrowLeft
} from 'lucide-react';

export default function CreateAccountMicro() {
  const router = useRouter();

  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = (redirect = false) => {
    setShowModal(false);
    if (redirect) {
      // THE FIX: Hard reload instead of router.push
      // This forces the layout to fetch the fresh name from the database!
      window.location.href = '/student';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }

      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!signInResult?.ok) {
        throw new Error("Account created but failed to sign in");
      }

      // Show success modal, then auto-close and redirect
      setModalMessage('Account created successfully');
      setShowModal(true);
      setLoading(false);

      setTimeout(() => {
        // auto-close and redirect after showing the modal briefly
        closeModal(true);
      }, 1800);

    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-4 font-sans">
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

      {/* Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-5 w-[320px] mx-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Success</h3>
              <button
                onClick={() => closeModal(true)}
                aria-label="Close"
                className="text-slate-500 hover:text-slate-700"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-slate-900 mt-3">{modalMessage}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => closeModal(true)} className="px-3 py-1 rounded bg-[#0a1845] text-white">Continue</button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[340px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white p-6 sm:p-7">

        <div className="flex flex-col items-center mb-5">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 mb-1 tracking-tight text-center">Create Account</h2>
          <p className="text-slate-500 text-[11px] text-center">Join the Univ. of Miradelle Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3"
          method="POST"
        >

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
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            icon={<User />}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={<Mail />}
          />

          <InputField
            label="Matriculation number"
            name="matricNumber"
            value={formData.matricNumber}
            onChange={handleChange}
            placeholder="Enter your Mat no."
            hint="Must begin with capital letters"
            icon={<IdCard />}
          />

          <div>
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              icon={<Lock />}
            />
          </div>

          <div className="flex items-start sm:items-center gap-2 mt-1 ml-0.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-3.5 h-3.5 mt-0.5 sm:mt-0 rounded border-slate-300 text-[#0a1845] focus:ring-[#0a1845] cursor-pointer shrink-0"
            />
            <label className="text-[11px] text-slate-500 leading-tight">
              I agree to <Link href="/terms" className="text-[#0a1845] font-semibold hover:underline">terms & conditions</Link>
            </label>
          </div>

          <div className="mt-2">
            <SubmitButton isLoading={loading} />
          </div>

        </form>

        <div className="mt-6 flex flex-col items-center gap-3">
          {/* Primary secondary-action */}
          <p className="text-center text-[13px] text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#0a1845] font-semibold hover:underline">
              Log in
            </Link>
          </p>

          {/* Muted contextual hint */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Info size={12} className="flex-shrink-0" />
            <span>Demo credentials available on the login page.</span>
          </div>
        </div>

      </div>
    </div>
  );
}