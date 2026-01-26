import React, { useState } from "react";
import {
    ChartNoAxesCombined, FileCheck, Search, Users, CheckCircle,
    ShieldCheck, Database, TrendingUp, FileText, ArrowRight,
    MapPin, AlertCircle, Award,
    DollarSign
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ConstituencyMap from "../Map/ConstituencyMap";
import { useAuth } from "../../hooks/auth/useAuth";

const Home = () => {
    const { user } = useAuth() 
    const navigate = useNavigate();
    const [pinCode, setPinCode] = useState("");

    return (
        <div className="min-h-screen bg-white">
            {/* --- HERO SECTION --- */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-24 overflow-hidden">
                {/* Decorative Background Blur */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full" />

                <div className="mx-auto max-w-7xl px-6 relative z-10">
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        <div>
                            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 rounded-full border border-blue-100">
                                Verified Governance Protocol
                            </span>
                            <h1 className="text-5xl font-black leading-[1.1] text-zinc-900 sm:text-7xl tracking-tighter">
                                Track Elections.<br />
                                <span className="text-blue-600 italic">Track Promises.</span><br />
                                Track Truth.
                            </h1>

                            <p className="mt-8 max-w-xl text-lg text-zinc-600 font-medium leading-relaxed">
                                A transparent, citizen-driven platform for election monitoring and
                                governance accountability. Verify candidate backgrounds and hold leaders to their word.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate('/elections')}
                                    className=" flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95">
                                    Explore Elections <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => navigate('/monitor')}
                                    className="flex items-center gap-2 cursor-pointer bg-white text-zinc-900 border-2 border-zinc-200 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all active:scale-95">
                                    Track Fund <TrendingUp size={18} className="text-emerald-500" />
                                </button>
                            </div>

                            {/* Live Platform Stats */}
                            <div className="mt-16 flex items-center gap-8 border-t border-zinc-100 pt-8">
                                <div>
                                    <p className="text-2xl font-black text-zinc-900">500+</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Verified Candidates</p>
                                </div>
                                <div className="h-10 w-[1px] bg-zinc-200" />
                                <div>
                                    <p className="text-2xl font-black text-zinc-900">12k+</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Promises Logged</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Component */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
                            <div className="relative rounded-[2.5rem] bg-white p-4 shadow-2xl border border-zinc-100">
                                <div className="h-[400px] rounded-[2rem] overflow-hidden bg-zinc-50">
                                    <ConstituencyMap />
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin size={14} className="text-blue-600" /> Interactive Constituency Map
                                    </p>
                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">LIVE UPDATES</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PIN CODE SEARCH --- */}
            <section className="py-20 bg-white relative z-20 -mt-10">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-zinc-900 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Search size={20} className="text-white" />
                                </div>
                                <h2 className="text-2xl font-black tracking-tight">Search Candidates by PIN Code</h2>
                            </div>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="Enter 6-digit PIN (e.g. 400001)"
                                    className="flex-1 rounded-2xl bg-zinc-800 border-2 border-zinc-700 px-6 py-4 text-white font-bold placeholder:text-zinc-500 focus:border-blue-500 outline-none transition-all"
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                                <button className="rounded-2xl bg-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* --- RECENTLY VERIFIED CANDIDATES --- */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">Recently Verified</h2>
                        <div className="h-1.5 w-20 bg-blue-600 mt-2 rounded-full" />
                    </div>
                    <Link to="/elections" className="text-sm font-black text-blue-600 hover:underline uppercase tracking-widest">
                        View All Candidates →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <VerifiedCard name="Rajesh Kumar" region="Mumbai North" party="Democratic Alliance" initial="RK" />
                    <VerifiedCard name="Sunita Deshmukh" region="Pune Central" party="Regional People's Party" initial="SD" />
                    <VerifiedCard name="Arjun Singh" region="Nagpur East" party="National Unity" initial="AS" />
                </div>
            </section>

            {/* --- HOW IT WORKS --- */}
            <section className="bg-zinc-50 py-24 border-y border-zinc-100">
                <div className="text-center mb-16 px-6">
                    <h2 className="text-4xl font-black text-zinc-900 tracking-tight">The Transparency Process</h2>
                    <p className="text-zinc-500 mt-3 font-medium">How we ensure every byte of data is immutable and truthful.</p>
                </div>

                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {workSteps.map((work, idx) => (
                            <div key={work.id} className="group bg-white rounded-[2rem] p-8 border border-zinc-200 hover:border-blue-500 transition-all duration-300">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                    {work.icon}
                                </div>
                                <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tighter mb-2">
                                    {idx + 1}. {work.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-500 font-medium">
                                    {work.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 text-center bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="inline-flex p-3 bg-blue-50 rounded-2xl text-blue-600 mb-8">
                        <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-5xl font-black text-zinc-900 tracking-tighter mb-8 leading-tight">
                        Ready to lead with truth? <br /> Or decide with facts?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup" className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                            {user?"Go to Dashboard":"Join as Candidate"}
                        </Link>
                        <Link to="/elections" className="px-12 py-5 bg-white text-zinc-900 border-2 border-zinc-200 font-black rounded-2xl uppercase tracking-widest hover:bg-zinc-50 transition-all">
                            Explore Elections
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

/* --- UI COMPONENTS --- */

const VerifiedCard = ({ name, region, party, initial }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
        <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center font-black text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {initial}
            </div>
            <div>
                <h4 className="font-black text-zinc-900 group-hover:text-blue-600 transition-colors">{name}</h4>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{region}</p>
            </div>
        </div>
        <div className="space-y-4 pt-6 border-t border-zinc-50">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-400">Status</span>
                <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={12} /> Verified
                </span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-400">Affiliation</span>
                <span className="text-zinc-900">{party}</span>
            </div>
        </div>
    </div>
);

const workSteps = [
    { id: "discover", icon: <Search size={24} />, title: "Discover", description: "Browse upcoming and ongoing elections in your specific region with verified data." },
    { id: "compare", icon: <Users size={24} />, title: "Compare", description: "Review candidate backgrounds, asset declarations, and official records side-by-side." },
    { id: "manifestos", icon: <FileText size={24} />, title: "Manifestos", description: "Explore digital manifestos with budget estimates and cryptographic locks." },
    { id: "track", icon: <TrendingUp size={24} />, title: "Track", description: "Monitor promise fulfillment and fund utilization after the election results." },
];

export default Home;