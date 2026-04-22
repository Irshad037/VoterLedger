import React, { useState, useEffect } from "react";
import {
    Cpu, Lock, ShieldAlert, ShieldCheck, CheckCircle2, XCircle,
    AlertTriangle, FileText, ExternalLink, User, Database,
    Fingerprint, Clock, ArrowRight, Activity, Landmark,
    History, Info, ChevronRight, Scale
} from "lucide-react";


const candidateProfile = {
    identity: {
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        dob: "1984-08-12",
        party: "National Civic Party",
    },
    education: [
        {
            degree: "Master of Public Administration",
            institute: "National University of Public Affairs",
            duration: "2010 – 2012",
            status: "Verified",
            confidence: 96,
        },
    ],
    experience: [
        {
            role: "Senior Policy Analyst",
            organization: "Civic Advocacy Foundation",
            duration: "2012 – Present",
        },
    ],
    assets: {
        movable: "₹1.8 Cr",
        immovable: "₹3.7 Cr",
        other: "₹0.5 Cr",
        total: "₹6.0 Cr",
        status: "Partially Verified",
    },
    criminal: {
        hasCase: false,
        status: "Verified",
        source: "National Judicial Data Grid",
    },
};


const VerificationTerminal = () => {
    const [adminDecision, setAdminDecision] = useState(null);
    const [rejectReasons, setRejectReasons] = useState([]);
    const [extraReason, setExtraReason] = useState("");
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

    const candidate = {
        name: "Priya Sharma",
        id: "CAN-2026-089",
        constituency: "Mumbai North",
        term: "2019–2024",
        version: "v2.4",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    };

    const systemAudit = {
        status: "Partially Verified",
        confidence: 72,
        issues: [
            "Asset mismatch with 2021 affidavit",
            "Missing municipal land registry entry",
        ],
        hash: "0x7e8b2fa...91c01",
    };

    const escalation = adminDecision === "Approve" && systemAudit.status !== "Verified";

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, []);

    const canSubmit = adminDecision && !escalation && (adminDecision === "Approve" || (rejectReasons.length > 0 && extraReason.length > 10));

    return (
        <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans">
            {/* 1. COMPLIANCE HEADER */}
            <header className="bg-white rounded-xl p-8 border-b-4 border-blue-600 shadow-sm flex flex-col md:flex-row justify-between items-center mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Landmark size={120} />
                </div>

                <div className="flex gap-6 items-center">
                    <div className="relative">
                        <img src={candidate.photo} className="w-20 h-20 rounded-3xl object-cover border-4 border-zinc-50 shadow-md" />
                        <div className="absolute -bottom-2 -right-2 p-1.5 bg-blue-600 text-white rounded-lg shadow-lg border-2 border-white">
                            <ShieldCheck size={16} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">{candidate.name}</h1>
                            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[9px] font-black uppercase rounded border border-zinc-200">{candidate.id}</span>
                        </div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            {candidate.constituency} • Official Submission Profile
                        </p>
                    </div>
                </div>

                <div className="text-right flex items-center gap-8">
                    <div className="hidden lg:block">
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-tighter mb-1">Blockchain Hash</p>
                        <p className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{systemAudit.hash}</p>
                    </div>
                    <div className="h-12 w-[1px] bg-zinc-100 mx-2" />
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-tighter mb-1">SLA Deadline</p>
                        <span className={`text-sm font-black italic flex items-center gap-2 ${timeLeft < 3600 ? "text-rose-600" : "text-amber-600"}`}>
                            <Clock size={16} /> {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* LEFT COLUMN: SYSTEM INTELLIGENCE */}
                <div className="col-span-8 space-y-8">

                    {/* SYSTEM VERIFICATION LOGIC */}
                    <section className="bg-zinc-900 rounded-xl p-10 text-white relative shadow-2xl overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-10">
                            <Cpu size={240} />
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl"><Cpu size={20} /></div>
                                <h2 className="text-lg font-black uppercase tracking-widest">Audit Intelligence Engine</h2>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-lg border border-zinc-700">
                                <Lock size={12} className="text-zinc-500" />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Input Locked</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Automated Classification</p>
                                    <StatusBadge status={systemAudit.status} />
                                </div>
                                <Progress confidence={systemAudit.confidence} />
                            </div>

                            <div className="bg-zinc-800/50 p-6 rounded-3xl border border-zinc-700/50">
                                <p className="text-[10px] font-black text-zinc-500 uppercase mb-4 flex items-center gap-2">
                                    <AlertTriangle size={14} className="text-amber-500" /> Identified Discrepancies
                                </p>
                                <ul className="text-xs text-zinc-200 space-y-3">
                                    {systemAudit.issues.map((i, idx) => (
                                        <li key={idx} className="flex gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-700/30 font-medium">
                                            <span className="text-blue-500 font-bold">{idx + 1}.</span> {i}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* EVIDENCE AUDIT VIEWER */}
                    <section className="bg-white rounded-xl p-10 border-2 border-zinc-300 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 flex items-center gap-3">
                                <Database size={20} className="text-zinc-300" /> Evidence Audit Trail
                            </h3>
                            <span className="text-[10px] font-black text-zinc-400 uppercase">3 Documents Attached</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <EvidenceCard name="Asset_Affidavit_2026.pdf" type="Financial" used={true} />
                            <EvidenceCard name="Income_Tax_Returns.pdf" type="Taxation" used={true} />
                            <EvidenceCard name="Degree_Certificate.pdf" type="Educational" used={false} />
                        </div>
                    </section>
                    {/* CANDIDATE PROFILE SNAPSHOT */}
                    <section className="bg-white rounded-xl p-10 border border-zinc-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 flex items-center gap-3">
                                <User size={20} className="text-blue-600" />
                                Candidate Profile (Read-Only)
                            </h3>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded border border-emerald-100">
                                System Parsed
                            </span>
                        </div>

                        {/* IDENTITY */}
                        <div className="space-y-6 mb-10">
                            <SectionTitle icon={<Fingerprint size={14} />} title="Identity Details" />
                            <div className="grid grid-cols-2 gap-6">
                                <DataItem label="Email" value={candidateProfile.identity.email} />
                                <DataItem label="Phone" value={candidateProfile.identity.phone} />
                                <DataItem label="Date of Birth" value={candidateProfile.identity.dob} />
                                <DataItem label="Party Affiliation" value={candidateProfile.identity.party} />
                            </div>
                        </div>

                        {/* EDUCATION */}
                        <div className="space-y-6 mb-10">
                            <SectionTitle icon={<Landmark size={14} />} title="Education Verification" />
                            {candidateProfile.education.map((edu, i) => (
                                <div key={i} className="p-5 rounded-2xl border-2 border-zinc-300 bg-zinc-50">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-black text-zinc-900">{edu.degree}</p>
                                            <p className="text-xs text-zinc-500">{edu.institute}</p>
                                            <p className="text-xs text-zinc-400">{edu.duration}</p>
                                        </div>
                                        <StatusBadge status={edu.status} />
                                    </div>
                                    <div className="mt-3">
                                        <Progress confidence={edu.confidence} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* EXPERIENCE */}
                        <div className="space-y-6 mb-10">
                            <SectionTitle icon={<History size={14} />} title="Professional Experience (Informational)" />
                            {candidateProfile.experience.map((exp, i) => (
                                <div key={i} className="p-4 border-2 border-zinc-300 rounded-xl text-sm font-bold text-zinc-700">
                                    {exp.role} — {exp.organization}
                                    <div className="text-xs text-zinc-400">{exp.duration}</div>
                                </div>
                            ))}
                        </div>

                        {/* ASSETS */}
                        <div className="space-y-6 mb-10">
                            <SectionTitle icon={<Scale size={14} />} title="Assets Declaration" />
                            <div className="grid grid-cols-2 gap-6">
                                <DataItem label="Movable Assets" value={candidateProfile.assets.movable} />
                                <DataItem label="Immovable Assets" value={candidateProfile.assets.immovable} />
                                <DataItem label="Other Assets" value={candidateProfile.assets.other} />
                                <DataItem label="Total Assets" value={candidateProfile.assets.total} />
                            </div>
                            <div className="mt-4">
                                <StatusBadge status={candidateProfile.assets.status} />
                            </div>
                        </div>

                        {/* CRIMINAL RECORD */}
                        <div className="space-y-6">
                            <SectionTitle icon={<ShieldCheck size={14} />} title="Criminal Record Check" />
                            <div className={`p-5 rounded-2xl border ${candidateProfile.criminal.hasCase
                                ? "border-rose-200 bg-rose-50"
                                : "border-emerald-200 bg-emerald-50"
                                }`}>
                                <p className="font-black text-sm">
                                    {candidateProfile.criminal.hasCase
                                        ? "Criminal Case Declared"
                                        : "No Criminal Cases Found"}
                                </p>
                                <p className="text-xs text-zinc-500 mt-1">
                                    Source: {candidateProfile.criminal.source}
                                </p>
                                <StatusBadge status={candidateProfile.criminal.status} />
                            </div>
                        </div>
                    </section>

                </div>

                {/* RIGHT COLUMN: ACTION PANEL */}
                <div className="col-span-4">
                    <div className="bg-white rounded-xl p-8 border-2 border-zinc-300 shadow-xl sticky top-8 space-y-8">

                        <div>
                            <h3 className="text-xl font-black flex items-center gap-3 text-zinc-900">
                                <User size={20} className="text-blue-600" /> Admin Decision
                            </h3>
                            <p className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-wider">Final Authority Review Layer</p>
                        </div>

                        <div className="space-y-4">
                            <DecisionButton
                                active={adminDecision === "Approve"}
                                onClick={() => setAdminDecision("Approve")}
                                icon={<CheckCircle2 size={18} />}
                                label="Confirm Verification"
                                color="emerald"
                                disabled={systemAudit.status === "Failed"}
                            />

                            <DecisionButton
                                active={adminDecision === "Reject"}
                                onClick={() => setAdminDecision("Reject")}
                                icon={<XCircle size={18} />}
                                label="Reject Submission"
                                color="rose"
                            />
                        </div>

                        {/* REJECTION DETAIL WORKFLOW */}
                        {adminDecision === "Reject" && (
                            <div className="space-y-4 pt-4 border-t border-zinc-100 animate-in slide-in-from-top-4 duration-300">
                                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-2">
                                    <Scale size={14} /> Map to System Issue
                                </p>
                                <div className="space-y-2">
                                    {systemAudit.issues.map((i, idx) => (
                                        <label key={idx} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${rejectReasons.includes(i) ? "bg-zinc-50 border-zinc-900" : "bg-white border-zinc-100"
                                            }`}>
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded text-zinc-900"
                                                onChange={(e) => e.target.checked ? setRejectReasons([...rejectReasons, i]) : setRejectReasons(rejectReasons.filter(r => r !== i))}
                                            />
                                            <span className="text-xs font-bold text-zinc-700">{i}</span>
                                        </label>
                                    ))}
                                </div>
                                <textarea
                                    placeholder="Official Rejection Remark (Required)"
                                    className="w-full border-2 border-zinc-100 rounded-2xl p-4 text-sm font-bold focus:border-rose-500 outline-none min-h-[120px]"
                                    value={extraReason}
                                    onChange={(e) => setExtraReason(e.target.value)}
                                />
                            </div>
                        )}

                        {/* FRAUD & ESCALATION BLOCKER */}
                        {escalation && (
                            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 space-y-4">
                                <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest">
                                    <ShieldAlert size={20} /> Procedural Block
                                </div>
                                <p className="text-xs text-rose-800 leading-relaxed font-bold">
                                    You cannot 'Approve' a candidate flagged by the System Engine as <span className="underline">{systemAudit.status}</span>.
                                </p>
                                <div className="pt-2">
                                    <p className="text-[9px] font-black text-rose-400 uppercase tracking-tighter">Automatic Escalation Path:</p>
                                    <div className="mt-1 px-3 py-2 bg-white rounded-lg border border-rose-100 text-[10px] font-mono text-rose-900">
                                        QUEUE: SENIOR_AUDITOR_L3
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SUBMIT SECTION */}
                        <div className="space-y-4 pt-6">
                            <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                <Fingerprint size={24} className="text-blue-600" />
                                <div>
                                    <p className="text-[10px] font-black text-zinc-900 uppercase">E-Sign Required</p>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Biometric or OTP-Based</p>
                                </div>
                            </div>

                            <button
                                disabled={!canSubmit}
                                className="w-full py-5 bg-zinc-900 hover:bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-blue-900/20 disabled:opacity-20 disabled:grayscale transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                Sign & Deploy Result <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- ENHANCED MINI COMPONENTS --- */

const StatusBadge = ({ status }) => {
    const isVerified = status === "Verified";
    const isPartial = status === "Partially Verified";
    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 ${isVerified ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" :
            isPartial ? "bg-amber-500/10 border-amber-500 text-amber-400" :
                "bg-rose-500/10 border-rose-500 text-rose-400"
            }`}>
            {isVerified ? <CheckCircle2 size={14} /> : isPartial ? <Activity size={14} /> : <ShieldAlert size={14} />}
            {status}
        </div>
    );
};

const Progress = ({ confidence }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <span>AI Confidence Rating</span>
            <span className="text-blue-400">{confidence}%</span>
        </div>
        <div className="h-3 bg-zinc-800 rounded-full border border-zinc-700 p-0.5">
            <div className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all duration-1000" style={{ width: `${confidence}%` }} />
        </div>
    </div>
);

const EvidenceCard = ({ name, type, used }) => (
    <div className="group flex justify-between items-center bg-zinc-50 border-2 border-zinc-300 hover:border-blue-600 p-5 rounded-3xl transition-all cursor-pointer">
        <div className="flex gap-4 items-center">
            <div className="p-3 bg-white rounded-2xl text-zinc-400 group-hover:text-blue-600 transition-colors shadow-sm">
                <FileText size={20} />
            </div>
            <div>
                <p className="text-sm font-black text-zinc-900 tracking-tight">{name}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{type}</p>
            </div>
        </div>
        <div className="flex gap-2">
            {used && <div className="p-1 bg-blue-100 text-blue-600 rounded" title="Indexed by AI engine"><Cpu size={12} /></div>}
            <ExternalLink size={16} className="text-zinc-300" />
        </div>
    </div>
);

const DecisionButton = ({ active, onClick, icon, label, color, disabled }) => {
    const activeStyles = {
        emerald: "bg-green-700 border-green-700 text-white shadow-lg shadow-green-200",
        rose: "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-200",
    };

    const hoverStyles = {
        emerald: "hover:border-green-600 hover:text-green-700",
        rose: "hover:border-rose-600 hover:text-rose-600",
    };

    const inactiveBase =
        "bg-white border-zinc-300 text-zinc-400";

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`
        w-full py-4 rounded-2xl
        font-black uppercase text-[10px] tracking-widest
        flex items-center justify-center gap-3
        transition-all border-2
        ${active ? activeStyles[color] : `${inactiveBase} ${hoverStyles[color]}`}
        ${disabled ? "opacity-30 grayscale cursor-not-allowed" : "cursor-pointer"}
      `}
        >
            {icon} {label}
        </button>
    );
};


const SectionTitle = ({ icon, title }) => (
    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
        {icon} {title}
    </p>
);

const DataItem = ({ label, value }) => (
    <div className="border-2 border-zinc-300 p-2 rounded-md">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
            {label}
        </p>
        <p className="text-sm font-black text-zinc-900">{value}</p>
    </div>
);


const formatTime = (s) => `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m ${s % 60}s`;

export default VerificationTerminal;