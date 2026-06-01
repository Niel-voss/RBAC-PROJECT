"use client"
import { useState, ChangeEvent } from "react"

const InputField = ({
  label,
  placeholder,
  type = "text",
  icon,
  hint,
  name,
  value,
  onChange
}: {
  label: string
  placeholder: string
  type?: string
  icon: React.ReactNode
  hint?: string
  name?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  const [showPass, setShowPass] = useState(false)
  const isPassword = type === "password"

  return (
    <div className="w-full">
      {/* Label styled like RBAC */}
      <label className="block text-[11px] font-medium text-slate-600 mb-1 ml-0.5">
        {label}
      </label>

      {/* Input Container styled like RBAC using focus-within */}
      <div className="relative flex items-center border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/50 focus-within:border-[#0a1845] focus-within:bg-white transition-all">

        {/* Left Icon Wrapper */}
        <span className="text-slate-400 mr-2.5 shrink-0 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5">
          {icon}
        </span>

        {/* The actual HTML input */}
        <input
          type={isPassword && showPass ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full text-[12px] outline-none bg-transparent placeholder-slate-400 text-slate-800"
        />

        {/* Password Toggle Button */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-slate-400 ml-2 shrink-0 cursor-pointer hover:text-slate-600 w-3.5 h-3.5 flex items-center justify-center"
          >
            {showPass ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Hint Text */}
      {hint && <p className="text-[10px] text-slate-400 mt-1 ml-0.5">{hint}</p>}
    </div>
  )
}

export default InputField;