"use client";

import { motion } from "framer-motion";
import { Star, BookOpen, FileText, Users } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardStats() {
  const stats = {
    cgpa: { current: 3.89, max: 5.00 },
    courses: { current: 6, max: 10 },
    assignments: { current: 3, max: 10 },
    attendance: { current: 92, max: 100 },
  };

  const cgpaProgress = (stats.cgpa.current / stats.cgpa.max) * 100;
  const coursesProgress = (stats.courses.current / stats.courses.max) * 100;
  const assignmentsProgress = (stats.assignments.current / stats.assignments.max) * 100;
  const attendanceProgress = stats.attendance.current;

  const circleRadius = 16;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleOffset = circleCircumference - (cgpaProgress / 100) * circleCircumference;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
    >
      {/* 1. CGPA Card */}
      <motion.div variants={cardVariants} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">CGPA</span>
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="flex items-end justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-900 leading-none">{stats.cgpa.current}</span>
            <span className="text-[10px] text-slate-400 mt-1 font-medium">Out of {stats.cgpa.max.toFixed(2)}</span>
          </div>
          <div className="relative w-10 h-10 flex items-center justify-center -mb-1 -mr-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r={circleRadius} className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="transparent" />
              <circle
                cx="20" cy="20" r={circleRadius}
                className="text-[#3B52D9]"
                strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="transparent"
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleOffset}
                style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* 2. Registered Courses Card */}
      <motion.div variants={cardVariants} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Registered Courses</span>
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-2xl font-bold text-slate-900 leading-none">{stats.courses.current}</span>
          <span className="text-[10px] text-slate-400 mt-1 font-medium">Courses</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1 mt-3">
          <div className="bg-[#3B52D9] h-1 rounded-full" style={{ width: `${coursesProgress}%`, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }}></div>
        </div>
      </motion.div>

      {/* 3. Pending Assignments Card */}
      <motion.div variants={cardVariants} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pending Assignments</span>
          <FileText className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-2xl font-bold text-slate-900 leading-none">{stats.assignments.current}</span>
          <span className="text-[10px] text-slate-400 mt-1 font-medium">Tasks</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1 mt-3">
          <div className="bg-orange-500 h-1 rounded-full" style={{ width: `${assignmentsProgress}%`, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }}></div>
        </div>
      </motion.div>

      {/* 4. Attendance Percentage Card */}
      <motion.div variants={cardVariants} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Attendance Percentage</span>
          <Users className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-2xl font-bold text-slate-900 leading-none">{stats.attendance.current}%</span>
          <span className="text-[10px] text-green-600 mt-1 font-medium">Excellent</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1 mt-3">
          <div className="bg-green-500 h-1 rounded-full" style={{ width: `${attendanceProgress}%`, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }}></div>
        </div>
      </motion.div>
    </motion.div>
  );
}