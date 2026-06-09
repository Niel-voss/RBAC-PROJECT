"use client";

import { AnnouncementSection } from "@/components/AnnouncementSection";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, ClipboardList, Clock } from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LecturerDashboardClient({
  name,
  lecturerId,
  studentCount
}: {
  name: string;
  lecturerId: string;
  studentCount: string;
}) {
  const statsData = [
    { title: "Total Students", value: studentCount, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Active Courses", value: "4", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Pending Grading", value: "28", icon: ClipboardList, color: "text-red-500", bg: "bg-red-50" },
    { title: "Next Class", value: "10:00 AM", icon: Clock, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Banner */}
        <motion.div variants={itemVariants} className="bg-[#0B173D] rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome back, {name}! 👋</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full font-medium">ID: {lecturerId}</span>
              <span className="text-blue-200">Computer Science Dept • 2025/2026 Session</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-[#0B173D]">{stat.value}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- Main Content Grid --- */}
        <div className="mt-6">
          <AnnouncementSection />
        </div>

      </motion.div>
    </div>
  );
}