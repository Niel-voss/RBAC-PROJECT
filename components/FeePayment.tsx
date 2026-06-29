"use client";

import { motion } from "framer-motion";
import { CheckCircle2, DollarSign } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.3 },
  },
};

export default function FeePayment() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      // h-full ensures it stretches to match the height of the schedule component
      className="w-full h-full bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col"
    >
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-slate-900 leading-tight">Fee Payment</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Current semester status</p>
      </div>

      {/* Status Alert Box */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex justify-between items-start mb-5">
        <div>
          <p className="text-[10px] text-slate-500 mb-0.5">Payment Status</p>
          <h3 className="text-lg font-bold text-green-600 leading-tight">Fully Paid</h3>
        </div>
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      </div>

      {/* Fee Breakdown */}
      <div className="flex flex-col gap-2.5 mb-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-500">Total Fees</span>
          <span className="text-[11px] font-bold text-slate-900">₦95,750</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-500">Amount Paid</span>
          <span className="text-[11px] font-bold text-green-600">₦95,750</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-500">Outstanding</span>
          <span className="text-[11px] font-bold text-slate-900">₦0</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
        {/* Width is 100% since outstanding is 0. You can make this dynamic later */}
        <div className="h-full bg-[#3B52D9] rounded-full w-full"></div>
      </div>

      {/* Action Button */}
      <button className="w-full flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-medium py-2 rounded-lg border border-slate-200 transition-colors mb-6">
        <DollarSign className="w-3.5 h-3.5 text-slate-500" /> View Transactions
      </button>

      {/* Recent Transactions - Pushed to bottom if container stretches */}
      <div className="mt-auto">
        <h4 className="text-[11px] font-bold text-slate-900 mb-3">Recent Transactions</h4>
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-slate-500">School Fees - Sem 2</span>
            <span className="text-[11px] font-bold text-slate-900">₦95,750</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-slate-500">Development Levy</span>
            <span className="text-[11px] font-bold text-slate-900">₦50,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-slate-500">ID Card</span>
            <span className="text-[11px] font-bold text-slate-900">₦5,000</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}