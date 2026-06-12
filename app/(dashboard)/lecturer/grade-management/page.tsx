import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import StudentGradesTable from "@/components/StudentGradesTable";

// Icons
import { ClipboardList, Users, CheckCircle, Clock, TrendingUp, Plus, Upload, Send, Lightbulb } from "lucide-react";

// Components


export default async function LecturerGradeManagementPage() {
  // 1. RBAC SECURITY CHECK
  const session = await auth();
  if (!session?.user || session.user.role !== "LECTURER") {
    // If a student tries to type this URL, kick them out!
    redirect("/unauthorized");
  }

  // 2. FETCH REAL STUDENTS FROM DATABASE
  // We only fetch users with the STUDENT role, and we include their profile
  const rawStudents = await prisma.user.findMany({
    where: { role: "STUDENT" },
    include: { studentProfile: true },
    orderBy: { createdAt: "desc" },
  });

  // Filter out any users that somehow don't have a profile attached yet
  const students = rawStudents
    .map(user => user.studentProfile)
    .filter((profile): profile is NonNullable<typeof profile> => profile !== null);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 bg-slate-50 min-h-screen space-y-6">

      {/* 1. Header Banner */}
      <div className="bg-[#0B173D] rounded-2xl p-6 md:p-8 flex items-center gap-6 shadow-lg text-white">
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hidden sm:block">
          <ClipboardList size={40} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Grade Management</h1>
          <p className="text-slate-300 mt-1">Manage student assessments, CGPA updates, and exams.</p>
          <div className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
            Course: CSC 401 - Software Engineering
          </div>
        </div>
      </div>

      {/* 2. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Total Students</p>
            <h3 className="text-2xl font-bold text-slate-900">{students.length}</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg"><Users className="text-blue-600" size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Submitted Marks</p>
            <h3 className="text-2xl font-bold text-slate-900">42 <span className="text-sm font-medium text-green-500">76%</span></h3>
          </div>
          <div className="bg-green-50 p-3 rounded-lg"><CheckCircle className="text-green-600" size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Pending Marks</p>
            <h3 className="text-2xl font-bold text-slate-900">13 <span className="text-sm font-medium text-orange-500">24%</span></h3>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg"><Clock className="text-orange-500" size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Average Class Score</p>
            <h3 className="text-2xl font-bold text-slate-900">67%</h3>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg"><TrendingUp className="text-purple-600" size={24} /></div>
        </div>
      </div>

      {/* 3. Main Content Layout (Table & Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: Controls & Table (Takes up 2/3 width) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Controls / Filters */}
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#3B52D9] focus:border-[#3B52D9] block w-full p-2.5 outline-none">
                <option>2025/2026</option>
              </select>
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#3B52D9] focus:border-[#3B52D9] block w-full p-2.5 outline-none">
                <option>First Semester</option>
              </select>
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#3B52D9] focus:border-[#3B52D9] block w-full p-2.5 outline-none">
                <option>CSC 401 - Software Engineering</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-[#0B173D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#15275e] transition">
                  <Plus size={16} /> Add Assessment
                </button>
                <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  <Upload size={16} /> Upload CSV
                </button>
              </div>
              <button className="flex items-center gap-2 bg-[#3B52D9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                <Send size={16} /> Publish Grades
              </button>
            </div>
          </div>

          {/* Student Table */}
          <StudentGradesTable students={students} />
        </div>

        {/* RIGHT COLUMN: Charts & Breakdowns (Takes up 1/3 width) */}
        <div className="space-y-6">

          {/* Marks Entered Progress */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Marks Entered</h3>
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-bold text-[#0B173D]">48 <span className="text-sm text-slate-400 font-normal">/ 55</span></span>
              <span className="text-sm font-bold text-slate-700">87%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
              <div className="bg-[#0B173D] h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
            <p className="text-xs text-slate-500">Keep it up! Almost there.</p>
          </div>

          {/* Assessment Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Assessment Breakdown</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span>CA1 (Class Test 1)</span> <span className="font-medium text-slate-900">10%</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span>CA2 (Class Test 2)</span> <span className="font-medium text-slate-900">10%</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span>Assignment</span> <span className="font-medium text-slate-900">20%</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span>Final Exam</span> <span className="font-medium text-slate-900">60%</span>
              </li>
              <li className="flex justify-between items-center pt-2 text-[#0B173D] font-bold">
                <span>Total</span> <span>100%</span>
              </li>
            </ul>
          </div>

          {/* Quick Tips Box */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
            <div className="flex items-center gap-2 mb-2 text-yellow-800 font-bold">
              <Lightbulb size={18} className="text-yellow-600" />
              Quick Tips
            </div>
            <p className="text-sm text-yellow-700 leading-relaxed">
              You can instantly edit a student&apos;s Cumulative Grade Point Average using the <strong>Update CGPA</strong> button. Don&apos;t forget to click &#39;Publish Grades&#39; when the semester ends!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}