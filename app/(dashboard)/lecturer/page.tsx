"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  ClipboardList,
  Clock,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";

// --- Mock Data ---
const statsData = [
  { title: "Total Students", value: "145", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { title: "Active Courses", value: "4", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50" },
  { title: "Pending Grading", value: "28", icon: ClipboardList, color: "text-red-500", bg: "bg-red-50" },
  { title: "Next Class", value: "10:00 AM", icon: Clock, color: "text-green-500", bg: "bg-green-50" },
];

const announcementsData = [
  {
    id: 1,
    title: "Faculty Meeting Update",
    date: "2026-05-31",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita. Rerum, quidem facilis?",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    title: "Mid-Semester Result Submission",
    date: "2026-06-02",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita. Rerum, quidem facilis?",
    bgColor: "bg-purple-50",
  },
  {
    id: 3,
    title: "New Lab Equipment Arrival",
    date: "2026-06-05",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita. Rerum, quidem facilis?",
    bgColor: "bg-yellow-50",
  },
];

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LecturerDashboard() {
  const [scheduleView, setScheduleView] = useState<"Work Week" | "Day">("Work Week");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* --- Top Welcome Banner (Navy Theme) --- */}
        <motion.div variants={itemVariants} className="bg-[#0B173D] rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                Welcome back, Dr. Adewale! 👋
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full font-medium">Lecturer ID: LCT/2018/045</span>
                <span className="text-blue-200">Computer Science Dept</span>
                <span className="text-blue-200 hidden sm:inline">•</span>
                <span className="text-blue-200">2025/2026 Session</span>
              </div>
              <p className="text-blue-100/80 mt-4 text-sm max-w-xl">
                You have 28 pending assignments to grade and your next class begins in 45 minutes. Have a great day ahead!
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- Quick Stats Row --- */}
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

        {/* --- Main Content Split --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left Column: Schedule Grid (Takes up 2/3 space on large screens) */}
          <motion.div variants={itemVariants} className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            {/* Schedule Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-[#0B173D]">Schedule</h2>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm font-medium text-gray-600">June 01 – 05</span>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setScheduleView("Work Week")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${scheduleView === "Work Week" ? "bg-white text-[#0B173D] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    Work Week
                  </button>
                  <button
                    onClick={() => setScheduleView("Day")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${scheduleView === "Day" ? "bg-white text-[#0B173D] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>

            {/* Schedule Table Area */}
            <div className="flex-1 overflow-x-auto rounded-xl border border-gray-100">
              <div className="min-w-[700px]">
                {/* Days Header */}
                <div className="grid grid-cols-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="p-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider border-r border-gray-100">Time</div>
                  {daysOfWeek.map((day, i) => (
                    <div key={day} className={`p-3 text-center text-sm font-medium text-gray-600 ${i !== daysOfWeek.length - 1 ? 'border-r border-gray-100' : ''}`}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time Slots Grid */}
                <div className="relative">
                  {/* Mock Class Block 1 (Monday 10am-12pm) */}
                  <div className="absolute top-[100px] left-[16.66%] w-[16.66%] h-[100px] p-1 z-10">
                    <div className="bg-[#0B173D] w-full h-full rounded-lg p-2 shadow-sm border border-[#1a2a6c] flex flex-col justify-center">
                      <span className="text-xs font-bold text-white leading-tight">CSC 401</span>
                      <span className="text-[10px] text-blue-200 mt-0.5">Software Eng.</span>
                      <span className="text-[10px] text-white/60 mt-1">LT 1</span>
                    </div>
                  </div>

                  {/* Mock Class Block 2 (Wednesday 1pm-3pm) */}
                  <div className="absolute top-[250px] left-[50%] w-[16.66%] h-[100px] p-1 z-10">
                    <div className="bg-orange-50 w-full h-full rounded-lg p-2 shadow-sm border border-orange-200 border-l-4 border-l-orange-500 flex flex-col justify-center">
                      <span className="text-xs font-bold text-orange-900 leading-tight">CSC 411</span>
                      <span className="text-[10px] text-orange-700 mt-0.5">Lab Session</span>
                      <span className="text-[10px] text-orange-500 mt-1">Lab 3</span>
                    </div>
                  </div>

                  {timeSlots.map((time, rowIndex) => (
                    <div key={time} className="grid grid-cols-6 border-b border-gray-50 last:border-b-0 group">
                      {/* Time Column */}
                      <div className="p-3 h-[50px] flex items-center justify-center text-xs font-medium text-gray-400 border-r border-gray-100 bg-white">
                        {time}
                      </div>
                      {/* Empty Cells */}
                      {daysOfWeek.map((_, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`h-[50px] border-r border-gray-50 transition-colors group-hover:bg-gray-50/30 ${colIndex === daysOfWeek.length - 1 ? 'border-r-0' : ''}`}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Announcements */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#0B173D]">Announcements</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {announcementsData.map((item) => (
                <div
                  key={item.id}
                  className={`${item.bgColor} rounded-xl p-4 transition-transform hover:-translate-y-1 cursor-pointer`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 text-sm w-3/4 leading-tight">{item.title}</h4>
                    <span className="text-xs font-medium text-gray-500 bg-white/50 px-2 py-1 rounded-md">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center text-xs font-bold text-[#0B173D]">
                    Read more <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Button for Lecturer */}
            <button className="w-full mt-6 bg-white border-2 border-dashed border-gray-200 text-gray-500 font-medium py-3 rounded-xl hover:border-[#0B173D] hover:text-[#0B173D] transition-colors flex items-center justify-center gap-2 text-sm">
              <ClipboardList className="w-4 h-4" />
              Post New Announcement
            </button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}