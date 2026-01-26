import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  GanttChartSquare, 
  FileText, 
  Settings, 
  LogOut,
  UserCircle,
  ShieldCheck
} from "lucide-react";
import { GoLaw } from "react-icons/go";

const AdminSidebar = () => {
  // Enhanced link styling with better padding and transitions
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  return (
    <aside className="flex flex-col h-screen w-72 bg-white border-r border-zinc-200">
      {/* BRAND SECTION */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GoLaw className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Voter<span className="text-blue-600">Ledger</span>
          </h2>
        </div>
        <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mt-8 mb-4 px-2">
          Admin Panel
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1">
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        
        <NavLink to="/admin/elections" className={linkClass}>
          <GanttChartSquare size={20} />
          Elections
        </NavLink>
        
        <NavLink to="/admin/reports" className={linkClass}>
          <FileText size={20} />
          Reports & Logs
        </NavLink>
      </nav>

      {/* FOOTER SECTION */}
      <div className="p-4 border-t border-zinc-100 space-y-2">
        {/* <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl transition-all">
          <Settings size={20} />
          Settings
        </button> */}
        
        <div className="mt-4 p-3 bg-zinc-50 rounded-2xl flex items-center gap-3 border border-zinc-100">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            <UserCircle size={24} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-zinc-900 truncate">Admin User</p>
            <p className="text-xs text-zinc-500 truncate">admin@voterledger.com</p>
          </div>
          <button title="Logout" className="text-zinc-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;