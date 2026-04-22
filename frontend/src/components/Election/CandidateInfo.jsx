import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  CheckCircle, ArrowLeft, DollarSign, User, 
  TriangleAlert, CircleCheckBig, ShieldAlert, 
  TrendingUp, FileText, ShieldIcon, Award, ChevronRight 
} from "lucide-react";
import img from '../../assets/election/image3.png'
import toast from "react-hot-toast";

const CandidateInfo = () => {
  const { electionId, candidateId } = useParams();
  const navigate = useNavigate();

  // Candidate Mock Data
  const candidate = {
    name: "Priya Sharma",
    party: "Democratic Alliance",
    age: 45,
    education: "MBA, IIM Ahmedabad",
    assets: "₹0.50 Cr",
    isWinner: true,
    assetBreakdown: {
      movable: "₹0.15 Cr",
      immovable: "₹0.33 Cr",
      other: "₹0.03 Cr",
    },
  };

  const [manifestoData, setManifestoData] = useState([
    {
      category: "Infrastructure",
      title: "Build 50km of new roads",
      description: "Construction of high-quality roads connecting rural areas",
      progress: 65,
      isVerifying: false,
      isVerified: false,
      txHash: ""
    },
    {
      category: "Healthcare",
      title: "Establish 10 community health centers",
      description: "Free healthcare facilities in underserved areas",
      progress: 40,
      isVerifying: false,
      isVerified: false,
      txHash: ""
    },
    {
      category: "Education",
      title: "Renovate 100 government schools",
      description: "Complete infrastructure upgrade with digital classrooms",
      progress: 80,
      isVerifying: false,
      isVerified: false,
      txHash: ""
    },
  ]);

  const [select, setSelect] = useState("Manifesto");
  const isClean = false;
  const [verifying, setVerifying] = useState(false);

  const handleVerify = (index) => {
    setManifestoData(prev =>
      prev.map((item, i) => i === index ? { ...item, isVerifying: true } : item)
    );
    setVerifying(true);

    setTimeout(() => {
      const fakeTxHash = "0x" + Math.random().toString(16).substring(2) + Date.now().toString(16);
      setManifestoData(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, isVerifying: false, isVerified: true, txHash: fakeTxHash } : item
        )
      );
      setVerifying(false);
      toast.success("Promise verified on Blockchain!");
    }, 3000);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-zinc-50/50">
      <div className="mx-auto max-w-6xl">
        
        {/* BLOCKCHAIN LOADER */}
        {verifying && (
          <div className="fixed inset-0 bg-zinc-900/90 backdrop-blur-md flex flex-col items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <h2 className="text-white text-xl font-black uppercase tracking-widest">Mining Block...</h2>
            <p className="text-blue-400 text-sm font-bold mt-2">Securing promise on the immutable ledger</p>
          </div>
        )}

        {/* NAVIGATION */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to List
        </button>

        {/* PROFILE HEADER CARD */}
        <div className="rounded-xl bg-white p-8 shadow-sm border border-zinc-300 flex flex-col md:flex-row gap-8 relative overflow-hidden mb-8">
          <Award size={140} className="absolute -right-10 -bottom-10 text-zinc-50 opacity-10 pointer-events-none" />

          <div className="h-32 w-32 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border-4 border-white shadow-md overflow-hidden">
            <img src={img} alt={candidate.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">{candidate.name}</h1>
                  {candidate.isWinner && (
                    <span className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-100">
                      <CheckCircle size={12} /> Incumbent
                    </span>
                  )}
                </div>
                <p className="mt-1 text-blue-600 text-sm font-black uppercase tracking-widest">{candidate.party}</p>
              </div>

              {/* NEW WIN HISTORY BUTTON */}
              <button
                onClick={() => navigate(`/elections/${electionId}/candidate/${candidateId}/history`)}
                className="group flex items-center gap-3 bg-zinc-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 cursor-pointer"
              >
                <Award size={16} className="text-blue-400 group-hover:text-white transition-colors" />
                View Win History & Audit
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoBox label="Age" value={`${candidate.age} Years`} />
              <InfoBox label="Education" value={candidate.education} />
              <InfoBox label="Total Assets" value={candidate.assets} />
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex p-2 bg-zinc-200/50 rounded-lg mb-8 max-w-md border-2 border-zinc-300">
          <button
            onClick={() => setSelect("Profile")}
            className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
              select === "Profile" ? "bg-white text-blue-600 shadow-sm scale-[1.02]" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <User size={16} /> Profile
          </button>
          <button
            onClick={() => setSelect("Manifesto")}
            className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
              select === "Manifesto" ? "bg-white text-blue-600 shadow-sm scale-[1.02]" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <FileText size={16} /> Manifesto
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="min-h-100">
          
          {select === "Profile" ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="rounded-xl bg-white p-8 border border-zinc-200 shadow-sm">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-zinc-900 uppercase tracking-tight">
                  <DollarSign size={20} className="text-emerald-600" /> Asset Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AssetBox label="Movable Assets" value={candidate.assetBreakdown.movable} />
                  <AssetBox label="Immovable Assets" value={candidate.assetBreakdown.immovable} />
                  <AssetBox label="Other Assets" value={candidate.assetBreakdown.other} />
                </div>
              </div>

              <div className="rounded-xl bg-white p-8 border border-zinc-200 shadow-sm">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-zinc-900 uppercase tracking-tight">
                  <ShieldAlert size={20} className="text-amber-500" /> Legal Records
                </h3>
                <div className={`rounded-3xl border-2 p-10 text-center ${isClean ? "border-emerald-100 bg-emerald-50/50" : "border-rose-100 bg-rose-50/50"}`}>
                  {isClean ? (
                    <>
                      <CircleCheckBig className="mx-auto h-12 w-12 text-emerald-600" />
                      <p className="mt-4 text-3xl font-black text-zinc-900">0</p>
                      <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest mt-1">Clean Record</p>
                    </>
                  ) : (
                    <>
                      <TriangleAlert className="mx-auto h-12 w-12 text-rose-600" />
                      <p className="mt-4 text-3xl font-black text-zinc-900">04</p>
                      <p className="text-sm font-bold text-rose-700 uppercase tracking-widest mt-1">Legal Concerns Found</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              {manifestoData.map((item, index) => (
                <div key={index} className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm group hover:border-blue-200 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                        <TrendingUp size={20} />
                      </div>
                      <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">{item.category}</h3>
                    </div>
                    <span className="text-lg font-black text-emerald-600 italic">{item.progress}%</span>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-bold text-zinc-800 text-lg mb-1">{item.title}</h4>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">{item.description}</p>
                    <div className="mt-6 h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>

                  {item.isVerified ? (
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                      <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-widest">
                        <CheckCircle size={14} /> Cryptographically Verified
                      </div>
                      <p className="mt-2 text-[10px] font-mono text-zinc-500 break-all bg-white/50 p-2 rounded-lg border border-emerald-100/50">
                        TX: {item.txHash}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleVerify(index)}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all cursor-pointer active:scale-95 shadow-lg shadow-zinc-200"
                    >
                      <ShieldIcon size={14} /> Verify on Blockchain
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-12">
          <button
            onClick={() => navigate(`/elections/${electionId}/candidate/${candidateId}/fund`)}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 py-6 text-white rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 cursor-pointer active:scale-95 group"
          >
            <DollarSign size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">Open Public Fund Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};

/* HELPER COMPONENTS */
const InfoBox = ({ label, value }) => (
  <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200 transition-colors hover:bg-blue-50/50">
    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-black text-zinc-900">{value}</p>
  </div>
);

const AssetBox = ({ label, value }) => (
  <div className="rounded-2xl border-2 border-zinc-200 p-5 bg-zinc-50/30">
    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="font-black text-xl text-zinc-900">{value}</p>
  </div>
);

export default CandidateInfo;