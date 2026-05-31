'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid, BookOpen, GraduationCap, Calendar, FileText, User, CreditCard, MessageSquare, LibraryIcon, Settings, Users, Megaphone, ClipboardList
} from 'lucide-react';
import { useSidebar } from './SidebarContext';

interface SidebarProps {
  role: 'student' | 'lecturer' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const { isOpen, setIsOpen } = useSidebar();
  const pathname = usePathname();

  // Notice we only define the end 'path'. We will prepend the role dynamically.
  const navLinks = [
    // --- SHARED ---
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard', allowedRoles: ['student', 'lecturer', 'admin'] },

    // --- STUDENT SPECIFIC ---
    { name: 'Course Registration', icon: BookOpen, path: '/course-registration', allowedRoles: ['student'] },
    { name: 'Academic Record', icon: GraduationCap, path: '/academic-record', allowedRoles: ['student'] },
    { name: 'Timetable', icon: Calendar, path: '/timetable', allowedRoles: ['student'] },
    { name: 'Assignments', icon: FileText, path: '/assignments', allowedRoles: ['student'] },
    { name: 'Attendance', icon: User, path: '/attendance', allowedRoles: ['student'] },
    { name: 'Fees', icon: CreditCard, path: '/fees', allowedRoles: ['student'] },

    // --- LECTURER SPECIFIC ---
    { name: 'My Courses', icon: BookOpen, path: '/my-courses', allowedRoles: ['lecturer'] },
    { name: 'Grade Management', icon: ClipboardList, path: '/grade-management', allowedRoles: ['lecturer'] },
    { name: 'Attendance Tracker', icon: User, path: '/attendance-tracker', allowedRoles: ['lecturer'] },
    { name: 'Timetable', icon: Calendar, path: '/timetable', allowedRoles: ['lecturer'] }, // Duplicate name is fine, role filters it

    // --- ADMIN SPECIFIC ---
    { name: 'User Management', icon: Users, path: '/user-management', allowedRoles: ['admin'] },
    { name: 'Academic Structure', icon: LayoutGrid, path: '/academic-structure', allowedRoles: ['admin'] },
    { name: 'Session and Semester', icon: Calendar, path: '/session-settings', allowedRoles: ['admin'] },
    { name: 'Admission', icon: ClipboardList, path: '/admission', allowedRoles: ['admin'] },
    { name: 'Broadcasts', icon: Megaphone, path: '/broadcasts', allowedRoles: ['admin'] }
  ];

  // Filter links based on the role passed from the layout
  const visibleLinks = navLinks.filter(link => link.allowedRoles.includes(role));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {visibleLinks.map((link) => {
            const Icon = link.icon;

            // Dynamically build the full URL (e.g., /student/dashboard)
            const fullHref = `/${role}${link.path}`;

            // Check if the current URL matches this exact link
            const isActive = pathname === fullHref;

            return (
              <Link
                key={link.name}
                href={fullHref}
                prefetch={false}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive
                    ? 'bg-[#0B173D] text-white shadow-md shadow-blue-900/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`}
                  strokeWidth={isActive ? 2 : 1.5}
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