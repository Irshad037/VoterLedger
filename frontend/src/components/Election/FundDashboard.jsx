import React from "react";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img from '../../assets/election/image3.png'

const fundSummary = {
    name: "Priya Sharma",
    party: "Democratic Alliance",
    totalBudget: "₹11.50 Crore",
    img: "/candidate.jpg", // replace with real image
};

const projectAllocations = [
    {
        id: 1,
        name: "Road Development Project",
        amount: "₹5.00 Cr",
    },
    {
        id: 2,
        name: "Healthcare Infrastructure",
        amount: "₹3.00 Cr",
    },
    {
        id: 3,
        name: "School Renovation Program",
        amount: "₹2.00 Cr",
    },
    {
        id: 4,
        name: "Skill Development Centers",
        amount: "₹1.50 Cr",
    },
];

const FundDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-100 px-6 py-10">
            <div className="mx-auto max-w-6xl space-y-6">

                {/* BACK */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-lg font-bold text-zinc-600 hover:text-zinc-900 cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back
                </button>

                {/* HEADER CARD */}
                <div className="rounded-xl bg-white p-6 shadow-sm border-2 border-zinc-200 flex gap-6">
                    <div className="w-27.5 h-27.5 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <img
                            src={img}
                            alt=""
                            className="h-[100px] w-[100px] rounded-xl object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="flex items-center gap-1 text-2xl font-bold text-zinc-900">
                            💲 <span className="text-3xl">Fund Dashboard</span>
                        </h1>

                        <p className="mt-1 font-medium text-zinc-600 text-lg ">
                            {fundSummary.name}
                        </p>
                        <p className="text-sm text-zinc-500 font-bold mt-2">
                            {fundSummary.party}
                        </p>

                        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
                            <p className="text-sm text-zinc-400 font-bold">
                                Total Budget Allocated
                            </p>
                            <p className="mt-1 text-2xl font-bold text-blue-700">
                                {fundSummary.totalBudget}
                            </p>
                        </div>
                    </div>
                </div>

                {/* PROJECT-WISE TABLE */}
                <div className="rounded-xl bg-white p-6 shadow-sm border-2 border-zinc-200">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-900">
                        📊 Project-wise Budget Allocation
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 text-left border-zinc-200 text-zinc-600">
                                    <th className="pb-3">Project Name</th>
                                    <th className="pb-3">Budget Allocated</th>
                                    <th className="pb-3">Proof of Spending</th>
                                </tr>
                            </thead>

                            <tbody>
                                {projectAllocations.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-b-2 border-zinc-200 last:border-none"
                                    >
                                        <td className="py-2 flex items-center gap-2 font-medium text-zinc-800">
                                            <FileText size={16} className="text-zinc-500" />
                                            {project.name}
                                        </td>

                                        <td className="py-2">
                                            <span className="rounded-md bg-green-600 px-4 py-1 text-white font-semibold">
                                                {project.amount}
                                            </span>
                                        </td>

                                        <td className="py-2">
                                            <button className="inline-flex items-center gap-2 rounded-md border-2 border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
                                                <ExternalLink size={14} />
                                                View Proof
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 shadow-sm flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white text-lg font-bold">
                        $
                    </div>

                    <div>
                        <h4 className="font-semibold text-zinc-900">
                            Transparency & Accountability
                        </h4>

                        <p className="mt-1 text-sm text-zinc-700 leading-relaxed">
                            All fund allocations are tracked and verified. Click on{" "}
                            <span className="font-semibold">"View Proof"</span> to see
                            blockchain-verified spending records and ensure your representative
                            is using public funds responsibly.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FundDashboard;
