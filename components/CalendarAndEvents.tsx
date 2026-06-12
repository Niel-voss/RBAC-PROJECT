"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

export default function CalendarAndEvents() {
  // 1. Safe state initialization for Next.js hydration
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    // 1. Defer the initial state update to avoid synchronous cascading renders
    const initialTimer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 0);

    // 2. Keep the interval for hourly refreshes
    const intervalTimer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60);

    // 3. Clean up both timers
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const eventsData = [
    { id: 1, title: "Final Year Project Defense", time: "10:00 AM - 1:00 PM", border: "border-blue-500" },
    { id: 2, title: "Faculty Meeting", time: "2:00 PM - 3:30 PM", border: "border-orange-500" },
    { id: 3, title: "System Maintenance", time: "11:00 PM - 1:00 AM", border: "border-green-500" },
  ];

  // 3. Render a safe fallback while waiting for the client to mount
  if (!currentDate) {
    return (
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-[350px] animate-pulse"></div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-[250px] animate-pulse"></div>
      </div>
    );
  }

  // 4. Extract standard real-time metrics
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calculate the total days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Calculate the day of the week the 1st falls on (JS default: 0 = Sun, 1 = Mon...)
  const firstDayOfMonthJS = new Date(year, month, 1).getDay();

  // 5. Adjust layout for a Monday-start grid
  // This formula safely shifts Sun (0) to index 6, Mon (1) to index 0, etc.
  const firstDayOffset = (firstDayOfMonthJS + 6) % 7;

  // Generate mapping arrays for rendering
  const emptyDays = Array.from({ length: firstDayOffset });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="lg:col-span-3 space-y-6">
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 cursor-pointer hover:text-[#0B173D] transition-colors">{"<<"}</span>
          <span className="text-gray-400 cursor-pointer hover:text-[#0B173D] transition-colors">{"<"}</span>
          <h3 className="font-bold text-[#0B173D]">
            {monthNames[month]} {year}
          </h3>
          <span className="text-gray-400 cursor-pointer hover:text-[#0B173D] transition-colors">{">"}</span>
          <span className="text-gray-400 cursor-pointer hover:text-[#0B173D] transition-colors">{">>"}</span>
        </div>

        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div className="text-[#0B173D]">SAT</div>
          <div className="text-[#0B173D]">SUN</div>
        </div>

        {/* Dynamic Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">

          {/* Empty offset blocks before the 1st of the month */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="py-1.5"></div>
          ))}

          {/* Actual current days map */}
          {days.map((day) => {
            const isToday = day === today;

            // Calculate column placement to correctly flag weekends (Sat/Sun)
            const gridIndex = firstDayOffset + day - 1;
            const isWeekend = gridIndex % 7 === 5 || gridIndex % 7 === 6;

            return (
              <div
                key={day}
                className={`py-1.5 ${isToday
                  ? "bg-[#0B173D] text-white rounded-full shadow-md" // Highlights exact current day
                  : isWeekend
                    ? "text-orange-500" // Automatically targets SAT/SUN based on layout
                    : ""
                  }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Events Section (Unchanged) */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#0B173D]">Events</h2>
          <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-[#0B173D] transition-colors" />
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
  );
}