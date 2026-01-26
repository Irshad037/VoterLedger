import React from "react";
import mapImg from '../../assets/map.png'
import { ChartNoAxesCombined, FileCheck, Search, Users, CheckCircle, ShieldCheck, Database, TrendingUp, FileText } from "lucide-react";
import ConstituencyMap from "../Map/ConstituencyMap";

const Home = () => {
    return (
        <div className="">
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">


                        <div>
                            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                                Track Elections.<br />
                                Track Promises.<br />
                                Track Truth.
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-gray-600">
                                A transparent, citizen-driven platform for election monitoring and
                                governance accountability. Verify promises, track public spending,
                                and hold leaders accountable.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 transition"
                                >
                                    Explore Elections →
                                </button>

                                <button
                                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold shadow hover:bg-emerald-600 transition"
                                >
                                    Track Promises <TrendingUp className="w-5 h-5" />
                                </button>
                            </div>
                        </div>


                        <div className="relative">
                            <div className="rounded-2xl bg-white p-6 px-8 shadow-xl">
                                <div className="flex h-72 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-emerald-100">

                                    <div className="h-72 rounded-xl overflow-hidden">
                                        <ConstituencyMap />
                                    </div>
                                </div>

                                <p className="mt-4 text-center text-sm text-gray-500">
                                    Interactive Constituency Map
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div>
                <h1 className="text-6xl font-bold text-center mt-20">Civic Accountability</h1>
                <div className="flex items-center justify-center my-4">
                    <p className=" text-center text-xl   text-zinc-700">Empowering citizens to track promises, verify actions, and ensure transparent governance</p>
                </div>

            </div>
            <div className="mt-16 mb-30">
                <div className="w-full mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg">

                    {/* Header */}
                    <div className="mb-4 flex items-center gap-2">
                        <Search className="h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Search Candidate by PIN Code
                        </h2>
                    </div>

                    {/* Input + Button */}
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter 6-digit PIN code"
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm
                       focus:border-blue-500 focus:outline-none"
                        />

                        <button
                            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold
                       text-white hover:bg-blue-700 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>


            <div className="bg-zinc-100 py-16">
                <h1 className="text-center text-3xl font-semibold mb-12">
                    How It Works
                </h1>

                <div className="mx-auto max-w-[85rem] px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {workSteps.map((work, idx) => (
                            <div
                                key={work.id}
                                className="  rounded-xl bg-white px-8 py-5 text-center  border border-zinc-200"
                            >
                                {/* ICON */}
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                                    {work.icon}
                                </div>

                                {/* TITLE */}
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    {idx + 1}. {work.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                                    {work.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white py-10">
                <h2 className="mb-16 text-center text-3xl font-semibold text-zinc-900">
                    Key Features
                </h2>

                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 gap-16 md:grid-cols-3 text-center">

                        {/* Feature 1 */}
                        <div>
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <CheckCircle className="h-7 w-7" />
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900">
                                Verified Data
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                AI-verified information from official sources with blockchain
                                immutability
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div>
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <ShieldCheck className="h-7 w-7" />
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900">
                                Non-Partisan
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                Independent platform focused on facts, not political affiliations
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div>
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <Database className="h-7 w-7" />
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900">
                                Open Data
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                Public access to all datasets for transparency and accountability
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;


const workSteps = [
    {
        id: "discover",
        icon: <Search size={32} />,
        title: "Discover Elections",
        description: "Browse upcoming and ongoing elections in your region",
    },
    {
        id: "compare",
        icon: <Users size={32} />,
        title: "Compare Candidates",
        description: "Review candidate backgrounds, assets, and criminal records",
    },
    {
        id: "manifestos",
        icon: <FileText size={32} />,
        title: "Read Manifestos",
        description: "Explore campaign promises with budget estimates and timelines",
    },
    {
        id: "track",
        icon: <TrendingUp size={32} />,
        title: "Track Accountability",
        description: "Monitor promise fulfillment and fund utilization post-election",
    },
];

