import React, { useState } from 'react'
import { MapPin, Search, Filter, Calendar, Clock, MapPinned, } from "lucide-react";
import { useNavigate } from "react-router-dom";


const elections = [
    {
        id: 1,
        state: "Maharashtra",
        city: "Mumbai",
        type: "State",
        pollingDate: "March 10, 2026",
        constituencies: 288,
        daysLeft: 45,
        status: "Upcoming",

    },
    {
        id: 2,
        state: "Maharashtra",
        city: " Navi Mumbai",
        type: "Local",
        pollingDate: "March 10, 2026",
        constituencies: 288,
        daysLeft: 45,
        status: "Ongoing",

    },
    {
        id: 3,
        state: "Karnataka",
        city: "Bangalore",
        type: "Local",
        pollingDate: "February 5, 2026",
        constituencies: 224,
        daysLeft: 5,
        status: "Ongoing",
    },
    {
        id: 4,
        state: "Uttar Pradesh",
        city: "Lucknow",
        type: "State",
        pollingDate: "May 20, 2026",
        constituencies: 403,
        daysLeft: 120,
        status: "Upcoming",

    },
    {
        id: 5,
        state: "Tamil Nadu",
        city: "Chennai",
        type: "State",
        pollingDate: "January 15, 2025",
        constituencies: 234,
        daysLeft: 0,
        status: "Ended",
    },

];
const AllApplication = () => {
    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();


    const filteredData = elections.filter((e) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            e.state.toLowerCase().includes(search) ||
            e.city.toLowerCase().includes(search);

        const matchesType =
            selectedType === "all" || e.type === selectedType;

        return matchesSearch && matchesType;
    });
    return (
        <div className="bg-zinc-50 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <h1 className="text-4xl font-bold text-zinc-900">
                    Available Elections
                </h1>
                <p className="mt-2 text-lg text-zinc-600">
                    Find upcoming and ongoing elections across India
                </p>

                {/* LOCATION BANNER */}
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
                    <div className=' flex items-center justify-center  my-auto'>
                        <MapPin className=" h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-medium text-black">
                            Location Detected: Mumbai, Maharashtra
                        </p>
                        <p className="text-sm text-zinc-500">
                            Showing elections relevant to your area
                        </p>
                    </div>
                </div>

                {/* SEARCH + FILTER */}
                <div className="mt-8 flex flex-col gap-4 md:flex-row bg-white py-8 px-5 shadow-sm rounded-md">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            value={searchTerm}
                            type="text"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by state, city, or constituency..."
                            className="w-full rounded-lg border border-zinc-300 py-3 pl-11 pr-4 text-sm focus:border-blue-600 focus:outline-none"
                        />
                    </div>

                    <div className="relative w-full ">
                        <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <select
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-blue-600 bg-white py-3 pl-11 pr-4 text-sm font-medium focus:outline-none">
                            <option value="all">All Election Types</option>
                            <option value="National">National</option>
                            <option value="State">State Assembly</option>
                            <option value="Local">Local Body</option>
                        </select>
                    </div>
                </div>

                {/* ELECTION CARDS */}
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredData.map((election, idx) => (
                        <div
                            key={idx}

                            className={`rounded-md border-t-8 ${election.status === 'Ongoing'
                                ? 'border-green-600'
                                : election.status === 'Ended'
                                    ? 'border-zinc-600'
                                    : 'border-blue-800'
                                } bg-white p-6 shadow-sm hover:shadow-xl`}

                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900">
                                        {election.state}
                                    </h3>
                                    <p className="text-sm text-zinc-500">{election.city}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${election.status === 'Ongoing'
                                    ? 'bg-green-200 text-green-800'
                                    : election.status === 'Ended'
                                        ? 'bg-zinc-200 text-zinc-700'
                                        : 'bg-blue-50 text-primary'
                                    }`}
                                >

                                    {election.status}
                                </div>
                            </div>

                            {/* DETAILS */}
                            <div className="mt-5 space-y-3 text-sm text-zinc-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Filter className="w-4 h-4 text-blue-900" />
                                    </div>
                                    {election.type}{" "}Election
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Calendar className="h-4 w-4 text-blue-900" />
                                    </div>
                                    Polling: {election.pollingDate}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                        <MapPinned className="h-4 w-4 text-blue-900" />
                                    </div>
                                    {election.constituencies} constituencies
                                </div>
                            </div>

                            {/* COUNTDOWN */}
                           
                            <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-zinc-200 py-4 text-blue-700">
                                <Clock className="h-5 w-5" />
                                {election.status === "Upcoming" && (
                                    <>
                                        <span className="text-xl font-semibold">
                                            {election.daysLeft}
                                        </span>
                                        <span className="text-sm">days to polling</span>
                                    </>
                                )}

                                {election.status === "Ongoing" && (
                                    <span className="text-sm font-semibold text-green-700">
                                        Polling in progress
                                    </span>
                                )}

                                {election.status === "Ended" && (
                                    <span className="text-sm font-semibold text-zinc-600">
                                        Election ended
                                    </span>
                                )}
                            </div>

                            {/* CTA */}
                            <button
                                disabled={election.status !== "Upcoming"}
                                onClick={() => alert("Application submitted Successfully")}
                                className={`mt-6 w-full rounded-lg py-3 text-sm font-semibold text-white transition
                                   ${election.status === "Upcoming"
                                        ? "bg-blue-800 hover:bg-blue-900 cursor-pointer"
                                        : election.status === "Ongoing"
                                            ? "bg-green-600 cursor-not-allowed opacity-70"
                                            : "bg-zinc-700 cursor-not-allowed opacity-70"
                                    }
                                `}
                            >
                                {election.status === "Upcoming" ? "APPLY" : election.status === "Ongoing" ? "Already in Progress" : "Already Ended"}
                            </button>

                        </div>
                    ))}
                </div>

            </div>
        </div >
    )
}

export default AllApplication
