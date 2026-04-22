import React, { useState } from 'react';
import {
    CheckCircle2, Clock, AlertCircle, FileText,
    TrendingUp, Users, MapPin, Award,
    ExternalLink, Star, ArrowRightLeft, Calendar,
    ShieldCheck, BarChart3, Wallet, Landmark, Scale,
    ChevronRight, ArrowLeft
} from 'lucide-react';

const PerformanceReport = () => {
    // 1. STATE TO TRACK SELECTED ELECTION
    const [selectedElection, setSelectedElection] = useState(null);

    // Mock Data for Election Wins
    const electionWins = [
        { id: '2019-2024', title: "General Election 2019", region: "Mumbai North", term: "2019 — 2024", score: 78, status: "Term Completed" },
        { id: '2014-2019', title: "General Election 2014", region: "Mumbai North", term: "2014 — 2019", score: 85, status: "Term Completed" },
        { id: '2009-2014', title: "State Assembly 2009", region: "Borivali East", term: "2009 — 2014", score: 62, status: "Term Completed" },
    ];

    const performanceData = {
        '2019-2024': {
            score: 78,
            attendance: 92,
            questionsAsked: 145,
            assetGrowth: 15,
            promises: [
                { id: 1, year: 2020, title: "10 New Primary Schools", category: "Education", status: "Completed", progress: 100, outcome: "All 10 schools are operational with 5,000+ student capacity.", budget: "₹12Cr used" },
                { id: 2, year: 2021, title: "High-Speed Fiber Network", category: "Infrastructure", status: "Partial", progress: 65, outcome: "Fiber laid in 4/7 wards. Delayed due to procurement issues.", budget: "₹8Cr used" },
                { id: 3, year: 2023, title: "Zero Unemployment Scheme", category: "Economy", status: "Failed", progress: 15, outcome: "Budget redirected to emergency flood relief in 2022.", budget: "₹2Cr used" },
            ]
        }
        // Additional data for other terms would go here...
    };

    // --- VIEW 1: SELECTION GRID ---
    if (!selectedElection) {
        return (
            <div className="min-h-screen bg-[#FDFDFE] p-8 md:p-16">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12 text-center md:text-left">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">Performance Archive</span>
                        <h1 className="text-4xl font-black text-zinc-900 mt-4 tracking-tighter">Victory <span className="text-blue-600 italic">Timeline</span></h1>
                        <p className="text-zinc-500 font-medium mt-2">Select a specific term to view Rajesh Kumar's performance audit and promise tracking.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {electionWins.map((win) => (
                            <div 
                                key={win.id}
                                onClick={() => setSelectedElection(win.id)}
                                className="group bg-white rounded-[2.5rem] p-8 border-2 border-zinc-100 shadow-sm hover:shadow-xl hover:border-blue-600 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-zinc-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Award size={24} />
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase">{win.status}</span>
                                </div>
                                <h3 className="text-xl font-black text-zinc-900 leading-tight">{win.title}</h3>
                                <p className="text-sm font-bold text-zinc-400 mt-1 uppercase tracking-widest">{win.region}</p>
                                
                                <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-zinc-400 uppercase">Audit Score</p>
                                        <p className="text-2xl font-black text-zinc-900">{win.score}%</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW 2: DETAILED REPORT (Your Original Code with minor tweaks) ---
    const currentData = performanceData[selectedElection] || performanceData['2019-2024'];

    return (
        <div className="min-h-screen bg-[#FDFDFE] pb-20 font-sans">
            <header className="bg-white border-b border-zinc-100 pt-10 pb-10 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* BACK BUTTON */}
                    <button 
                        onClick={() => setSelectedElection(null)}
                        className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Victory Timeline
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-zinc-50 shadow-xl">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" alt="Candidate" className="object-cover w-full h-full" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                <ShieldCheck size={20} />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Rajesh Kumar</h1>
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg border border-blue-100">Incumbent</span>
                            </div>
                            <p className="text-zinc-500 font-bold flex items-center justify-center md:justify-start gap-2">
                                <Users size={16} className="text-zinc-300" /> Democratic Alliance • Mumbai North
                            </p>
                            <p className="text-zinc-400 text-sm font-medium mt-1 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                                <Calendar size={14} /> Selected Term: {selectedElection}
                            </p>
                        </div>

                        <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 flex flex-col items-center min-w-[200px]">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Term Audit Score</span>
                            <p className="text-5xl font-black italic text-blue-400">{currentData.score}%</p>
                            <div className="mt-3 flex items-center gap-1.5 text-emerald-400 font-black text-[10px] uppercase">
                                <TrendingUp size={12} /> High Trust Indicator
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 mt-12 space-y-12">
                {/* TRUST METRIC CARDS */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TrustMetricCard title="Wealth Growth" value={`+${currentData.assetGrowth}%`} desc="Personal assets change during this specific term." icon={<Wallet size={20} className="text-blue-600" />} status="Safe" />
                    <TrustMetricCard title="Attendance" value={`${currentData.attendance}%`} desc="Sessions attended during this legislative term." icon={<Landmark size={20} className="text-emerald-600" />} status="Active" />
                    <TrustMetricCard title="Policy Consistency" value="84%" desc="Alignment with original manifesto promises." icon={<Scale size={20} className="text-purple-600" />} status="Reliable" />
                </section>

                {/* PROMISES TIMELINE */}
                <section>
                    <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                        <BarChart3 className="text-blue-600" /> Manifesto Audit Trail
                    </h2>

                    <div className="space-y-8 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-0.5 before:bg-zinc-100">
                        {currentData.promises.map((item) => (
                            <div key={item.id} className="relative pl-16 group">
                                <div className={`absolute left-[29px] top-8 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${item.status === 'Completed' ? 'bg-emerald-500' : item.status === 'Partial' ? 'bg-blue-500' : 'bg-rose-500'
                                    }`} />
                                <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{item.category} • {item.year}</span>
                                            <h3 className="text-xl font-black text-zinc-900 mt-1">{item.title}</h3>
                                        </div>
                                        <StatusBadge status={item.status} />
                                    </div>
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6">{item.outcome}</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                                            <span className="text-zinc-400">Execution Progress</span>
                                            <span className="text-zinc-900">{item.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
                                            <div className={`h-full transition-all duration-1000 ${item.status === 'Completed' ? 'bg-emerald-500' : item.status === 'Partial' ? 'bg-blue-500' : 'bg-rose-500'
                                                }`} style={{ width: `${item.progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

/* --- SHARED SUB-COMPONENTS --- */

const TrustMetricCard = ({ title, value, desc, icon, status }) => (
    <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-zinc-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                {icon}
            </div>
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${status === 'Safe' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                {status}
            </span>
        </div>
        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{title}</p>
        <p className="text-3xl font-black text-zinc-900 mt-1 mb-2 tracking-tighter">{value}</p>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
        Partial: "bg-blue-50 text-blue-700 border-blue-100",
        Failed: "bg-rose-50 text-rose-700 border-rose-100"
    };
    return (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
            {status}
        </span>
    );
};

export default PerformanceReport;