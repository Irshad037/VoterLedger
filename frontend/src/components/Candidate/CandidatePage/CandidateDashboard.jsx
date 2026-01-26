import React from 'react';
import { 
  User, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowUpRight, 
  Plus, 
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CandidateDashboard = () => {
  const navigate = useNavigate();

  // Mock data representing state from other pages
  const stats = [
    { label: "Application Status", value: "Pending", sub: "Awaiting Verification", icon: <Clock className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "Approved Promises", value: "03", sub: "Manifesto Builder", icon: <CheckCircle2 className="text-emerald-600" />, bg: "bg-emerald-50" },
    { label: "Days to Election", value: "45", sub: "Mumbai North", icon: <Calendar className="text-purple-600" />, bg: "bg-purple-50" },
  ];

  const recentActivity = [
    { event: "Profile Updated", date: "2 hours ago", status: "success" },
    { event: "Manifesto Submitted", date: "1 day ago", status: "pending" },
    { event: "Documents Uploaded", date: "3 days ago", status: "success" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Candidate Dashboard</h1>
          <p className="text-zinc-500 mt-1 font-medium text-sm">Welcome back, Rajesh Kumar. Here's your candidacy overview.</p>
        </div>
        <button 
          onClick={() => navigate('/candidate/apply')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          <Plus size={20} /> Apply for New Election
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-zinc-900">{stat.value}</p>
              <p className="text-xs font-medium text-zinc-500">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Card - Styled to match your Admin Dashboard */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Profile Completion</h3>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black text-zinc-900">85%</span>
              <span className="text-blue-600 text-sm font-bold mb-2 flex items-center gap-0.5">
                <ArrowUpRight size={14} /> Ready
              </span>
            </div>
            
            <div className="mt-6 h-3 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }}></div>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-500">Affidavit Status</span>
                <span className="text-emerald-600 uppercase">Verified</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-500">Manifesto Lock</span>
                <span className="text-amber-600 uppercase">Pending Review</span>
              </div>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="bg-white rounded-[2rem] p-6 border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button onClick={() => navigate('/candidate/profile')} className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 text-sm font-bold text-zinc-600 flex items-center justify-between group transition-all">
                Update Profile <ChevronRight size={16} className="text-zinc-300 group-hover:text-blue-600 transition-all" />
              </button>
              <button onClick={() => navigate('/candidate/manifesto')} className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 text-sm font-bold text-zinc-600 flex items-center justify-between group transition-all">
                Edit Manifesto <ChevronRight size={16} className="text-zinc-300 group-hover:text-blue-600 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity Table View */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-800">Recent Activity</h3>
            <FileText size={20} className="text-zinc-300" />
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-100">
                  <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Event</th>
                  <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Time</th>
                  <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {recentActivity.map((act, i) => (
                  <tr key={i} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${act.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-sm font-bold text-zinc-700">{act.event}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-zinc-500 font-mono">
                      {act.date}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${
                        act.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button 
            onClick={() => navigate('/candidate/status')}
            className="p-5 text-sm font-bold text-blue-600 hover:bg-zinc-50 transition-colors text-center border-t border-zinc-100"
          >
            View Full Application History
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Icon component for the quick link button
const ChevronRight = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default CandidateDashboard;