import Link from 'next/link';
import {
  LayoutGrid, BookOpen, GraduationCap, Calendar, FileText, User, CreditCard, MessageSquare, Library as LibraryIcon, Settings
} from 'lucide-react';

export default function Sidebar() {
  const navLinks = [
    { name: 'Dashboard', icon: LayoutGrid, href: '#', active: true },
    { name: 'Courses', icon: BookOpen, href: '#' },
    { name: 'Results', icon: GraduationCap, href: '#' },
    { name: 'Timetable', icon: Calendar, href: '#' },
    { name: 'Assignments', icon: FileText, href: '#' },
    { name: 'Attendance', icon: User, href: '#' },
    { name: 'Fees', icon: CreditCard, href: '#' },
    { name: 'Messages', icon: MessageSquare, href: '#' },
    { name: 'Library', icon: LibraryIcon, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
  ];

  return (
    <aside className="w-48 min-h-screen border-r border-slate-100 bg-white flex flex-col">
      <div className="flex-1 px-2.5 py-4 space-y-0.5">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors font-medium text-xs ${link.active
                  ? 'bg-[#3B52D9] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${link.active ? 'text-white' : 'text-slate-400'}`}
                strokeWidth={link.active ? 2.5 : 2}
              />
              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}