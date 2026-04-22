import React, { useState } from 'react';
import {
    Calendar, Clock, MapPinned,
    AlertCircle, Fingerprint,
    SendHorizontal,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ElectionApplyCard = ({ election }) => {
    const navigate = useNavigate()
    const isUpcoming = election.status === "Upcoming";
    const isOngoing = election.status === "Ongoing";

    return (
        <div className={`group bg-white rounded-4xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full ${isUpcoming ? 'border-zinc-300 hover:border-blue-600 shadow-sm hover:shadow-2xl hover:-translate-y-1' : 'border-zinc-300 opacity-80'
            }`}>

            {/* Top Indicator */}
            <div className={`h-2 w-full ${isUpcoming ? 'bg-blue-600' : isOngoing ? 'bg-emerald-500' : 'bg-zinc-400'
                }`} />

            <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">{election.type} Body</p>
                        <h3 className="text-2xl font-black text-zinc-900 group-hover:text-blue-600 transition-colors">
                            {election.state}
                        </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${isUpcoming ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            isOngoing ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                'bg-zinc-100 text-zinc-500 border-zinc-200'
                        }`}>
                        {election.status}
                    </span>
                </div>

                {/* Details Section */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2">
                            <MapPinned size={14} className="text-blue-600" /> Constituency
                        </span>
                        <span className="text-sm font-black text-zinc-800">{election.city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-2">
                            <Calendar size={14} className="text-blue-600" /> Polling Date
                        </span>
                        <span className="text-sm font-black text-zinc-800">{election.pollingDate}</span>
                    </div>
                </div>

                {/* Countdown / Status Box */}
                <div className="mt-auto">
                    <div className={`p-4 rounded-2xl flex items-center justify-center gap-3 ${isUpcoming ? 'bg-zinc-50 text-blue-600' : 'bg-zinc-50 text-zinc-400'
                        }`}>
                        {isUpcoming ? (
                            <>
                                <Clock size={18} className="animate-pulse" />
                                <span className="text-xl font-black tracking-tighter">{election.daysLeft}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Days to <br />Registry Close</span>
                            </>
                        ) : (
                            <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle size={14} /> Entry Closed
                            </span>
                        )}
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={() => navigate(`/admin/elections/${election._id}/applications`)}
                        className={`mt-6 w-full py-4 rounded-2xl cursor-pointer text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${isUpcoming
                                ? "bg-blue-600 hover:bg-blue-800 text-white shadow-xl shadow-blue-50"
                                : "bg-zinc-500 text-zinc-700 cursor-not-allowed"
                            } active:scale-95`}
                    >
                        See candiate
                    </button>
                </div>
            </div>

            {/* Background Icon Decoration */}
            <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                <Fingerprint size={120} />
            </div>
        </div>
    );
};

export default ElectionApplyCard