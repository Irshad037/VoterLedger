import React, { useState } from 'react';
import {
    MapPin, Search, Filter, Calendar, Clock, MapPinned,
    ChevronRight, AlertCircle, Sparkles, Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UseElection } from '../../hooks/election/UseElection';



const DiscoverElections = () => {
    const { allElections } = UseElection();
    const {
        data: elections = [],
        isLoading,
        isError,
    } = allElections;

    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const normalizedElections = elections.map((e) => {
        const polling = new Date(e.pollingDate);
        const today = new Date();

        const daysLeft = Math.max(
            Math.ceil((polling - today) / (1000 * 60 * 60 * 24)),
            0
        );

        return {
            _id: e._id,
            state: e.state,
            city: e.city,
            type: e.level,          // National | State | Local
            pollingDate: polling.toDateString(),
            constituencies: e.seats,
            daysLeft,
            status: e.status,
            pincode: e.pincode,
        };
    });

    const filteredData = normalizedElections.filter((e) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch = e.state.toLowerCase().includes(search) || e.city.toLowerCase().includes(search);
        const matchesType = selectedType === "all" || e.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-zinc-50/50 pb-20">
            {/* --- HERO HEADER --- */}
            <div className="bg-white border-b border-zinc-200 pt-16 pb-12 px-6">
                <div className="mx-auto max-w-7xl">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-4">
                        <Sparkles size={12} /> Live Election Tracker
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter">
                        Discover <span className="text-blue-600">Elections</span>
                    </h1>
                    <p className="mt-3 text-lg text-zinc-500 font-medium max-w-2xl leading-relaxed">
                        Explore democratic processes across India. Stay informed about candidates, manifestos, and polling schedules in your region.
                    </p>

                    {/* LOCATION DETECTOR BANNER */}
                    {/* <div className="mt-8 flex items-center justify-between p-1 bg-zinc-100 rounded-2xl max-w-xl border border-zinc-200">
                        <div className="flex items-center gap-3 px-4 py-2">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 border border-zinc-100">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Current Region</p>
                                <p className="text-sm font-bold text-zinc-900">Mumbai, Maharashtra</p>
                            </div>
                        </div>
                        <button className="hidden sm:block mr-2 px-4 py-2 bg-white text-zinc-600 text-xs font-bold rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all shadow-sm">
                            Change Location
                        </button>
                    </div> */}
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6">
                {/* --- SEARCH & FILTER TOOLBAR --- */}
                <div className="mt-10 flex flex-col lg:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by state, city, or constituency..."
                            className="w-full rounded-2xl bg-white border-2 border-zinc-100 py-4 pl-12 pr-4 text-sm font-bold text-zinc-700 shadow-sm focus:border-blue-600 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="flex bg-white p-1.5 rounded-2xl border-2 border-zinc-100 shadow-sm w-full lg:w-auto overflow-x-auto no-scrollbar">
                        {['all', 'National', 'State', 'Local'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedType === type
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "text-zinc-400 hover:text-zinc-600"
                                    }`}
                            >
                                {type === 'all' ? 'All Types' : type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- ELECTION CARDS GRID --- */}
                {filteredData.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredData.map((election) => (
                            <ElectionCard key={election._id} election={election} navigate={navigate} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-20 flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-zinc-200">
                        <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center text-zinc-300 mb-6">
                            <AlertCircle size={40} />
                        </div>
                        <h3 className="text-xl font-black text-zinc-900 uppercase">No Elections Found</h3>
                        <p className="text-zinc-400 font-medium mt-2">Try adjusting your filters or search keywords.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* --- REFINED SUB-COMPONENT: ELECTION CARD --- */

const ElectionCard = ({ election, navigate }) => {
    const isOngoing = election.status === 'Ongoing';
    const isUpcoming = election.status === 'Upcoming';
    const isEnded = election.status === 'Ended';

    return (
        <div className="group bg-white rounded-[2.5rem] border-2 border-zinc-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            {/* Status Ribbon */}
            <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest border-b border-l ${isOngoing ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                isEnded ? 'bg-zinc-100 text-zinc-500 border-zinc-200' :
                    'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                {election.status}
            </div>

            <div className="mb-8">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">{election.type} Election</p>
                <h3 className="text-2xl font-black text-zinc-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    {election.state}
                </h3>
                <p className="text-sm font-bold text-zinc-500 flex items-center gap-1.5 mt-1">
                    <Globe size={14} className="text-zinc-300" /> {election.city} Region
                </p>
            </div>

            <div className="space-y-4 mb-8">
                <DetailRow icon={<Calendar size={16} />} label="Polling Date" value={election.pollingDate} />
                <DetailRow icon={<MapPinned size={16} />} label="Constituencies" value={`${election.constituencies} Active`} />
            </div>

            {/* PROGRESS / COUNTDOWN BOX */}
            <div className={`p-4 rounded-2xl border flex items-center justify-center gap-3 transition-colors ${isOngoing ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                isEnded ? 'bg-zinc-50 border-zinc-100 text-zinc-500' :
                    'bg-blue-50 border-blue-100 text-blue-700'
                }`}>
                {isUpcoming && (
                    <>
                        <Clock size={18} className="animate-pulse" />
                        <span className="text-xl font-black tracking-tighter">{election.daysLeft}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Days Remaining</span>
                    </>
                )}
                {isOngoing && <p className="text-xs font-black uppercase tracking-[0.15em]">Polling is Live</p>}
                {isEnded && <p className="text-xs font-black uppercase tracking-[0.15em]">Official Results Declared</p>}
            </div>

            <button
                onClick={() => navigate(`/elections/${election._id}/candidate`)}
                className={`mt-6 w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] cursor-pointer flex items-center justify-center gap-2 transition-all ${isOngoing ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' :
                    isEnded ? 'bg-zinc-800 hover:bg-black shadow-zinc-200' :
                        'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                    } text-white shadow-lg active:scale-95`}
            >
                View Analytics <ChevronRight size={14} />
            </button>
        </div>
    );
};

const DetailRow = ({ icon, label, value }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-zinc-400">
            <div className="p-1.5 bg-zinc-50 rounded-lg">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
        </div>
        <span className="text-sm font-black text-zinc-800">{value}</span>
    </div>
);

export default DiscoverElections;