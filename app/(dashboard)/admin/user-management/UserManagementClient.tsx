'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, GraduationCap, BookOpen, ShieldCheck,
  Filter, RotateCcw, Edit2, MoreVertical,
  ChevronLeft, ChevronRight, Plus, X
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';

// --- Types Matching Your Prisma DB ---
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'LECTURER' | 'ADMIN';
  department: string;
}

export default function UserManagementClient({ initialUsers }: { initialUsers: UserData[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // --- 1. PIN THE CHIEF ADMINISTRATOR ---
  // Sort the users so the demo admin is ALWAYS at the top.
  const sortedUsers = [...initialUsers].sort((a, b) => {
    // If 'a' is the admin email, it goes to the top (-1)
    if (a.email === 'admin@oluku.edu.ng') return -1;
    // If 'b' is the admin email, it goes to the top (1)
    if (b.email === 'admin@oluku.edu.ng') return 1;
    // Otherwise, keep their natural order (or you could sort alphabetically by name here)
    return 0;
  });

  // Pagination Logic (Now using the sorted array)
  const itemsPerPage = 8;
  const totalUsers = sortedUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Dynamic Stats Calculation
  const studentsCount = initialUsers.filter(u => u.role === 'STUDENT').length;
  const lecturersCount = initialUsers.filter(u => u.role === 'LECTURER').length;
  const adminsCount = initialUsers.filter(u => u.role === 'ADMIN').length;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Role Update API Call
  const handleRoleChange = async (userId: string, newRole: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newRole }),
      });

      if (!response.ok) throw new Error('Failed to update role');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error updating role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. COLOR CODING (Matching Reference UI) ---

  // Colors for the Role Badge
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'STUDENT': return 'bg-indigo-50 text-[#1E3A8A] border border-indigo-100'; // Dark Blue text, light bg
      case 'LECTURER': return 'bg-orange-50 text-[#EA580C] border border-orange-100'; // Orange text, light bg
      case 'ADMIN': return 'bg-green-50 text-[#16A34A] border border-green-100';     // Green text, light bg
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  // Colors for the Circular Avatar Initial
  const getAvatarColor = (role: string) => {
    switch (role) {
      case 'STUDENT': return 'bg-[#0B173D] text-white'; // The Navy Blue from the UI
      case 'LECTURER': return 'bg-[#EA580C] text-white'; // The Orange from the UI
      case 'ADMIN': return 'bg-[#1E293B] text-white';    // Very dark gray/black for Admin
      default: return 'bg-gray-500 text-white';
    }
  };

  // Helper to generate initials from the dynamic names
  const getInitials = (name: string) => {
    if (!name || name === "Unknown") return "UN";
    const parts = name.split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-7xl mx-auto text-gray-800"
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-[250px] md:max-w-none">
            Manage all users in the system. View, edit and control user access.
          </p>
        </div>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add New User</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Dynamic Stat Cards */}
      <div
        className="flex md:grid md:grid-cols-4 gap-4 mb-6 md:mb-8 overflow-x-auto pb-2 md:pb-0 snap-x"
        style={{ scrollbarWidth: 'none' }}
      >
        {[
          { title: 'Total Users', count: totalUsers, sub: 'All registered users', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { title: 'Students', count: studentsCount, sub: 'Active students', icon: GraduationCap, color: 'text-orange-500', bg: 'bg-orange-50' },
          { title: 'Lecturers', count: lecturersCount, sub: 'Active lecturers', icon: BookOpen, color: 'text-orange-400', bg: 'bg-orange-50' },
          { title: 'Administrators', count: adminsCount, sub: 'System admins', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4 min-w-[140px] md:min-w-0 snap-center"
          >
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color} shrink-0`}>
              <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-0.5">{stat.count}</h3>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-3 md:p-2 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <SearchBar />
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0" style={{ scrollbarWidth: 'none' }}>
          <select className="border border-gray-200 rounded-lg text-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 shrink-0">
            <option>All Roles</option>
            <option>Student</option>
            <option>Lecturer</option>
            <option>Administrator</option>
          </select>
          <button className="flex items-center gap-2 bg-[#0F172A] text-white px-4 py-2.5 rounded-lg text-sm font-medium shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* --- MOBILE VIEW: List Layout --- */}
      <div className="md:hidden bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6 divide-y divide-gray-100">
        {currentUsers.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 flex flex-col gap-3 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* Applied Dynamic Avatar Color */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm shrink-0 ${getAvatarColor(user.role)}`}>
                  {getInitials(user.name)}
                </div>
                <div className="truncate">
                  <p className="font-medium text-gray-900 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{user.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full text-green-500 bg-current" />
                <span className="text-xs font-medium text-green-500">Active</span>
              </div>
            </div>
            <select
              defaultValue={user.role}
              disabled={isLoading || user.email === 'admin@oluku.edu.ng'} // Prevent locking yourself out!
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
              className={`w-full mt-2 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none ${getRoleColor(user.role)}`}
            >
              <option value="STUDENT" className="bg-white text-gray-900">Student</option>
              <option value="LECTURER" className="bg-white text-gray-900">Lecturer</option>
              <option value="ADMIN" className="bg-white text-gray-900">Administrator</option>
            </select>
          </motion.div>
        ))}
        {currentUsers.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">No users found in database.</div>
        )}
      </div>

      {/* --- DESKTOP VIEW: Table Layout --- */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Department / ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role Gate</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {/* Applied Dynamic Avatar Color */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${getAvatarColor(user.role)}`}>
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.department}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      defaultValue={user.role}
                      disabled={isLoading || user.email === 'admin@oluku.edu.ng'} // Prevent locking yourself out!
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer focus:ring-2 focus:ring-indigo-500 appearance-none outline-none ${getRoleColor(user.role)}`}
                    >
                      <option value="STUDENT" className="bg-white text-gray-900">STUDENT</option>
                      <option value="LECTURER" className="bg-white text-gray-900">LECTURER</option>
                      <option value="ADMIN" className="bg-white text-gray-900">ADMINISTRATOR</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full text-green-500 bg-current" />
                      <span className="text-sm font-medium text-green-500">Active</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-md">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-md">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No users found. Create one to populate the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs md:text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalUsers)} of {totalUsers} users
        </p>
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 md:p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg text-xs md:text-sm font-medium transition-colors ${currentPage === index + 1
                ? 'bg-[#0F172A] text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 md:p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddUserModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-4 md:p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Select User Role</h3>
                <button onClick={() => setIsAddUserModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-3">
                <button className="w-full flex items-center gap-3 p-3 md:p-4 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-left group">
                  <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg group-hover:bg-indigo-200"><GraduationCap className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Student</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Register a new student account</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 md:p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-colors text-left group">
                  <div className="p-2 bg-orange-100 text-orange-700 rounded-lg group-hover:bg-orange-200"><BookOpen className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Lecturer</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Register a new faculty member</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 md:p-4 border border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors text-left group">
                  <div className="p-2 bg-green-100 text-green-700 rounded-lg group-hover:bg-green-200"><ShieldCheck className="w-5 h-5" /></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Administrator</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Create a system admin account</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}