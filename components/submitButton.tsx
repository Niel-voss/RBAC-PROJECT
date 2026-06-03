interface SubmitButtonProps {
  isLoading?: boolean;
  text?: string;
}

// 1. Destructure the 'text' prop here alongside isLoading
export default function SubmitButton({ isLoading = false, text }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`mt-2 w-full bg-[#081844] text-white rounded-lg py-2.5 flex justify-center items-center gap-2 font-semibold text-[13px] transition-all shadow-md shadow-blue-900/10 
        ${isLoading
          ? "opacity-70 cursor-not-allowed"
          : "hover:bg-[#061236] active:scale-[0.98]"
        }
      `}
    >
      {isLoading ? (
        <>
          {/* Tailwind animated spinner */}
          <svg
            className="animate-spin h-4 w-4 text-white"
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
          {/* Changed to be generic for both login and signup */}
          Loading...
        </>
      ) : (
        // 2. Render the custom text prop, or fallback to "Create Account"
        text || "Create Account"
      )}
    </button>
  );
}