'use client';

import Link from 'next/link';
import {
  LayoutGrid, BookOpen, GraduationCap, Calendar, FileText, User, CreditCard, MessageSquare, Library as LibraryIcon, Settings
} from 'lucide-react';
import { useSidebar } from './SidebarContext';

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

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
    <>
      {/* Blurred Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={false}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium text-sm ${link.active
                  ? 'bg-[#3B52D9] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <Icon
                  className={`w-5 h-5 ${link.active ? 'text-white' : 'text-slate-500'}`}
                  strokeWidth={link.active ? 2 : 1.5}
                />
                {link.name}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}