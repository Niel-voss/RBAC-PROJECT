import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1 w-full max-w-2xl transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
      <Search className="w-3 h-3 text-slate-400 mr-2 shrink-0" />
      <input
        type="text"
        placeholder="Search for courses, assignments, etc..."
        className="bg-transparent border-none outline-none w-full text-[11px] text-slate-700 placeholder:text-slate-400"
      />
    </div>
  );
}