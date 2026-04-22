import React, { useState } from "react";
import {
    ShieldCheck,
    FilePlus,
    Lock,
    AlertTriangle,
    Search,
    Download,
    ShieldAlert,
    History,
    User,
    Cpu
} from "lucide-react";

/* ---------------- UPDATED DATA ---------------- */

const activityLogs = [
    { id: 1, time: "2026-02-01 14:35", actor: "Admin", action: "Election Created", detail: "Maharashtra Assembly Election created", status: "info" },
    { id: 2, time: "2026-02-02 10:12", actor: "Candidate", action: "Applied for Election", detail: "Rajesh Kumar applied for Mumbai North", status: "pending" },
    { id: 3, time: "2026-02-03 16:20", actor: "Admin", action: "Candidate Approved", detail: "Rajesh Kumar approved for Mumbai North", status: "success" },
    { id: 4, time: "2026-02-05 09:40", actor: "System", action: "Manifesto Locked", detail: "Manifesto locked after declaration", status: "locked" },
];

const securityLogs = [
    { id: 1, time: "2026-02-04 09:12", event: "Admin Login", ip: "192.168.1.12", result: "Success", severity: "low" },
    { id: 2, time: "2026-02-04 09:15", event: "Brute Force Attempt", ip: "192.168.1.20", result: "Failed", severity: "high" },
    { id: 3, time: "2026-02-04 11:30", event: "Password Change", ip: "102.12.1.45", result: "Success", severity: "medium" },
];

/* ---------------- COMPONENT ---------------- */

const ReportsLogs = () => {
    const [tab, setTab] = useState("activity");
    const [search, setSearch] = useState("");

    const getActorIcon = (actor) => {
        switch (actor) {
            case "Admin": return <ShieldCheck size={14} className="text-blue-600" />;
            case "System": return <Cpu size={14} className="text-zinc-500" />;
            default: return <User size={14} className="text-emerald-600" />;
        }
    };

    const filteredActivity = activityLogs.filter(log =>
        `${log.time} ${log.actor} ${log.action} ${log.detail}`
            .toLowerCase()
            .includes(search)
    );

    const filteredSecurity = securityLogs.filter(log =>
        `${log.time} ${log.event} ${log.ip} ${log.result}`
            .toLowerCase()
            .includes(search)
    );


    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">Reports & Logs</h1>
                    <p className="text-sm text-zinc-500 mt-1">Monitor system activity and security audits.</p>
                </div>
                {/* <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors">
          <Download size={16} /> Export CSV
        </button> */}
            </div>

            <div className="bg-white p-5 border-2 border-zinc-300 rounded-md shadow-md">
                {/* NAV & SEARCH */}
                <div className="bg-white mb-5 p-5 rounded-xl border-2 border-zinc-300  flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex p-2 bg-zinc-100 rounded-xl w-full md:w-auto border-2 border-zinc-300">
                        <button
                            onClick={() => setTab("activity")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${tab === "activity" ? "bg-white text-blue-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                                }`}
                        >
                            <History size={16} /> Activity
                        </button>
                        <button
                            onClick={() => setTab("security")}
                            className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${tab === "security" ? "bg-white text-blue-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                                }`}
                        >
                            <ShieldAlert size={16} /> Security
                        </button>
                    </div>

                    <div className="relative w-full md:w-64 border-2 border-zinc-300 rounded-xl p-1 focus:ring-2 focus:ring-blue-100 bg-zinc-100">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2  cursor-pointer" size={16} />
                        <input
                            type="text"
                            placeholder="Filter logs..."
                            className="w-full pl-10 pr-4 py-2 text-sm bg-transparent focus:outline-none"
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        />
                    </div>
                </div>

                {/* LOG TABLES */}
                <div className="bg-white rounded-md rounded-t-xl border-2 border-zinc-300  overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className=" border-b-2 border-zinc-300">
                            {tab === "activity" ? (
                                <tr>
                                    <th className="p-3 font-bold text-lg">Timestamp</th>
                                    <th className="p-3 font-bold text-lg">Actor</th>
                                    <th className="p-3 font-bold text-lg">Action</th>
                                    <th className="p-3 font-bold text-lg">Details</th>
                                    <th className="p-3 font-bold text-lg">Status</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th className="p-3 font-bold text-lg">Timestamp</th>
                                    <th className="p-3 font-bold text-lg">Event</th>
                                    <th className="p-3 font-bold text-lg">IP Address</th>
                                    <th className="p-3 font-bold text-lg">Severity</th>
                                    <th className="p-3 font-bold text-lg">Result</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {tab === "activity"
                                ? filteredActivity.map((log) => (
                                    <tr key={log.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="p-3 text-zinc-500 font-mono text-[12px]">{log.time}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2 font-semibold text-zinc-900">
                                                {getActorIcon(log.actor)}
                                                {log.actor}
                                            </div>
                                        </td>
                                        <td className="p-3 text-zinc-700 font-medium">{log.action}</td>
                                        <td className="p-3 text-zinc-500">{log.detail}</td>
                                        <td className="p-3"><StatusBadge status={log.status} /></td>
                                    </tr>
                                ))
                                : filteredSecurity.map((log) => (
                                    <tr key={log.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="p-4 text-zinc-500 font-mono text-[12px]">{log.time}</td>
                                        <td className="p-4 font-semibold text-zinc-900">{log.event}</td>
                                        <td className="p-4 font-mono text-zinc-600">{log.ip}</td>
                                        <td className="p-4">
                                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${log.severity === 'high'
                                                    ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                    : log.severity === 'medium'
                                                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                                                        : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                                                }`}>
                                                {log.severity}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${log.result === "Success"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                    : "bg-rose-50 text-rose-700 border-rose-100"
                                                }`}>
                                                {log.result}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>

                    </table>
                </div>
            </div>


        </div>
    );
};

/* ---------------- STATUS BADGE ---------------- */

const StatusBadge = ({ status }) => {
    const map = {
        success: { label: "Success", className: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: <ShieldCheck size={12} /> },
        pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-100", icon: <AlertTriangle size={12} /> },
        info: { label: "Info", className: "bg-sky-50 text-sky-700 border-sky-100", icon: <FilePlus size={12} /> },
        locked: { label: "Locked", className: "bg-zinc-100 text-zinc-600 border-zinc-200", icon: <Lock size={12} /> },
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${map[status].className}`}>
            {map[status].icon}
            {map[status].label}
        </span>
    );
};

export default ReportsLogs;