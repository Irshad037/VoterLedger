import React, { useState } from 'react';
import { 
  MapPin, Search, Filter, Calendar, Clock, MapPinned, 
  ChevronRight, AlertCircle, Sparkles, Fingerprint, 
  SendHorizontal, BadgeCheck 
} from "lucide-react";
import ElectionApplyCard from '../CandidateComponents/ElectionApplyCard';

const elections = [
    { id: 1, state: "Maharashtra", city: "Mumbai", type: "State", pollingDate: "March 10, 2026", constituencies: 288, daysLeft: 45, status: "Upcoming" },
    { id: 2, state: "Maharashtra", city: "Navi Mumbai", type: "Local", pollingDate: "March 10, 2026", constituencies: 120, daysLeft: 45, status: "Ongoing" },
    { id: 3, state: "Karnataka", city: "Bangalore", type: "Local", pollingDate: "February 5, 2026", constituencies: 224, daysLeft: 5, status: "Ongoing" },
    { id: 4, state: "Uttar Pradesh", city: "Lucknow", type: "State", pollingDate: "May 20, 2026", constituencies: 403, daysLeft: 120, status: "Upcoming" },
    { id: 5, state: "Tamil Nadu", city: "Chennai", type: "State", pollingDate: "January 15, 2025", constituencies: 234, daysLeft: 0, status: "Ended" },
];

const AllApplication = () => {
    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = elections.filter((e) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = e.state.toLowerCase().includes(search) || e.city.toLowerCase().includes(search);
        const matchesType = selectedType === "all" || e.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#FDFDFE] pb-20">
            {/* --- HERO HEADER --- */}
            <div className="bg-white border-b-2 border-zinc-100 pt-16 pb-12 px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-4">
                                <BadgeCheck size={12} /> Registry Open for 2026
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter">
                                Available <span className="text-blue-600 italic">Elections</span>
                            </h1>
                            <p className="mt-3 text-lg text-zinc-500 font-medium max-w-xl leading-relaxed">
                                Select an active election cycle to submit your candidacy. Applications require verified digital affidavits.
                            </p>
                        </div>
                        
                        {/* Status Summary */}
                        <div className="flex gap-4">
                            <div className="bg-zinc-50 p-4 rounded-3xl border border-zinc-100">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Cycles</p>
                                <p className="text-2xl font-black text-zinc-900">04</p>
                            </div>
                            <div className="bg-blue-600 p-4 rounded-3xl text-white shadow-lg shadow-blue-200">
                                <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">Deadline</p>
                                <p className="text-2xl font-black italic">14 Mar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6">
                {/* --- TOOLBAR --- */}
                <div className="mt-10 flex flex-col lg:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by state, city, or constituency..."
                            className="w-full rounded-2xl bg-white border-2 border-zinc-100 py-4 pl-12 pr-4 text-sm font-bold text-zinc-700 shadow-sm focus:border-blue-600 outline-none transition-all"
                        />
                    </div>

                    <div className="flex bg-white p-1.5 rounded-2xl border-2 border-zinc-100 shadow-sm w-full lg:w-auto">
                        {['all', 'National', 'State', 'Local'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    selectedType === type 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                                    : "text-zinc-400 hover:text-zinc-600"
                                }`}
                            >
                                {type === 'all' ? 'All' : type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- ELECTION CARDS --- */}
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredData.map((election) => (
                        <ElectionApplyCard key={election.id} election={election} />
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="mt-20 flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-zinc-200">
                        <AlertCircle className="text-zinc-200 mb-4" size={48} />
                        <p className="text-zinc-400 font-black uppercase tracking-widest">No matching cycles found</p>
                    </div>
                )}
            </div>
        </div>
    );
}



export default AllApplication;