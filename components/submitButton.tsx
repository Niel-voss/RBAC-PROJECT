interface SubmitButtonProps {
  isLoading?: boolean;
}

export default function SubmitButton({ isLoading = false }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      // We use a template literal (``) to conditionally apply Tailwind classes
      className={`mt-2 w-full bg-[#081844] text-white rounded-lg py-2.5 flex justify-center items-center gap-2 font-semibold text-[13px] transition-all shadow-md shadow-blue-900/10 
        ${isLoading
          ? "opacity-70 cursor-not-allowed" // Styles when loading
          : "hover:bg-[#061236] active:scale-[0.98]" // Styles when active
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
          Creating...
        </>
      ) : (
        "Create Account"
      )}
    </button>
  );
}