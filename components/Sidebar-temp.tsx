'use client';

import Link from 'next/link';
import {
  LayoutGrid, BookOpen, GraduationCap, Calendar, FileText, User, CreditCard, MessageSquare, Library as LibraryIcon, Settings, Users, Megaphone, ClipboardList
} from 'lucide-react';
import { useSidebar } from './SidebarContext';

export const currentUserRole = 'admin'; // Change to 'lecturer' or 'admin' to test the UI
export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  // Temporarily hardcoded for testing. 
  // Later, you will replace this with the actual role from your auth session.


  // The complete list of links with an allowedRoles array for filtering
  const navLinks = [
    { name: 'Dashboard', icon: LayoutGrid, href: '#', active: true, allowedRoles: ['student', 'lecturer', 'admin'] },
    { name: 'Courses', icon: BookOpen, href: '#', active: false, allowedRoles: ['student', 'lecturer'] },
    { name: 'Results', icon: GraduationCap, href: '#', active: false, allowedRoles: ['student', 'lecturer', 'admin'] },
    { name: 'Timetable', icon: Calendar, href: '#', active: false, allowedRoles: ['student', 'lecturer', 'admin'] },
    { name: 'Assignments', icon: FileText, href: '#', active: false, allowedRoles: ['student', 'lecturer'] },
    { name: 'Attendance', icon: User, href: '#', active: false, allowedRoles: ['student', 'lecturer'] },
    { name: 'Fees', icon: CreditCard, href: '#', active: false, allowedRoles: ['student', 'admin'] },
    { name: 'User Management', icon: Users, href: '#', active: false, allowedRoles: ['admin'] },
    { name: 'Admissions', icon: ClipboardList, href: '#', active: false, allowedRoles: ['admin'] },
    { name: 'Broadcasts', icon: Megaphone, href: '#', active: false, allowedRoles: ['admin'] },
    { name: 'Messages', icon: MessageSquare, href: '#', active: false, allowedRoles: ['student', 'lecturer'] },
    { name: 'Library', icon: LibraryIcon, href: '#', active: false, allowedRoles: ['student', 'lecturer'] },
    { name: 'Settings', icon: Settings, href: '#', active: false, allowedRoles: ['student', 'lecturer', 'admin'] },
  ];

  // Filter the links based on who is logged in before rendering
  const visibleLinks = navLinks.filter(link => link.allowedRoles.includes(currentUserRole));

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
          {/* Map over visibleLinks instead of navLinks */}
          {visibleLinks.map((link) => {
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