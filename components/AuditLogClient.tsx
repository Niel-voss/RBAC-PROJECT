'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, ChevronLeft, ChevronRight,
  Activity, Clock, User, ShieldAlert, Edit3, Trash2, CheckCircle2
} from 'lucide-react';

export interface AuditLogEntry {
  id: string;
  action: string;
  actor: string;
  target: string;
  details: string | null;
  createdAt: Date;
}

export default function AuditLogClient({ initialLogs }: { initialLogs: AuditLogEntry[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Handle Search Input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // 2. OPTIMIZED FILTERING
  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) return initialLogs;

    const lower = searchQuery.toLowerCase();
    return initialLogs.filter((log) =>
      log.actor.toLowerCase().includes(lower) ||
      log.target.toLowerCase().includes(lower) ||
      log.action.toLowerCase().includes(lower) ||
      (log.details && log.details.toLowerCase().includes(lower))
    );
  }, [initialLogs, searchQuery]);

  // 3. PAGINATION MATH
  const totalLogs = filteredLogs.length;
  const totalPages = Math.ceil(totalLogs / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  // Formatting helpers
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true
    }).format(new Date(date));
  };

  const getActionStyles = (action: string) => {
    if (action.includes('SUSPEND') || action.includes('DELETE')) {
      return { bg: 'bg-red-50', text: 'text-red-700', icon: <Trash2 size={16} /> };
    }
    if (action.includes('UPDATE')) {
      return { bg: 'bg-blue-50', text: 'text-blue-700', icon: <Edit3 size={16} /> };
    }
    if (action.includes('CREATE')) {
      return { bg: 'bg-green-50', text: 'text-green-700', icon: <CheckCircle2 size={16} /> };
    }
    return { bg: 'bg-gray-50', text: 'text-gray-700', icon: <Activity size={16} /> };
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-8 max-w-7xl mx-auto text-gray-800">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <ShieldAlert className="text-indigo-600" /> System Audit Log
          </h1>
          <p className="text-sm text-gray-500">
            A secure, read-only record of all critical administrative actions.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search logs by user, action, or details..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 bg-white placeholder:text-gray-400 border border-gray-200 rounded-lg outline-none focus:border-[#0B173D] focus:ring-1 focus:ring-[#0B173D] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium w-full sm:w-auto justify-center hover:bg-gray-100 transition">
          <Filter className="w-4 h-4" /> Filter Logs
        </button>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Actor (Who)</th>
                <th className="px-6 py-4">Target (To Whom)</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentLogs.map((log) => {
                const styles = getActionStyles(log.action);
                return (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${styles.bg} ${styles.text}`}>
                        {styles.icon} {log.action.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                      <User size={14} className="text-gray-400" /> {log.actor}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{log.target}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{log.details || "-"}</td>
                    <td className="px-6 py-4 text-right text-gray-500 flex items-center justify-end gap-1.5 text-xs whitespace-nowrap">
                      <Clock size={14} /> {formatDate(log.createdAt)}
                    </td>
                  </tr>
                );
              })}
              {currentLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? "No logs found matching your search." : "The audit log is completely clean."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + itemsPerPage, totalLogs)}</span> of <span className="font-medium text-gray-900">{totalLogs}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {/* Simple page numbers for the log */}
            <span className="px-4 text-sm font-medium text-gray-700">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}