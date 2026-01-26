import React from "react";
import SummaryCard from "../adminComponets/SummaryCard";
import { TrendingUp, Users, ClipboardCheck, Activity, ArrowUpRight, Plus } from "lucide-react";
import ApplicationTable from "../AdminComponets/ApplicationTable"; // Assuming it's in the same folder
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 p-6 bg-zinc-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Welcome back! Here is what's happening with your elections today.
          </p>
        </div>
        <button
          onClick={() => { navigate('/admin/elections') }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-blue-200">
          <Plus size={18} />
          Launch New Election
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Elections"
          value="12"
          icon={<Activity className="text-blue-600" />}
          trend="+2 this month"
        />
        <SummaryCard
          title="Pending Apps"
          value="08"
          icon={<ClipboardCheck className="text-amber-600" />}
          trend="High priority"
        />
        <SummaryCard
          title="Verified Candidates"
          value="34"
          icon={<Users className="text-emerald-600" />}
          trend="+12% vs last year"
        />
        <SummaryCard
          title="Active Elections"
          value="03"
          icon={<TrendingUp className="text-purple-600" />}
          trend="Live now"
        />
      </div>
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-bold text-zinc-800">Recent Applications</h2>
        <button className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
          View all <ArrowUpRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* We reuse your ApplicationTable but perhaps pass a 'limit' prop if you set one up */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 col-span-2">
          <ApplicationTable />
        </div>

        {/* Sidebar: Analytics & Activity */}
        <div className="space-y-8">
          {/* Quick Analytics Card */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              Verification Rate
            </h3>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-bold text-zinc-900">84%</span>
              <span className="text-emerald-600 text-sm font-bold mb-1 flex items-center">
                <ArrowUpRight size={14} className="mr-0.5" /> +4.2%
              </span>
            </div>

            {/* Matching Progress Bar */}
            <div className="mt-6 h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: "84%" }}
              ></div>
            </div>

            <p className="mt-4 text-xs text-zinc-500 leading-relaxed font-medium">
              Candidate verification is moving <span className="text-blue-600">faster</span> than the previous cycle. Keep it up!
            </p>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-800 mb-6">System Activity</h3>
            <div className="space-y-6">
              {[
                { user: "Admin", action: "Approved Rajesh Kumar", time: "2 mins ago", color: "bg-emerald-500" },
                { user: "System", action: "New application: Arjun Singh", time: "45 mins ago", color: "bg-blue-500" },
                { user: "Admin", action: "Created Mumbai North Election", time: "2 hours ago", color: "bg-purple-500" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 2 && <div className="absolute left-[11px] top-7 w-[2px] h-10 bg-zinc-100"></div>}
                  <div className={`w-[24px] h-[24px] rounded-full ${item.color} flex-shrink-0 ring-4 ring-white z-10`} />
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">{item.action}</p>
                    <p className="text-xs text-zinc-500">{item.time} • by {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;