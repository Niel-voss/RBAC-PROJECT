"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit3, CheckCircle2, Loader2 } from "lucide-react";
import { updateStudentCgpa } from "@/lib/actions";

interface CgpaUpdateModalProps {
  studentId: string;
  studentName: string;
  matricNo: string;
  currentCgpa: number;
}

export default function CgpaUpdateModal({ studentId, studentName, matricNo, currentCgpa }: CgpaUpdateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCgpa, setNewCgpa] = useState<string>(currentCgpa.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle the form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cgpaValue = parseFloat(newCgpa);

    // Call the secure Server Action
    const result = await updateStudentCgpa(studentId, cgpaValue);

    if (result.success) {
      setSuccess(true);
      // Wait a second to show the success checkmark, then close modal
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitting(false);
        setSuccess(false);
      }, 1500);
    } else {
      alert("Failed to update CGPA. Are you sure you have Lecturer permissions?");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* The Trigger Button (Can be placed in your table's Action column) */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#3B52D9] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
      >
        <Edit3 size={14} />
        Update CGPA
      </button>

      {/* The Animated Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />

            {/* Modal Box */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden pointer-events-auto"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Update Academic Record</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleUpdate} className="p-6">
                  <div className="mb-6">
                    <p className="text-sm text-slate-500 mb-1">Student</p>
                    <p className="font-semibold text-slate-900">{studentName}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{matricNo}</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cgpa" className="block text-sm font-medium text-slate-700">
                      New Cumulative Grade Point Average
                    </label>
                    <input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0.00"
                      max="5.00"
                      required
                      value={newCgpa}
                      onChange={(e) => setNewCgpa(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#3B52D9] focus:ring-2 focus:ring-[#3B52D9]/20 outline-none transition-all font-mono text-lg"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || success}
                    className="w-full mt-8 bg-[#0B173D] hover:bg-[#15275e] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && !success && <Loader2 size={18} className="animate-spin" />}
                    {success && <CheckCircle2 size={18} className="text-green-400" />}
                    {success ? "CGPA Updated Successfully" : "Save Changes"}
                  </button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}