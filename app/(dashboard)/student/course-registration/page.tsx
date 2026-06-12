"use client"

import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  RotateCcw,
  Plus,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RefreshCcw
} from 'lucide-react';

const CourseRegistrationContent = () => {
  const [activeTab, setActiveTab] = useState('available');

  const courses = [
    { code: 'CSC 411', title: 'Operating Systems', dept: 'Computer Science', lecturer: 'Dr. Osagie', level: '400', units: 3, schedule: 'Mon, Wed\n08:00 - 10:00 AM', status: 'added' },
    { code: 'CSC 413', title: 'Database Management', dept: 'Computer Science', lecturer: 'Prof. Omoruyi', level: '400', units: 3, schedule: 'Tue, Thu\n10:00 - 12:00 PM', status: 'added' },
    { code: 'CSC 415', title: 'Artificial Intelligence', dept: 'Computer Science', lecturer: 'Dr. Igbinedion', level: '400', units: 3, schedule: 'Mon, Wed\n02:00 - 04:00 PM', status: 'add' },
    { code: 'CSC 416', title: 'Computer Architecture', dept: 'Computer Science', lecturer: 'Dr. Eke', level: '400', units: 3, schedule: 'Tue, Thu\n08:00 - 10:00 AM', status: 'add' },
    { code: 'CSC 418', title: 'Design & Analysis of Computer Algorithms', dept: 'Computer Science', lecturer: 'Prof. Edosomwan', level: '400', units: 3, schedule: 'Fri\n10:00 - 01:00 PM', status: 'added' },
    { code: 'CSC 419', title: 'Research Seminar', dept: 'Computer Science', lecturer: 'Dr. Ogbomo', level: '400', units: 3, schedule: 'Wed, Fri\n02:00 - 04:00 PM', status: 'added' },
    { code: 'CSC 427', title: 'Data Communications and Networks', dept: 'Computer Science', lecturer: 'Dr. Uyi', level: '400', units: 3, schedule: 'Mon, Wed\n04:00 - 06:00 PM', status: 'added' },
    { code: 'CSC 499', title: 'Final Year Project', dept: 'Computer Science', lecturer: 'Project Supervisor', level: '400', units: 6, schedule: 'Tue, Thu\n02:00 - 04:00 PM', status: 'added' },
  ];

  const registeredCourses = [
    { code: 'CSC 411', title: 'Operating Systems', units: 3 },
    { code: 'CSC 413', title: 'Database Management', units: 3 },
    { code: 'CSC 418', title: 'Design & Analysis of Computer Algorithms', units: 3 },
    { code: 'CSC 419', title: 'Research Seminar', units: 3 },
    { code: 'CSC 427', title: 'Data Communications and Networks', units: 3 },
    { code: 'CSC 499', title: 'Final Year Project', units: 6 },
  ];

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Course Registration</h1>
          <p className="text-gray-500 text-sm">Browse and register for available courses for the selected semester.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0f172a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          <Calendar className="w-4 h-4" />
          View Timetable
        </button>
      </div>

      {/* Status Banner */}
      <div className="border border-gray-200 rounded-xl p-5 flex flex-wrap gap-8 items-center mb-8 bg-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Current Semester</p>
            <p className="font-semibold text-gray-900">2025/2026 - Semester 2</p>
          </div>
        </div>

        <div className="h-10 w-px bg-gray-200 hidden md:block"></div>

        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
            Open
          </span>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Registration Status</p>
            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
              <RefreshCcw className="w-3.5 h-3.5 text-green-600" />
              <span className="text-gray-500 text-xs font-normal flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Closes on July 4, 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px] relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses by code, title or lecturer..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 relative min-w-[160px]">
          <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
            <option>All Departments</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 relative min-w-[140px]">
          <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
            <option>All Levels</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 relative min-w-[140px]">
          <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
            <option>All Status</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
        </div>

        {/* Dark Blue Accent Applied to Filter Button */}
        <button className="flex items-center gap-2 bg-[#0f172a] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm shadow-slate-800/20">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {['Available Courses', 'Registered Courses (6)', 'Plan (3)'].map((tab, idx) => {
          const isActive = idx === 0;
          return (
            <button
              key={tab}
              className={`pb-3 text-sm font-medium relative ${isActive ? 'text-[#0f172a]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
              {isActive && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#0f172a] rounded-t-full"></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

        {/* Table Area */}
        <div className="xl:col-span-3 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="pb-4 font-medium">Course Code</th>
                <th className="pb-4 font-medium">Course Title</th>
                <th className="pb-4 font-medium">Lecturer</th>
                <th className="pb-4 font-medium">Level</th>
                <th className="pb-4 font-medium text-center">Units</th>
                <th className="pb-4 font-medium">Schedule</th>
                <th className="pb-4 font-medium text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {courses.map((course, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4">
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded text-xs font-semibold border border-blue-100/50">
                      {course.code}
                    </span>
                  </td>
                  <td className="py-4">
                    <p className="font-semibold text-gray-900">{course.title}</p>
                    <p className="text-xs text-gray-500">{course.dept}</p>
                  </td>
                  <td className="py-4 text-gray-600">{course.lecturer}</td>
                  <td className="py-4 text-gray-600">{course.level}</td>
                  <td className="py-4 text-center">
                    <span className="bg-purple-50 text-purple-600 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-semibold">
                      {course.units}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500 text-xs whitespace-pre-line leading-relaxed">
                    {course.schedule}
                  </td>
                  <td className="py-4 text-right pr-2">
                    {course.status === 'add' ? (
                      <button className="inline-flex items-center gap-1.5 bg-[#0f172a] text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-slate-800 transition-colors ml-auto">
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    ) : (
                      <button className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-xs font-medium border border-green-200 ml-auto cursor-default">
                        <Check className="w-3.5 h-3.5" />
                        Added
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
            <p>Showing 1 to 8 of 32 courses</p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#0f172a] text-white font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 font-medium">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 font-medium">3</button>
              <span className="px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 font-medium">4</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 relative">
              <select className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 focus:outline-none cursor-pointer">
                <option>10 per page</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="xl:col-span-1">
          <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-5 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Registration Summary</h3>

            <div className="mb-5">
              <p className="text-3xl font-bold text-green-600 leading-none mb-1">6</p>
              <p className="text-xs text-gray-500">Total Registered Courses</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Units</p>
                  <p className="text-xl font-bold text-gray-900 leading-none">18</p>
                </div>
                <p className="text-[10px] text-gray-400">Maximum: 24 units</p>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                {/* Dark Blue Accent Applied to Progress Bar */}
                <div className="h-full bg-[#0f172a] rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-5 mb-6">
              <h4 className="text-xs font-semibold text-gray-500 mb-4">Registered Courses</h4>
              <div className="space-y-3">
                {registeredCourses.map((rc, idx) => (
                  <div key={idx} className="flex items-start justify-between group">
                    <div>
                      <p className="text-xs font-bold text-blue-600">{rc.code}</p>
                      <p className="text-[11px] text-gray-600 line-clamp-1">{rc.title}</p>
                      <p className="text-[10px] text-gray-400">{rc.units} Units</p>
                    </div>
                    <button className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Blue Accent Applied to Primary Action */}
            <button className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md shadow-slate-800/20">
              <Check className="w-4 h-4" />
              Confirm Registration
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              Please review your courses before confirming.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseRegistrationContent;