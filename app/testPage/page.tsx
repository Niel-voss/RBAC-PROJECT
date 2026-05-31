export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-4 font-sans">

      {/* Card scaled down: max-w-[340px], tighter padding */}
      <div className="w-full max-w-[340px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white p-6 sm:p-7">
        {/* Header scaled down */}
        <div className="flex flex-col items-center mb-5">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-slate-900 mb-1 tracking-tight text-center">Test Page</h2>
          <p className="text-slate-500 text-[11px] text-center">This is a test page for UI components</p>
        </div>
        {/* Form gap scaled down */}
        <form className="flex flex-col gap-3">
          {/* Sample Input */}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1 ml-0.5">Sample Input</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/50 focus-within:border-[#0a1845] focus-within:bg-white transition-all">
              <input
                type="text"
                placeholder="Enter some text"
                className="w-full text-[12px] outline-none bg-transparent placeholder-slate-400 text-slate-800"
              />
            </div>
          </div>
          {/* Sample Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white text-[12px] font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}