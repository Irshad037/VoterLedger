import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CandidateCard from "./cards/CandidateCard";
import img1 from '../../assets/election/image1.png'
import img2 from '../../assets/election/image2.png'
import img3 from '../../assets/election/image3.png'
import { ArrowLeft, MapPin, Users, TrendingUp } from "lucide-react";

const ElectionCandidate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFDFE] pb-20">
            {/* STICKY HEADER */}
            <div className="bg-white border-b border-zinc-100 px-6 py-8 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="group mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Elections
                        </button>
                        <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">
                            Mumbai <span className="text-blue-600 italic">North</span>
                        </h1>
                        <p className="text-zinc-500 font-bold flex items-center gap-2 mt-1">
                           <MapPin size={14} className="text-zinc-300" /> Maharashtra • Parliamentary Constituency
                        </p>
                    </div>

                    {/* Stats Summary Bar */}
                    <div className="flex gap-4">
                        <QuickStat label="Voter Turnout" value="68.4%" icon={<TrendingUp size={16} />} color="text-blue-600" bg="bg-blue-50" />
                        <QuickStat label="Total Candidates" value="3" icon={<Users size={16} />} color="text-purple-600" bg="bg-purple-50" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">Candidate Performance</h2>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Verified Results</span>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <CandidateCard
                        name="Rajesh Kumar"
                        party="Democratic Alliance"
                        winner
                        age={45}
                        assets="₹0.5 Cr"
                        cases={0}
                        education="MBA, IIM Ahmedabad"
                        img={img1}
                        showResult={true}
                        votePercent={52}
                        electionId={id}
                        candidateId={2}
                    />
                    <CandidateCard
                        name="Amit Patel"
                        party="Progressive Party"
                        age={38}
                        assets="₹0.3 Cr"
                        cases={1}
                        education="MA Political Science"
                        img={img2}
                        showResult={true}
                        votePercent={28}
                        electionId={id}
                        candidateId={3}
                    />
                    <CandidateCard
                        name="Priya Sharma"
                        party="National Front"
                        age={52}
                        assets="₹0.8 Cr"
                        cases={2}
                        education="BTech IIT Delhi"
                        img={img3}
                        showResult={true}
                        votePercent={10}
                        electionId={id}
                        candidateId={4}
                    />
                </div>
            </div>
        </div>
    );
};

const QuickStat = ({ label, value, icon, color, bg }) => (
    <div className={`${bg} px-6 py-3 rounded-2xl border border-white shadow-sm`}>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            {icon} {label}
        </p>
        <p className={`text-xl font-black text-center ${color}`}>{value}</p>
    </div>
);

export default ElectionCandidate;