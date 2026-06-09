"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, GraduationCap, Briefcase, ShieldCheck, MoreHorizontal,
} from "lucide-react";

// --- Props interface expecting data from the Server Component ---
interface DashboardProps {
  studentCount: number;
  lecturerCount: number;
  adminCount: number;
}

// --- Static Mock Data (For the features you haven't built database tables for yet) ---
const attendanceData = [
  { name: "Mon", present: 85, absent: 15 },
  { name: "Tue", present: 90, absent: 10 },
  { name: "Wed", present: 75, absent: 25 },
  { name: "Thu", present: 88, absent: 12 },
  { name: "Fri", present: 92, absent: 8 },
];

const eventsData = [
  { id: 1, title: "Final Year Defense", time: "10:00 AM - 1:00 PM", border: "border-blue-500" },
  { id: 2, title: "Faculty Meeting", time: "2:00 PM - 3:30 PM", border: "border-orange-500" },
  { id: 3, title: "System Maintenance", time: "11:00 PM - 1:00 AM", border: "border-green-500" },
];

// --- Theme Colors ---
const COLORS = {
  navy: "#0B173D",
  orange: "#f97316",
  green: "#22c55e",
  lightGray: "#f3f4f6",
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminDashboardClient({ studentCount, lecturerCount, adminCount }: DashboardProps) {
  // Calculate total users dynamically
  const totalUsers = studentCount + lecturerCount + adminCount;

  // Feed the real database numbers into your Pie Chart
  const dynamicRoleData = [
    { name: "Students", value: studentCount },
    { name: "Lecturers", value: lecturerCount },
    { name: "Admins", value: adminCount },
  ];

  // Helper to calculate percentages safely (avoids dividing by zero if DB is empty)
  const getPercentage = (count: number) => {
    if (totalUsers === 0) return 0;
    return Math.round((count / totalUsers) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* --- Top Stats Row (Now totally dynamic!) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <motion.div variants={itemVariants} className="bg-[#0B173D] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">2025/26</span>
              <MoreHorizontal size={20} className="text-white/70" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{studentCount}</h3>
            <p className="text-white/80 font-medium flex items-center gap-2">
              <GraduationCap size={18} /> Students
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">2025/26</span>
              <MoreHorizontal size={20} className="text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-[#0B173D] mb-1">{lecturerCount}</h3>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Briefcase size={18} className="text-orange-500" /> Lecturers
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium">System</span>
              <MoreHorizontal size={20} className="text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-[#0B173D] mb-1">{adminCount}</h3>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-500" /> Administrators
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Platform Total</span>
              <MoreHorizontal size={20} className="text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-[#0B173D] mb-1">{totalUsers}</h3>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Users size={18} className="text-blue-500" /> All Accounts
            </p>
          </motion.div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: System Demographics (Dynamic Donut Chart) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#0B173D]">User Distribution</h2>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
            </div>

            <div className="h-64 relative w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dynamicRoleData}
                    cx="50%" cy="50%"
                    innerRadius={70} outerRadius={90}
                    paddingAngle={5} dataKey="value" stroke="none"
                  >
                    <Cell fill={COLORS.navy} />    {/* Students */}
                    <Cell fill={COLORS.orange} />  {/* Lecturers */}
                    <Cell fill={COLORS.green} />   {/* Admins */}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <Users size={28} className="text-gray-300 mb-1" />
                <span className="text-sm font-bold text-gray-400">Platform</span>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-[#0B173D]"></div>
                  <span className="text-lg font-bold text-gray-800">{studentCount}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">Students ({getPercentage(studentCount)}%)</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-lg font-bold text-gray-800">{lecturerCount}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">Lecturers ({getPercentage(lecturerCount)}%)</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-lg font-bold text-gray-800">{adminCount}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">Admins ({getPercentage(adminCount)}%)</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Attendance (Static Mockup) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-[#0B173D]">Platform Activity</h2>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="flex gap-4 mb-6 text-sm font-medium">
              <div className="flex items-center gap-1.5 text-gray-500">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0B173D]"></div> Active
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div> Inactive
              </div>
            </div>

            <div className="flex-1 min-h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="present" fill={COLORS.navy} radius={[4, 4, 4, 4]} />
                  <Bar dataKey="absent" fill="#e5e7eb" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right Column: Calendar & Events */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 cursor-pointer">{"<<"}</span>
                <span className="text-gray-400 cursor-pointer">{"<"}</span>
                <h3 className="font-bold text-[#0B173D]">June 2026</h3>
                <span className="text-gray-400 cursor-pointer">{">"}</span>
                <span className="text-gray-400 cursor-pointer">{">>"}</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
                <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div className="text-[#0B173D]">SAT</div><div className="text-[#0B173D]">SUN</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
                <div className="py-1.5">1</div><div className="py-1.5">2</div><div className="py-1.5">3</div><div className="py-1.5">4</div><div className="py-1.5">5</div><div className="text-orange-500 py-1.5">6</div><div className="text-orange-500 py-1.5">7</div>
                <div className="py-1.5">8</div><div className="bg-[#0B173D] text-white rounded-full py-1.5 shadow-md">9</div><div className="py-1.5">10</div><div className="py-1.5">11</div><div className="py-1.5">12</div><div className="text-orange-500 py-1.5">13</div><div className="text-orange-500 py-1.5">14</div>
                <div className="py-1.5">15</div><div className="py-1.5">16</div><div className="py-1.5">17</div><div className="py-1.5">18</div><div className="py-1.5">19</div><div className="text-orange-500 py-1.5">20</div><div className="text-orange-500 py-1.5">21</div>
                <div className="py-1.5">22</div><div className="py-1.5">23</div><div className="py-1.5">24</div><div className="py-1.5">25</div><div className="py-1.5">26</div><div className="text-orange-500 py-1.5">27</div><div className="text-orange-500 py-1.5">28</div>
                <div className="py-1.5">29</div><div className="py-1.5">30</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#0B173D]">Events</h2>
                <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
              </div>
              <div className="space-y-4">
                {eventsData.map((event) => (
                  <div key={event.id} className={`border-t-4 ${event.border} bg-gray-50 rounded-lg p-3 pt-4 relative`}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[#0B173D] text-sm">{event.title}</h4>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}