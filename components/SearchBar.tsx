import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-full px-4 py-2 w-full max-w-2xl transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300">
      <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
      <input
        type="text"
        placeholder="Search for courses, assignments, etc..."
        className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
      />
    </div>
  );
}