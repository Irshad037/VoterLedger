import React from "react";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Edit2, 
  Lock 
} from "lucide-react";

const PromiseCard = ({ promise, onEdit }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved": 
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Submitted": 
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Draft": 
        return "bg-amber-50 text-amber-700 border-amber-100";
      default: 
        return "bg-zinc-50 text-zinc-600 border-zinc-200";
    }
  };

  // Logic: Lock the card if it has been Approved
  const isLocked = promise.status === "Approved";

  return (
    <div className={`bg-white rounded-[2rem] border border-zinc-200 p-7 shadow-sm transition-all duration-300 relative flex flex-col h-full group ${
      !isLocked ? "hover:shadow-xl hover:-translate-y-1" : "opacity-95 shadow-none"
    }`}>
      
      {/* Top Row: Category and Action */}
      <div className="flex justify-between items-start mb-5">
        <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-full border border-blue-100 uppercase tracking-wider">
          {promise.category}
        </span>
        
        <button 
          disabled={isLocked}
          className={`p-2.5 rounded-xl transition-all ${
            isLocked 
            ? "text-zinc-400 bg-zinc-100 cursor-not-allowed" 
            : "text-zinc-400 bg-zinc-50 hover:bg-blue-600 hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200"
          }`}
          onClick={() => !isLocked && onEdit(promise)}
          title={isLocked ? "Approved promises cannot be edited" : "Edit Promise"}
        >
          {isLocked ? <Lock size={16} /> : <Edit2 size={16} />}
        </button>
      </div>

      <p className="text-zinc-900 text-lg font-bold leading-tight mb-8 flex-grow">
        {promise.text}
      </p>

      {/* Metadata Section */}
      <div className="space-y-4 pt-6 border-t border-zinc-50">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400">
              <DollarSign size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Budget</span>
              <span className="text-sm font-bold text-zinc-700">${promise.budget}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-50 rounded-lg text-zinc-400">
              <Calendar size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Timeline</span>
              <span className="text-sm font-bold text-zinc-700">{promise.timeline}</span>
            </div>
          </div>
        </div>
        
        {/* Status Section */}
        <div className="pt-2 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${getStatusStyles(promise.status)}`}>
             {promise.status === "Approved" && <CheckCircle2 size={14} />}
             {promise.status === "Submitted" && <Clock size={14} />}
             {promise.status}
          </span>
          
          {isLocked && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase italic">
              <Lock size={10} /> Verified Record
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromiseCard;