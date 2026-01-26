import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  ScrollText, 
  Send, 
  SearchCheck,
  Settings,
  LogOut,
  UserCircle
} from "lucide-react";

const CandidateSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  return (
    <aside className="flex flex-col h-screen w-72 bg-white border-r border-zinc-200">
      {/* SPACING TOP (Since Brand Section is removed) */}
      <div className="pt-8 px-6">
        <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mb-4 px-2">
          Candidate Panel
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1">
        <NavLink to="/candidate" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        
        <NavLink to="/candidate/profile" className={linkClass}>
          <User size={20} />
          Profile
        </NavLink>
        
        <NavLink to="/candidate/manifesto" className={linkClass}>
          <ScrollText size={20} />
          Manifesto
        </NavLink>

        <NavLink to="/candidate/apply" className={linkClass}>
          <Send size={20} />
          Apply
        </NavLink>

        <NavLink to="/candidate/status" className={linkClass}>
          <SearchCheck size={20} />
          Application Status
        </NavLink>
      </nav>

      {/* FOOTER SECTION */}
      <div className="p-4 border-t border-zinc-100 space-y-2">
        {/* <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl transition-all">
          <Settings size={20} />
          Settings
        </button> */}
        
        <div className="mt-4 p-3 bg-zinc-50 rounded-2xl flex items-center gap-3 border border-zinc-100">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <UserCircle size={24} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-zinc-900 truncate">Rajesh Kumar</p>
            <p className="text-xs text-zinc-500 truncate">Candidate Account</p>
          </div>
          <button title="Logout" className="text-zinc-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CandidateSidebar;