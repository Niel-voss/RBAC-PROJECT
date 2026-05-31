import React from 'react';
import {
  User,
  Mail,
  IdCard,
  Lock,
  EyeOff
} from 'lucide-react';

export default function CreateAccountMicro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-4 font-sans">

      {/* Card scaled down: max-w-[340px], tighter padding */}
      <div className="w-full max-w-[340px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white p-6 sm:p-7">

        {/* Header scaled down */}
        <div className="flex flex-col items-center mb-5">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 mb-1 tracking-tight text-center">Create Account</h2>
          <p className="text-slate-500 text-[11px] text-center">Join the University RBAC Portal</p>
        </div>

        {/* Form gap scaled down */}
        <form className="flex flex-col gap-3">

          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1 ml-0.5">Full Name</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/50 focus-within:border-[#0a1845] focus-within:bg-white transition-all">
              <User className="w-3.5 h-3.5 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full text-[12px] outline-none bg-transparent placeholder-slate-400 text-slate-800"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1 ml-0.5">Email Address</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/50 focus-within:border-[#0a1845] focus-within:bg-white transition-all">
              <Mail className="w-3.5 h-3.5 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full text-[12px] outline-none bg-transparent placeholder-slate-400 text-slate-800"
              />
            </div>
          </div>

          {/* Matric Number */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1 ml-0.5">Matric Number</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/50 focus-within:border-[#0a1845] focus-within:bg-white transition-all">
              <IdCard className="w-3.5 h-3.5 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Enter your matric number"
                className="w-full text-[12px] outline-none bg-transparent placeholder-slate-400 text-slate-800"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1 ml-0.5">Password</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/50 focus-within:border-[#0a1845] focus-within:bg-white transition-all">
              <Lock className="w-3.5 h-3.5 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="password"
                placeholder="Create a password"
                className="w-full text-[12px] outline-none bg-transparent placeholder-slate-400 text-slate-800"
              />
              <EyeOff className="w-3.5 h-3.5 text-slate-400 ml-2 shrink-0 cursor-pointer hover:text-slate-600" />
            </div>
          </div>

          {/* Confirm Password & Forgot Password Link */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1 ml-0.5">Confirm Password</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/50 focus-within:border-[#0a1845] focus-within:bg-white transition-all mb-1">
              <Lock className="w-3.5 h-3.5 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full text-[12px] outline-none bg-transparent placeholder-slate-400 text-slate-800"
              />
              <EyeOff className="w-3.5 h-3.5 text-slate-400 ml-2 shrink-0 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-[10px] text-[#0a1845] font-semibold hover:underline">Forgot Password?</a>
            </div>
          </div>

          {/* Terms Checkbox scaled down */}
          <div className="flex items-start sm:items-center gap-2 mt-1 ml-0.5">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 mt-0.5 sm:mt-0 rounded border-slate-300 text-[#0a1845] focus:ring-[#0a1845] cursor-pointer shrink-0"
            />
            <label className="text-[11px] text-slate-500 leading-tight">
              I agree to <a href="#" className="text-[#0a1845] font-semibold hover:underline">terms & conditions</a>
            </label>
          </div>

          {/* Submit Button scaled down */}
          <button
            type="button"
            className="mt-2 w-full bg-[#081844] text-white rounded-lg py-2.5 flex justify-center items-center font-semibold text-[13px] hover:bg-[#061236] transition-colors shadow-md shadow-blue-900/10 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        {/* Footer Login Link scaled down */}
        <p className="text-center text-[11px] text-slate-500 mt-5">
          Already have an account? <a href="#" className="text-[#0a1845] font-semibold hover:underline">Login</a>
        </p>

      </div>
    </div>
  );
}