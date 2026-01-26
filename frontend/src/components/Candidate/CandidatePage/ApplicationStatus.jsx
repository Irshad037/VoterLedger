import React, { useState } from 'react';
import { 
  Clock, CheckCircle2, XCircle, Info, ChevronRight, 
  Search, Filter, LayoutGrid, ListFilter, AlertCircle 
} from 'lucide-react';

const ApplicationStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const applications = [
    { id: 1, electionName: "Municipal Council Election 2024 - Ward 7", appliedDate: "2024-03-15", status: "Approved", remarks: "Documents verified. Proceed to next stage." },
    { id: 2, electionName: "Regional Assembly Elections - North District", appliedDate: "2024-03-20", status: "Pending", remarks: "Awaiting affidavit verification." },
    { id: 3, electionName: "State Gubernatorial Race - Primary", appliedDate: "2024-03-22", status: "Rejected", remarks: "Incomplete financial disclosure statement." },
    { id: 4, electionName: "National Parliament - Constituency 12", appliedDate: "2024-03-25", status: "Approved", remarks: "Candidate profile cleared for public listing." },
    { id: 5, electionName: "Local School Board Elections - District B", appliedDate: "2024-03-28", status: "Pending", remarks: "Background check initiated." },
    { id: 6, electionName: "Youth Representative Council - City Central", appliedDate: "2024-04-01", status: "Approved", remarks: "Application accepted. Orientation scheduled." }
  ];

  const stats = [
    { label: "Total Applied", count: applications.length, color: "text-zinc-600", bg: "bg-zinc-100" },
    { label: "Approved", count: applications.filter(a => a.status === "Approved").length, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending", count: applications.filter(a => a.status === "Pending").length, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Rejected", count: applications.filter(a => a.status === "Rejected").length, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.electionName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || app.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Pending": return "bg-blue-50 text-blue-700 border-blue-100";
      case "Rejected": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-zinc-50 text-zinc-600 border-zinc-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved": return <CheckCircle2 size={14} />;
      case "Pending": return <Clock size={14} />;
      case "Rejected": return <XCircle size={14} />;
      default: return <Info size={14} />;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-zinc-50/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Application Status</h1>
            <p className="text-zinc-500 mt-1">Track your progress and administrative feedback.</p>
          </div>
          <div className="flex gap-3">
             {stats.map((stat, idx) => (
               <div key={idx} className={`${stat.bg} px-4 py-2 rounded-2xl border border-white shadow-sm`}>
                 <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">{stat.label}</p>
                 <p className={`text-xl font-black ${stat.color}`}>{stat.count}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text"
              placeholder="Search by election name..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-zinc-200 shadow-sm">
            {["All", "Approved", "Pending", "Rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
                  activeFilter === f ? "bg-blue-600 text-white shadow-md" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Container */}
        <div className="bg-white rounded-lg border-2 border-zinc-300 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b-2 border-zinc-300">
                  <th className="px-8 py-5 text-xs font-black text-zinc-900 uppercase tracking-widest">Election Name</th>
                  <th className="px-8 py-5 text-xs font-black text-zinc-900 uppercase tracking-widest text-center">Applied Date</th>
                  <th className="px-8 py-5 text-xs font-black text-zinc-900 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-xs font-black text-zinc-900 uppercase tracking-widest">Admin Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="group hover:bg-blue-50/30 transition-all duration-300 border-b-2 border-zinc-200">
                      <td className="px-8 py-4">
                        <div className="font-bold text-zinc-600 group-hover:text-blue-400 transition-colors leading-tight max-w-xs">
                          {app.electionName}
                        </div>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <div className="text-sm font-bold text-zinc-500 font-mono bg-zinc-100/50 py-1 px-3 rounded-lg inline-block">
                          {app.appliedDate}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black border shadow-sm ${getStatusStyles(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm text-zinc-500 italic leading-snug">
                            "{app.remarks}"
                          </p>
                          {/* <button className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            Details <ChevronRight size={14} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <AlertCircle className="text-zinc-200" size={48} />
                        <p className="text-zinc-400 font-bold uppercase tracking-widest">No matching applications found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;