import React, { useState } from 'react';
import {
    ShieldCheck,
    DollarSign,
    TrendingUp,
    Search,
    Filter,
    Link as LinkIcon,
    ExternalLink,
    ArrowLeft,
    FileText,
    MapPin,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Monitoring = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState("All States");

    const projects = [
        { id: 1, name: "Road Development Project", representative: "Rajesh Kumar", location: "Mumbai North, Maharashtra", budget: "₹5.00Cr", tx: "0xcand-1-1..." },
        { id: 2, name: "Healthcare Infrastructure", representative: "Rajesh Kumar", location: "Mumbai North, Maharashtra", budget: "₹3.00Cr", tx: "0xcand-1-2..." },
        { id: 3, name: "School Renovation Program", representative: "Rajesh Kumar", location: "Mumbai North, Maharashtra", budget: "₹2.00Cr", tx: "0xcand-1-3..." },
        { id: 4, name: "Skill Development Centers", representative: "Sunita Verma", location: "Delhi Central, Delhi", budget: "₹1.50Cr", tx: "0xcand-4-4..." },
        { id: 5, name: "Road Development Project", representative: "Lakshmi Nair", location: "Bangalore South, Karnataka", budget: "₹5.00Cr", tx: "0xcand-6-1..." },
    ];

    const filteredData = projects.filter((proj) => {
        const search = searchTerm.toLowerCase();

        // Search by name, representative, or location
        const matchesSearch =
            proj.name.toLowerCase().includes(search) ||
            proj.representative.toLowerCase().includes(search) ||
            proj.location.toLowerCase().includes(search);

        // Extract state from location (after comma)
        const state = proj.location.split(", ").pop();

        const matchesState =
            selectedState === "All States" || state === selectedState;

        return matchesSearch && matchesState;
    });


    return (
        <div className="min-h-screen bg-zinc-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Navigation & Header */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors cursor-pointer" >
                        <ArrowLeft size={16} /> Back to Home
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                            <ShieldCheck className="text-white" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Public Fund Monitoring</h1>
                            <p className="text-zinc-500 font-medium mt-1">Blockchain-verified transparent fund tracking across all constituencies</p>
                        </div>
                    </div>
                </div>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Total Budget Allocated"
                        value="₹34.50Cr"
                        icon={<DollarSign size={24} />}
                        color="bg-blue-50 text-blue-600"
                        iconBg="bg-blue-600 text-white"
                        bg="bg-gradient-to-br from-white  to-blue-100"
                    />
                    <StatCard
                        label="Active Projects"
                        value="12"
                        icon={<TrendingUp size={24} />}
                        color="bg-emerald-50 text-emerald-600"
                        iconBg="bg-emerald-600 text-white"
                        bg="bg-gradient-to-br from-white  to-green-100"
                    />
                    <StatCard
                        label="Blockchain Verified"
                        value="100%"
                        icon={<CheckCircle2 size={30} />}
                        color="bg-purple-50 text-purple-600"
                        iconBg="bg-purple-600 text-white"
                        bg="bg-gradient-to-br from-white  to-purple-100"
                    />
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-6 rounded-xl  border border-zinc-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest ml-1">Search Projects</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by project, candidate, or constituency..."
                                className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:bg-white focus:border-blue-600 outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest ml-1">Filter by State</label>
                        <select
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 outline-none focus:border-blue-600 cursor-pointer appearance-none"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                        >
                            <option>All States</option>
                            <option>Maharashtra</option>
                            <option>Delhi</option>
                            <option>Karnataka</option>
                        </select>
                    </div>
                </div>

                {/* Blockchain Table */}
                <div className="bg-white rounded-xl border border-zinc-200 shadow-md overflow-hidden">
                    <div className="bg-blue-600 p-7 flex items-center gap-3 text-white">
                        <LinkIcon size={20} />
                        <span className="text-sm font-black uppercase tracking-widest">Blockchain-Verified Fund Allocations</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50/50 border-b border-zinc-200">
                                    <th className="px-8 py-3 text-sm font-black text-zinc-500  tracking-[0.15em]">Project Name</th>
                                    <th className="px-8 py-3 text-sm font-black text-zinc-500  tracking-[0.15em]">Representative</th>
                                    <th className="px-8 py-3 text-sm font-black text-zinc-500  tracking-[0.15em]">Location</th>
                                    <th className="px-8 py-3 text-sm font-black text-zinc-500  tracking-[0.15em]">Budget</th>
                                    <th className="px-8 py-3 text-sm font-black text-zinc-500  tracking-[0.15em] text-right">Blockchain Proof</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {filteredData.map((proj) => (
                                    <tr key={proj.id} className="group hover:bg-blue-50/30 transition-all duration-200  border-b border-zinc-200">
                                        <td className="px-8 py-3">
                                            <div className="flex items-center gap-3">
                                                <FileText size={18} className="text-blue-500" />
                                                <span className="text-sm font-semibold ">{proj.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-3 text-sm font-bold text-zinc-700">{proj.representative}</td>
                                        <td className="px-8 py-3">
                                            <div className="flex items-center gap-1.5 text-zinc-500 font-medium text-sm">
                                                <MapPin size={12} className="" /> {proj.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-3">
                                            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-sm font-black italic shadow-sm">
                                                {proj.budget}
                                            </span>
                                        </td>
                                        <td className="px-8 py-3 text-right">
                                            <button className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-xl text-[11px] font-black text-blue-600 uppercase tracking-widest shadow-sm hover:border-blue-600 transition-all active:scale-95">
                                                View on Chain <ExternalLink size={12} />
                                            </button>
                                            <p className="mt-1 text-[9px] font-mono text-zinc-400">{proj.tx}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Cards Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <InfoCard
                        icon={<LinkIcon className="text-white" />}
                        bg="bg-blue-50"
                        iconBg="bg-blue-600"
                        title="Blockchain Technology"
                        desc="All fund allocations are recorded on an immutable blockchain ledger, ensuring complete transparency and preventing tampering. Every transaction is publicly verifiable."
                    />
                    <InfoCard
                        icon={<ShieldCheck size={30} className="text-white" />}
                        bg="bg-green-50"
                        iconBg="bg-green-600"
                        title="Public Accountability"
                        desc="Citizens can track how their elected representatives allocate and spend public funds in real-time. No hidden transactions, complete accountability."
                    />
                </div>
            </div>
        </div>
    );
};

/* --- Sub-Components --- */

const StatCard = ({ label, value, icon, color, iconBg, bg }) => (
    <div className={`p-8 rounded-xl border border-zinc-200 ${bg} shadow-sm flex items-center justify-between relative overflow-hidden group`}>
        <div>
            <p className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em] mb-2">{label}</p>
            <p className={`text-4xl font-black ${color.split(' ')[1]} tracking-tighter`}>{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
            {icon}
        </div>
    </div>
);

const InfoCard = ({ icon, title, desc, bg, iconBg }) => (
    <div className={`p-8  ${bg}  border border-zinc-200 rounded-xl flex gap-6 shadow-sm hover:shadow-md transition-shadow`}>
        <div className={`w-14 h-14 rounded-xl ${iconBg}  shrink-0 flex items-center justify-center border border-zinc-100`}>
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-black text-zinc-900 mb-2 uppercase tracking-tighter">{title}</h4>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default Monitoring;