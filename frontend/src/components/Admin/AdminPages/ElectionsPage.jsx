import React, { useState } from "react";
import { Calendar, Clock, Filter, MapPinned } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElectionsPage = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Elections</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
        >
          Create New Election
        </button>

      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {elections.map((election, idx) => (
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
              <span className="text-xl font-semibold">
                {election.daysLeft}
              </span>
              <span className="text-sm">days to polling</span>
            </div>

            {/* CTA */}
            <button
            onClick={()=>navigate(`/admin/elections/${election.id}/applications`)}
              className={`mt-6 w-full rounded-lg ${election.status === 'Ongoing'
                ? 'bg-green-600 hover:bg-green-700'
                : election.status === 'Ended'
                  ? 'bg-zinc-700 hover:bg-zinc-800'
                  : 'bg-blue-800 hover:bg-blue-900'
                } py-3 text-sm font-semibold text-white transition`}
            >
              View Details
            </button>
          </div>
        ))}

        {/* CREATE ELECTION MODAL */}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-zinc-900">
                  Create New Election
                </h2>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-zinc-500 hover:text-zinc-800 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* FORM */}
              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="State"
                  className="w-full rounded-md border-2 border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="City / Constituency"
                  className="w-full rounded-md border-2 border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select className="w-full rounded-md border-2 border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Election Type</option>
                  <option>National</option>
                  <option>State</option>
                  <option>Local</option>
                </select>

                <input
                  type="date"
                  className="w-full rounded-md border-2 border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="number"
                  placeholder="Number of Constituencies"
                  className="w-full rounded-md border-2 border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select className="w-full rounded-md border-2 border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Status</option>
                  <option>Upcoming</option>
                  <option>Ongoing</option>
                  <option>Ended</option>
                </select>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-md border-2 border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Create Election
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default ElectionsPage;
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


