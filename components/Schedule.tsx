import { User, Clock, ChevronRight } from 'lucide-react';

// 1. Define the exact structure your backend API should return
export interface ScheduleItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  lecturer: string;
  venue: string;
  startTime: string; // e.g., "08:00"
  endTime: string;   // e.g., "10:00 AM"
  period: string;    // e.g., "AM" or "PM"
  isOngoing: boolean;
}

// 2. Accept the data as a prop so a parent page can fetch it and pass it down
interface TodaysScheduleProps {
  scheduleData?: ScheduleItem[];
}

export default function TodaysSchedule({ scheduleData }: TodaysScheduleProps) {
  // Get today's dynamic date (e.g., "Monday, May 25, 2026")
  const todayDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  // Dummy data mimicking your API response (used if no props are passed)
  const defaultSchedule: ScheduleItem[] = [
    {
      id: '1',
      courseCode: 'CSC 401',
      courseTitle: 'Software Engineering',
      lecturer: 'Dr. Adewale',
      venue: 'LT 1',
      startTime: '08:00',
      endTime: '10:00 AM',
      period: 'AM',
      isOngoing: true, // This triggers the blue badge
    },
    {
      id: '2',
      courseCode: 'CSC 402',
      courseTitle: 'Database Systems',
      lecturer: 'Prof. Okonkwo',
      venue: 'Lab 3',
      startTime: '10:00',
      endTime: '12:00 PM',
      period: 'AM',
      isOngoing: false,
    },
    {
      id: '3',
      courseCode: 'CSC 403',
      courseTitle: 'Computer Networks',
      lecturer: 'Dr. Ibrahim',
      venue: 'LT 2',
      startTime: '02:00',
      endTime: '04:00 PM',
      period: 'PM',
      isOngoing: false,
    }
  ];

  const activeSchedule = scheduleData || defaultSchedule;

  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 p-4 shadow-sm">

      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">Today&apos;s Schedule</h2>
          <p className="text-[11px] text-slate-500 mt-0.5" suppressHydrationWarning>{todayDate}</p>
        </div>
        <button className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-medium px-2.5 py-1.5 rounded-lg border border-slate-100 transition-colors">
          View Full Timetable <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Schedule List */}
      <div className="flex flex-col gap-3">
        {activeSchedule.map((item) => (
          <div
            key={item.id}
            className="flex items-stretch gap-3 border border-slate-100 rounded-xl p-2 bg-slate-50/50 transition-colors hover:bg-slate-50"
          >
            {/* Left: Time Block */}
            <div className="w-14 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-lg py-2 shrink-0">
              <span className="text-[13px] font-bold text-[#3B52D9] leading-tight">{item.startTime}</span>
              <span className="text-[9px] font-medium text-slate-400 leading-tight uppercase mt-0.5">{item.period}</span>
            </div>

            {/* Right: Course Details */}
            <div className="flex-1 flex flex-col justify-center py-0.5">

              {/* Badges */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-slate-200/70 text-slate-600 text-[9px] font-semibold px-2 py-0.5 rounded-md">
                  {item.courseCode}
                </span>
                {item.isOngoing && (
                  <span className="bg-[#3B52D9] text-white text-[9px] font-medium px-2 py-0.5 rounded-md shadow-sm">
                    Ongoing
                  </span>
                )}
              </div>

              {/* Title & Time Container (Flex to push time to the right) */}
              <div className="flex items-start justify-between w-full">
                <h3 className="text-xs font-bold text-slate-900 pr-2">{item.courseTitle}</h3>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {item.startTime} - {item.endTime}
                </div>
              </div>

              {/* Metadata (Lecturer & Venue) */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>{item.lecturer}</span>
                <span className="text-slate-300">•</span>
                <span>{item.venue}</span>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}