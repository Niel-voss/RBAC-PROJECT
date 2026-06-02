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
} from 'lucide-react';

export default function CreateAccountMicro() {
  const router = useRouter();

  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricNumber: "", // <-- Added this to match your input
    password: "",     // <-- Added this for the password input
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      router.push("/student");
      router.refresh();

    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }; // <-- CLOSING handleSubmit HERE!

  // The return statement is now safely OUTSIDE the handleSubmit function
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[340px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white p-6 sm:p-7">

        <div className="flex flex-col items-center mb-5">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 mb-1 tracking-tight text-center">Create Account</h2>
          <p className="text-slate-500 text-[11px] text-center">Join the Univ. of Oluku Portal</p>
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
            placeholder="Enter your Mat no"
            hint="Must begin with capital letters"
            icon={<IdCard />}
          />

          {/* Replaced duplicate email with Password */}
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
          {/* Added the missing Checkbox UI so 'agreed' state actually updates */}
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

        <p className="text-center text-[11px] text-slate-500 mt-5">
          Already have an account? <Link href="/auth/login" className="text-[#0a1845] font-semibold hover:underline">Login</Link>
        </p>

      </div>
    </div>
  );
}