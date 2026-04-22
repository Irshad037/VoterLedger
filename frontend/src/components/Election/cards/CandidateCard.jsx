import { useNavigate } from "react-router-dom";
import {
  CircleCheckBig,
  TriangleAlert,
  Award,
  GraduationCap,
  Scale,
  Wallet,
  UserCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import React from 'react';

const CandidateCard = ({
  name, party, age, assets, cases, education, winner, img,
  candidateId, electionId, votePercent, showResult,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/elections/${electionId}/candidate/${candidateId}`)}
      className={`group relative bg-white rounded-[2.5rem] p-8 border-2 transition-all duration-500 cursor-pointer overflow-hidden ${winner
        ? "border-emerald-500 shadow-xl shadow-emerald-100"
        : "border-zinc-300 hover:border-blue-600 hover:shadow-2xl shadow-sm"
        }`}
    >
      {/* Status Ribbon */}
      <div className={`absolute top-0 right-0 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-3xl ${winner ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-500"
        }`}>
        {winner ? "Winner" : "Trailing"}
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-5 mb-8">
        <div className={`h-20 w-20 rounded-[1.5rem] overflow-hidden  border-4 ${winner ? 'border-emerald-50' : 'border-zinc-50'}`}>
          <img src={img} alt={name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div>
          <h3 className="font-black text-xl text-zinc-900 group-hover:text-blue-600 transition-colors leading-tight">{name}</h3>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">{party}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <MetricBox icon={<UserCircle size={14} />} label="Age" value={`${age}y`} bg="bg-zinc-100" />
        <MetricBox icon={<Wallet size={14} />} label="Assets" value={assets} bg="bg-emerald-100 text-emerald-700" />
        <div className="col-span-2">
          <div className={`flex items-center justify-center gap-6 p-3 rounded-2xl border border-zinc-100 
            ${cases === 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-50 text-rose-600"} `}
          >
            <span className="text-sm font-black uppercase tracking-tighter opacity-60 flex items-center gap-1">
              <Scale size={14} />Cases
            </span>
            <h1 className="text-sm font-black">{cases}</h1>
          </div>
        </div>
      </div>

      {/* Academic Background */}
      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100/50">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-2">
          <GraduationCap size={14} className="text-blue-500" /> Education
        </p>
        <p className="text-xs font-bold text-zinc-700 leading-relaxed truncate">{education}</p>
      </div>

      {/* WIN / LOSS PERCENTAGE VISUALIZATION */}
      {showResult && (
        <div className="mt-8 pt-6 border-t border-zinc-100">
          <div className="flex justify-between items-end mb-3">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                {winner ? "Victory Margin" : "Loss Deficit"}
              </span>
              <span className={`text-xs font-bold ${winner ? 'text-emerald-600' : 'text-rose-600'}`}>
                {winner ? `Win by` : `Lost by`}
              </span>
            </div>
            <span className={`text-xl font-black ${winner ? 'text-emerald-600' : 'text-zinc-900'}`}>
              {votePercent}%
            </span>
          </div>

          {/* Visual Bar showing vote share vs gap */}
          <div className="relative h-2.5 w-full rounded-full bg-zinc-100 overflow-hidden border border-zinc-200/50">
            {/* The Vote Share Bar */}
            <div
              className={`h-full transition-all duration-1000 ${winner ? "bg-emerald-500" : "bg-rose-500"}`}
              style={{ width: `${votePercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const MetricBox = ({ icon, label, value, bg }) => (
  <div className={`p-3 rounded-2xl border border-zinc-100 ${bg} flex flex-col`}>
    <span className="text-[9px] font-black uppercase tracking-tighter opacity-60 mb-1 flex items-center gap-1">
      {icon} {label}
    </span>
    <span className="text-sm font-black">{value}</span>
  </div>
);

export default CandidateCard;