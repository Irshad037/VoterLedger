import React, { useState } from "react";
import { Eye, CheckCircle, XCircle, ShieldCheck, Search, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock Data
const applications = [
  { id: 1, name: "Rajesh Kumar", election: "Mumbai North", party: "Democratic Alliance", status: "Pending", email: "rajesh.k@example.com", initial: "RK", color: "bg-blue-500" },
  { id: 2, name: "Sunita Deshmukh", election: "Pune Central", party: "Regional People's Party", status: "Verified", email: "sunita.d@example.com", initial: "SD", color: "bg-purple-500" },
  { id: 3, name: "Arjun Singh", election: "Nagpur South", party: "National Unity", status: "Approved", email: "arjun.s@example.com", initial: "AS", color: "bg-emerald-500" },
  { id: 4, name: "Priya Sharma", election: "Mumbai South", party: "Independent", status: "Rejected", email: "priya.s@example.com", initial: "PS", color: "bg-orange-500" },
];

const getStatusStyles = (status) => {
  const styles = {
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10",
    Verified: "bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/10",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/10",
    Pending: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10",
  };
  return styles[status] || styles.Pending;
};

const ApplicationTable = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(applications);
  const [search, setSearch] = useState("");
  const filteredApplications = list.filter((a) =>
    `${a.name} ${a.election} ${a.party} ${a.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white p-5 border-2 border-zinc-300 rounded-md overflow-hidden shadow-md">

        {/* Table Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4 mb-5 bg-white rounded-md border-2 border-zinc-300">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Election Applications</h2>
            <p className="text-sm text-zinc-500 mt-1">Manage and audit candidate registration requests.</p>
          </div>

          <div className="relative w-full md:w-64 border-2 border-zinc-300 rounded-xl p-1 focus:ring-2 focus:ring-blue-100 bg-zinc-100">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2  cursor-pointer" size={16} />
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-transparent focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto border-2 border-zinc-300  rounded-md ">
          <table className="w-full text-sm text-left border-collapse bg-white">
            <thead>
              <tr className=" text-black uppercase text-[14px] tracking-wider font-semibold border-b-2 border-zinc-300">
                <th className="px-6 py-4">Candidate Details</th>
                <th className="px-6 py-4">Constituency</th>
                <th className="px-6 py-4">Party</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredApplications.map((a) => (
                <tr key={a.id} className="group hover:bg-blue-50/30 transition-all duration-200 border-b border-zinc-300 ">
                  <td className="px-6 py-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${a.color} ring-4 ring-white shadow-sm`}>
                        {a.initial}
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900 group-hover:text-blue-700 transition-colors">{a.name}</div>
                        <div className="text-xs text-zinc-500 font-medium">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-zinc-700 font-medium">{a.election}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 italic">
                    {a.party}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold border ring-1 ${getStatusStyles(a.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                      <button
                        onClick={() => navigate(`/elections/${electionId}/candidate/${a.id}`)}
                        title="View" className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-zinc-200 transition-all cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button title="Approve" className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-zinc-200 transition-all">
                        <CheckCircle size={16} />
                      </button>
                      <button title="Reject" className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-zinc-200 transition-all">
                        <XCircle size={16} />
                      </button>
                      <button className="p-2 text-zinc-300 hover:text-zinc-600 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
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

export default ApplicationTable;