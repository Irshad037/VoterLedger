import React, { useMemo, useState } from 'react';
import {
  Search, Plus, Calendar, Clock, MapPinned,
  AlertCircle, BadgeCheck, X, LayoutGrid, List,
  MapPin, SendHorizontal, Globe,
  Trash2
} from "lucide-react";
import ElectionApplyCard from '../AdminComponets/ElectionApplyCard';
import { UseElection } from '../../../hooks/election/UseElection';

const ElectionsPage = () => {


  const { allElectionsById } = UseElection();
  const {
    data: elections = [],
    isLoading,
    isError,
  } = allElectionsById;

  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    level: "National",
    pollingDate: "",
    seats: "",
    status: "Upcoming",
    pincode: "",
  });

  /* =========================
     NORMALIZE DATA ✅
     ========================= */
  const normalizedElections = useMemo(() => {
    return elections.map((e) => {
      const polling = new Date(e.pollingDate);
      const today = new Date();

      const daysLeft = Math.max(
        Math.ceil((polling - today) / (1000 * 60 * 60 * 24)),
        0
      );

      return {
        _id: e._id,
        state: e.state,
        city: e.city,
        type: e.level,
        pollingDate: polling.toDateString(),
        constituencies: e.seats,
        daysLeft,
        status: e.status,
        pincode: e.pincode,
      };
    });
  }, [elections]);

  /* =========================
     FILTERING ✅
     ========================= */
  const filteredData = normalizedElections.filter((e) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      e.state.toLowerCase().includes(search) ||
      e.city.toLowerCase().includes(search);

    const matchesType =
      selectedType === "all" || e.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleCreateElection = () => {
    if (!formData.state || !formData.city || !formData.pollingDate) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.level === "Local" && !formData.pincode) {
      alert("PIN code is required for Local elections");
      return;
    }
    const today = new Date();
    const pollDate = new Date(formData.pollingDate);
    const diffDays = Math.max(
      Math.ceil((pollDate - today) / (1000 * 60 * 60 * 24)),
      0
    );
    const newElection = {
      id: Date.now(),
      state: formData.state,
      city: formData.city,
      type: formData.level,
      pollingDate: formData.pollingDate,
      constituencies: formData.seats,
      status: formData.status,
      pincode: formData.level === "Local" ? formData.pincode : null,
      daysLeft: diffDays,
    };


    setElectionList([newElection, ...electionList]);

    setOpenModal(false);
    setFormData({
      state: "",
      city: "",
      level: "National",
      pollingDate: "",
      seats: "",
      status: "Upcoming",
      pincode: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] pb-20">

      {/* --- ADMIN ACTIONS HEADER --- */}
      <div className="bg-white border-b border-zinc-200 px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Election Management</h1>
            <p className="text-sm font-medium text-zinc-500 mt-1">Deploy new election cycles and manage active polling registries.</p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Plus size={18} /> Create New Election
          </button>
        </div>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="mx-auto max-w-7xl px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickStat label="Active Registries" value="04" icon={<BadgeCheck className="text-blue-600" />} bg="bg-blue-50" />
        <QuickStat label="Live Polling" value="02" icon={<Clock className="text-emerald-600" />} bg="bg-emerald-50" />
        <QuickStat label="Total Constituencies" value="1,437" icon={<Globe className="text-purple-600" />} bg="bg-purple-50" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* --- TOOLBAR --- */}
        <div className="mt-10 flex flex-col lg:flex-row items-center gap-4">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by state or city..."
              className="w-full rounded-2xl bg-white border-2 border-zinc-100 py-4 pl-12 pr-4 text-sm font-bold text-zinc-700 shadow-sm focus:border-blue-600 outline-none transition-all"
            />
          </div>

          <div className="flex bg-white p-1.5 rounded-2xl border-2 border-zinc-100 shadow-sm w-full lg:w-auto">
            {['all', 'National', 'State', 'Local'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 text-xs font-black uppercase cursor-pointer tracking-widest transition-all ${selectedType === type ? "bg-zinc-900 text-white shadow-md rounded-xl" : "text-zinc-400 hover:text-zinc-600"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((election) => (
            <div key={election._id} className="relative group">
              {/* DELETE BUTTON: Absolute positioned on the card container */}
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm text-zinc-400 hover:text-rose-600 border border-zinc-100 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:shadow-md cursor-pointer"
                title="Delete Election"
              >
                <Trash2 size={18} />
              </button>

              <ElectionApplyCard election={election} />
            </div>
          ))}
        </div>
      </div>

      {/* --- ENHANCED CREATION MODAL --- */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setOpenModal(false)} />

          <div className="relative w-full max-w-xl rounded-[2.5rem] bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-zinc-900 p-8 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight">Deploy Election</h2>
                <p className="text-zinc-400 text-xs font-bold mt-1">Configure parameters for the new voting registry</p>
              </div>
              <button onClick={() => setOpenModal(false)} className="p-2 cursor-pointer hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <ModalInput
                  label="State Name"
                  placeholder="e.g. Karnataka"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />

                <ModalInput
                  label="City / Region"
                  placeholder="e.g. Bangalore"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase ml-1">Election Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    className="w-full rounded-xl border-2 border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-bold focus:border-blue-600 outline-none transition-all appearance-none">
                    <option value="National">National</option>
                    <option value="State">State</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
                <ModalInput
                  label="Polling Date"
                  type="date"
                  value={formData.pollingDate}
                  onChange={(e) =>
                    setFormData({ ...formData, pollingDate: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ModalInput
                  label="No. of Seats"
                  type="number"
                  placeholder="e.g. 224"
                  value={formData.seats}
                  onChange={(e) =>
                    setFormData({ ...formData, seats: e.target.value })
                  }
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase ml-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full rounded-xl border-2 border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-bold focus:border-blue-600 outline-none transition-all appearance-none">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Ended">Ended</option>
                  </select>
                </div>
              </div>
              {formData.level === "Local" && (<>
                <ModalInput
                  label="PIN Code"
                  type="text"
                  placeholder="400001"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                />
              </>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="flex-1 py-4 cursor-pointer font-black text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleCreateElection}
                  className="flex-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-200">
                  Initialize Registry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- MINI COMPONENTS --- */

const QuickStat = ({ label, value, icon, bg }) => (
  <div className="bg-white p-6 rounded-4xl border border-zinc-200 shadow-sm flex items-center gap-5 hover:border-blue-200 transition-colors group">
    <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">{label}</p>
      <p className="text-2xl font-black text-zinc-900">{value}</p>
    </div>
  </div>
);

const ModalInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-zinc-400  uppercase ml-1">{label}</label>
    <input
      {...props}
      className="w-full rounded-xl border-2 border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-bold placeholder:text-zinc-300 focus:border-blue-600 focus:bg-white outline-none transition-all"
    />
  </div>
);

export default ElectionsPage;






