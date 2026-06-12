"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import CgpaUpdateModal from "@/components/CgpaUpdate";

// Define the shape of your student prop
interface Student {
  id: string;
  studentName: string;
  matriculationNumber: string;
  cgpa: number | null;
}

export default function StudentGradesTable({ students }: { students: Student[] }) {
  // 1. State for Search and Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 👉 CHANGED: Now shows exactly 7 students per page
  const ITEMS_PER_PAGE = 7;

  // 2. Handle Search Input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 whenever they type a new search
  };

  // 3. OPTIMIZED FILTERING
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;

    return students.filter((student) =>
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matriculationNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  // 4. PAGINATION MATH
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // 5. Slice the array to only show the current 7 students
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mt-6">

      {/* Table Header & Search Bar */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search student by name or matric no..."
            value={searchQuery}
            onChange={handleSearch}
            // 👉 CHANGED: Added text-slate-900, bg-white, and placeholder:text-slate-400 to force visibility
            className="w-full pl-9 pr-4 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 border border-slate-200 rounded-lg outline-none focus:border-[#3B52D9] focus:ring-1 focus:ring-[#3B52D9] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 text-sm text-slate-600 font-medium hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* The Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 font-semibold">#</th>
              <th className="px-6 py-4 font-semibold">Matric No</th>
              <th className="px-6 py-4 font-semibold">Student Name</th>
              <th className="px-6 py-4 font-semibold text-center">CGPA</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  {searchQuery ? "No students found matching your search." : "No students have registered yet."}
                </td>
              </tr>
            ) : (
              currentStudents.map((student, index) => (
                <tr key={student.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-slate-400">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{student.matriculationNumber}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{student.studentName}</td>
                  <td className="px-6 py-4 text-center font-bold text-[#3B52D9]">
                    {(student.cgpa ?? 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <CgpaUpdateModal
                      studentId={student.id}
                      studentName={student.studentName}
                      matricNo={student.matriculationNumber}
                      currentCgpa={student.cgpa ?? 0.0}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Dynamic Pagination Footer */}
      {totalPages > 0 && (
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 bg-white">
          <span>
            Showing <span className="font-medium text-slate-900">{startIndex + 1}</span> to{" "}
            <span className="font-medium text-slate-900">
              {Math.min(endIndex, filteredStudents.length)}
            </span>{" "}
            of <span className="font-medium text-slate-900">{filteredStudents.length}</span> students
          </span>

          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1 border rounded transition-colors ${currentPage === pageNumber
                    ? "bg-[#0B173D] text-white border-[#0B173D]"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}