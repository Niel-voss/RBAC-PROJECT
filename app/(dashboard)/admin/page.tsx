"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  MoreHorizontal,
} from "lucide-react";

// --- Mock Data ---
const attendanceData = [
  { name: "Mon", present: 85, absent: 15 },
  { name: "Tue", present: 90, absent: 10 },
  { name: "Wed", present: 75, absent: 25 },
  { name: "Thu", present: 88, absent: 12 },
  { name: "Fri", present: 92, absent: 8 },
];

const demographicData = [
  { name: "Boys", value: 55 },
  { name: "Girls", value: 45 },
];

const eventsData = [
  { id: 1, title: "Lorem ipsum dolor", time: "12:00 PM - 2:00 PM", border: "border-blue-500" },
  { id: 2, title: "Lorem ipsum dolor", time: "12:00 PM - 2:00 PM", border: "border-orange-500" },
  { id: 3, title: "Lorem ipsum dolor", time: "12:00 PM - 2:00 PM", border: "border-green-500" },
];

// --- Theme Colors ---
const COLORS = {
  navy: "#0B173D",
  lightNavy: "#1a2a6c",
  orange: "#f97316",
  lightGray: "#f3f4f6",
  green: "#22c55e"
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* --- Top Stats Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Stat Card 1 (Themed Navy like the Student Welcome Banner) */}
          <motion.div variants={itemVariants} className="bg-[#0B173D] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">2024/25</span>
              <MoreHorizontal size={20} className="text-white/70" />
            </div>
            <h3 className="text-3xl font-bold mb-1">1,234</h3>
            <p className="text-white/80 font-medium flex items-center gap-2">
              <GraduationCap size={18} /> Students
            </p>
          </motion.div>

          {/* Stat Card 2 */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">2024/25</span>
              <MoreHorizontal size={20} className="text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-[#0B173D] mb-1">1,234</h3>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Briefcase size={18} className="text-orange-500" /> Teachers
            </p>
          </motion.div>

          {/* Stat Card 3 */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">2024/25</span>
              <MoreHorizontal size={20} className="text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-[#0B173D] mb-1">1,234</h3>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Users size={18} className="text-blue-500" /> Parents
            </p>
          </motion.div>

          {/* Stat Card 4 */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium">2024/25</span>
              <MoreHorizontal size={20} className="text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-[#0B173D] mb-1">1,234</h3>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <UserCheck size={18} className="text-green-500" /> Staffs
            </p>
          </motion.div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Students Demographics (Donut Chart) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#0B173D]">Students</h2>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
            </div>

            <div className="h-64 relative w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill={COLORS.navy} />
                    <Cell fill={COLORS.orange} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Circle Label Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex gap-1 text-gray-300">
                  <Users size={32} />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-[#0B173D]"></div>
                  <span className="text-xl font-bold text-gray-800">1,234</span>
                </div>
                <p className="text-sm text-gray-400 font-medium">Boys (55%)</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xl font-bold text-gray-800">1,234</span>
                </div>
                <p className="text-sm text-gray-400 font-medium">Girls (45%)</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Attendance (Bar Chart) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-[#0B173D]">Attendance</h2>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="flex gap-4 mb-6 text-sm font-medium">
              <div className="flex items-center gap-1.5 text-gray-500">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0B173D]"></div> Present
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div> Absent
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
            {/* Calendar Mockup */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 cursor-pointer">{"<<"}</span>
                <span className="text-gray-400 cursor-pointer">{"<"}</span>
                <h3 className="font-bold text-[#0B173D]">May 2026</h3>
                <span className="text-gray-400 cursor-pointer">{">"}</span>
                <span className="text-gray-400 cursor-pointer">{">>"}</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
                <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div className="text-[#0B173D]">SAT</div><div className="text-[#0B173D]">SUN</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
                {/* Simulated Days */}
                <div className="text-gray-300 py-1.5">27</div><div className="text-gray-300 py-1.5">28</div><div className="text-gray-300 py-1.5">29</div><div className="text-gray-300 py-1.5">30</div>
                <div className="py-1.5">1</div><div className="text-orange-500 py-1.5">2</div><div className="text-orange-500 py-1.5">3</div>
                <div className="py-1.5">4</div><div className="py-1.5">5</div><div className="py-1.5">6</div><div className="py-1.5">7</div><div className="py-1.5">8</div><div className="text-orange-500 py-1.5">9</div><div className="text-orange-500 py-1.5">10</div>
                <div className="py-1.5">11</div><div className="py-1.5">12</div><div className="py-1.5">13</div><div className="py-1.5">14</div><div className="py-1.5">15</div><div className="text-orange-500 py-1.5">16</div><div className="text-orange-500 py-1.5">17</div>
                <div className="py-1.5">18</div><div className="py-1.5">19</div><div className="py-1.5">20</div><div className="py-1.5">21</div><div className="py-1.5">22</div><div className="text-orange-500 py-1.5">23</div><div className="text-orange-500 py-1.5">24</div>
                <div className="py-1.5">25</div><div className="py-1.5">26</div><div className="py-1.5">27</div><div className="py-1.5">28</div><div className="py-1.5">29</div><div className="text-orange-500 py-1.5">30</div>
                <div className="bg-[#0B173D] text-white rounded-full py-1.5 shadow-md">31</div>
              </div>
            </motion.div>

            {/* Events List */}
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
                      <span className="text-xs text-gray-400">{event.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
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