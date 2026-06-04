'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, GraduationCap, BookOpen, ShieldCheck,
  Filter, RotateCcw, Edit2, MoreVertical,
  ChevronLeft, ChevronRight, Plus, X
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';

// --- Types & Mock Data ---
type Role = 'Student' | 'Lecturer' | 'Administrator';
type Status = 'Active' | 'Suspended' | 'Pending' | 'Inactive';

interface UserData {
  id: string;
  name: string;
  roleLabel: string;
  matriculatiionNumber: string;
  email: string;
  role: Role;
  status: Status;
  dateJoined: string;
  initials: string;
}

// Generating 30 mock users with deterministic data to prevent hydration errors
const mockUsers: UserData[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `USR${i + 1}`,
  name: i === 0 ? 'Odumodu Black' : `User ${i + 1}`,
  roleLabel: i % 3 === 0 ? 'Student' : i % 3 === 1 ? 'Lecturer' : 'Administrator',
  matriculatiionNumber: i % 3 === 0 ? `INDUSTRYMACHINE00${i + 1}` : `LECT202300${i + 1}`,
  email: `user${i + 1}@fuol.edu.ng`,
  role: (i % 3 === 0 ? 'Student' : i % 3 === 1 ? 'Lecturer' : 'Administrator') as Role,
  status: (i % 4 === 0 ? 'Active' : i % 4 === 1 ? 'Suspended' : i % 4 === 2 ? 'Pending' : 'Inactive') as Status,
  dateJoined: `May ${(i % 28) + 1}, 2026`,
  initials: i === 0 ? 'OB' : `U${i + 1}`
}));

export default function UserManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalUsers = mockUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = mockUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'Student': return 'bg-indigo-50 text-indigo-700';
      case 'Lecturer': return 'bg-orange-50 text-orange-700';
      case 'Administrator': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Active': return 'text-green-500';
      case 'Suspended': return 'text-red-500';
      case 'Pending': return 'text-yellow-500';
      case 'Inactive': return 'text-gray-400';
      default: return 'text-gray-500';
    }
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

      {/* Stat Cards - Horizontally scrollable on mobile, grid on desktop */}
      <div
        className="flex md:grid md:grid-cols-4 gap-4 mb-6 md:mb-8 overflow-x-auto pb-2 md:pb-0 snap-x"
        style={{ scrollbarWidth: 'none' }} // Hides scrollbar on Firefox
      >
        {[
          { title: 'Total Users', count: '128', sub: 'All registered users', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { title: 'Students', count: '98', sub: 'Active students', icon: GraduationCap, color: 'text-orange-500', bg: 'bg-orange-50' },
          { title: 'Lecturers', count: '22', sub: 'Active lecturers', icon: BookOpen, color: 'text-orange-400', bg: 'bg-orange-50' },
          { title: 'Administrators', count: '8', sub: 'System admins', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
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
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          <select className="border border-gray-200 rounded-lg text-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 shrink-0">
            <option>All Roles</option>
            <option>Student</option>
            <option>Lecturer</option>
            <option>Administrator</option>
          </select>
          <select className="border border-gray-200 rounded-lg text-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 shrink-0">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
          <button className="flex items-center gap-2 bg-[#0F172A] text-white px-4 py-2.5 rounded-lg text-sm font-medium shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 shrink-0">
            <RotateCcw className="w-4 h-4" /> Reset
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
            className="p-4 flex items-center justify-between gap-2 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-medium text-sm shrink-0">
                {user.initials}
              </div>
              <div className="truncate">
                <p className="font-medium text-gray-900 text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user.roleLabel} &bull; {user.matriculatiionNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(user.status)} bg-current`} />
                <span className={`text-xs font-medium ${getStatusColor(user.status)}`}>{user.status}</span>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-900 border border-gray-100 rounded-md">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- DESKTOP VIEW: Table Layout --- */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Matric No. / ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Joined</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-medium text-sm">
                      {user.initials}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.roleLabel}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.matriculatiionNumber}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)} bg-current`} />
                      <span className={`text-sm font-medium ${getStatusColor(user.status)}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.dateJoined}</td>
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