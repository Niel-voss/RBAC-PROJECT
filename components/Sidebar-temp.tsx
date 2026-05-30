'use client';

import Link from 'next/link';
import {
  LayoutGrid, BookOpen, GraduationCap, Calendar, FileText, User, CreditCard, MessageSquare, Library as LibraryIcon, Settings, Users, Megaphone, ClipboardList
} from 'lucide-react';
import { useSidebar } from './SidebarContext';

export const currentUserRole = 'lecturer'; // Change to 'lecturer' or 'admin' to test the UI
export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  // Temporarily hardcoded for testing. 
  // Later, you will replace this with the actual role from your auth session.


  // The complete list of links with an allowedRoles array for filtering
  const navLinks = [
    // --- SHARED ---
    { name: 'Dashboard', icon: LayoutGrid, href: '#', active: true, allowedRoles: ['student', 'lecturer', 'admin'] },

    // --- STUDENT SPECIFIC ---
    { name: 'Course Registration', icon: BookOpen, href: '#', active: false, allowedRoles: ['student'] },
    { name: 'Academic Record', icon: GraduationCap, href: '#', active: false, allowedRoles: ['student'] },
    { name: 'Timetable', icon: Calendar, href: '#', active: false, allowedRoles: ['student'] },
    { name: 'Assignments', icon: FileText, href: '#', active: false, allowedRoles: ['student'] },
    { name: 'Attendance', icon: User, href: '#', active: false, allowedRoles: ['student'] },
    { name: 'Fees', icon: CreditCard, href: '#', active: false, allowedRoles: ['student'] },

    // --- LECTURER SPECIFIC ---
    { name: 'My Courses', icon: BookOpen, href: '#', active: false, allowedRoles: ['lecturer'] },
    { name: 'Grade Management', icon: ClipboardList, href: '#', active: false, allowedRoles: ['lecturer'] }, // You can change this icon if needed
    { name: 'Attendance Tracker', icon: User, href: '#', active: false, allowedRoles: ['lecturer'] },
    { name: 'Timetable', icon: Calendar, href: '#', active: false, allowedRoles: ['lecturer'] },

    // --- ADMIN SPECIFIC ---
    { name: 'User Management', icon: Users, href: '#', active: false, allowedRoles: ['admin'] },
    { name: 'Academic Structure', icon: LayoutGrid, href: '#', active: false, allowedRoles: ['admin'] }, // Assuming a structure/layout icon
    { name: 'Session and Semester', icon: Calendar, href: '#', active: false, allowedRoles: ['admin'] },
    { name: 'Admission', icon: ClipboardList, href: '#', active: false, allowedRoles: ['admin'] },
    { name: 'Broadcasts', icon: Megaphone, href: '#', active: false, allowedRoles: ['admin'] }
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