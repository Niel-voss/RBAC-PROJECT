"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ClipboardList } from "lucide-react";

// --- Mock Data ---
const announcementsData = [
  {
    id: 1,
    title: "Faculty Meeting Update",
    date: "2026-05-31",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita.",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    title: "Mid-Semester Result Submission",
    date: "2026-06-02",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita.",
    bgColor: "bg-purple-50",
  },
  {
    id: 3,
    title: "New Lab Equipment Arrival",
    date: "2026-06-05",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita.",
    bgColor: "bg-yellow-50",
  },
];

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// --- Animation Variants ---
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const AnnouncementSection = () => {
  const [scheduleView, setScheduleView] = useState<"Work Week" | "Day">("Work Week");

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* --- Left Column: Schedule Grid --- */}
      <motion.div variants={itemVariants} className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
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
            {/* Table Header */}
            <div className="grid grid-cols-6 border-b border-gray-100 bg-gray-50/50">
              <div className="p-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider border-r border-gray-100">Time</div>
              {daysOfWeek.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-100 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid & Courses Container */}
            <div className="relative">

              {/* --- COURSE BLOCKS --- */}
              {/* Monday 10:00 AM - 12:00 PM */}
              <div className="absolute top-[100px] left-[16.66%] w-[16.66%] h-[100px] p-1 z-10">
                <div className="bg-[#0B173D] w-full h-full rounded-lg p-2 shadow-sm border border-[#1a2a6c] flex flex-col justify-center">
                  <span className="text-xs font-bold text-white leading-tight">CSC 401</span>
                  <span className="text-[10px] text-blue-200 mt-0.5">Software Eng.</span>
                  <span className="text-[10px] text-white/60 mt-1">LT 1</span>
                </div>
              </div>

              {/* Tuesday 11:00 AM - 1:00 PM */}
              <div className="absolute top-[150px] left-[33.33%] w-[16.66%] h-[100px] p-1 z-10">
                <div className="bg-purple-50 w-full h-full rounded-lg p-2 shadow-sm border border-purple-200 border-l-4 border-l-purple-500 flex flex-col justify-center">
                  <span className="text-xs font-bold text-purple-900 leading-tight">CSC 413</span>
                  <span className="text-[10px] text-purple-700 mt-0.5">Algorithms</span>
                  <span className="text-[10px] text-purple-500 mt-1">Room 204</span>
                </div>
              </div>

              {/* Wednesday 1:00 PM - 3:00 PM */}
              <div className="absolute top-[250px] left-[50%] w-[16.66%] h-[100px] p-1 z-10">
                <div className="bg-orange-50 w-full h-full rounded-lg p-2 shadow-sm border border-orange-200 border-l-4 border-l-orange-500 flex flex-col justify-center">
                  <span className="text-xs font-bold text-orange-900 leading-tight">CSC 411</span>
                  <span className="text-[10px] text-orange-700 mt-0.5">Lab Session</span>
                  <span className="text-[10px] text-orange-500 mt-1">Lab 3</span>
                </div>
              </div>

              {/* Thursday 9:00 AM - 11:00 AM */}
              <div className="absolute top-[50px] left-[66.66%] w-[16.66%] h-[100px] p-1 z-10">
                <div className="bg-green-50 w-full h-full rounded-lg p-2 shadow-sm border border-green-200 border-l-4 border-l-green-500 flex flex-col justify-center">
                  <span className="text-xs font-bold text-green-900 leading-tight">CSC 422</span>
                  <span className="text-[10px] text-green-700 mt-0.5">Data Mining</span>
                  <span className="text-[10px] text-green-500 mt-1">LT 2</span>
                </div>
              </div>

              {/* --- BACKGROUND GRID LINES --- */}
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-6 border-b border-gray-50 last:border-b-0 group">
                  <div className="p-3 h-[50px] flex items-center justify-center text-xs font-medium text-gray-400 border-r border-gray-100 bg-white">
                    {time}
                  </div>
                  {daysOfWeek.map((_, colIndex) => (
                    <div key={colIndex} className={`h-[50px] border-r border-gray-50 group-hover:bg-gray-50/30 last:border-r-0`} />
                  ))}
                </div>
              ))}

            </div>
          </div>
        </div>
      </motion.div>

      {/* --- Right Column: Announcements --- */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0B173D]">Announcements</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</button>
        </div>

        <div className="space-y-4 flex-1">
          {announcementsData.map((item) => (
            <div key={item.id} className={`${item.bgColor} rounded-xl p-4 transition-transform hover:-translate-y-1 cursor-pointer`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 text-sm leading-tight">{item.title}</h4>
                <span className="text-xs font-medium text-gray-500 bg-white/50 px-2 py-1 rounded-md">{item.date}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{item.excerpt}</p>
              <div className="flex items-center text-xs font-bold text-[#0B173D]">
                Read more <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 bg-white border-2 border-dashed border-gray-200 text-gray-500 font-medium py-3 rounded-xl hover:border-[#0B173D] hover:text-[#0B173D] transition-colors flex items-center justify-center gap-2 text-sm">
          <ClipboardList className="w-4 h-4" />
          Post New Announcement
        </button>
      </motion.div>
    </div>
  );
};