import React, { useState } from 'react';
import {
    Plus, Edit2, Lock, Clock, CheckCircle2, DollarSign,
    Calendar, X, Filter, Search, AlertCircle
} from 'lucide-react';
import PromiseCard from '../CandidateComponents/PromiseCard';
import { UseManifesto } from '../../../hooks/candidate/UseManifesto';

const Manifesto = () => {
    const { createManifesto, myManifestos, updateManifesto, deleteManifesto } = UseManifesto();

    const {
        data: promises = [],
        isLoading,
        isError,
    } = myManifestos;


    const [newPromise, setNewPromise] = useState({
        category: "Education",
        text: "",
        budget: "",
        timeline: "",
        proofDocument: null,
    });
    const [editingPromise, setEditingPromise] = useState(null);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All", "Education", "Healthcare", "Infrastructure", "Environment", "Economy", "Public Safety"];

    const filteredPromises = promises.filter(p => {
        const matchesFilter = filter === "All" || p.category === filter;
        const matchesSearch = p.text.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });


    const handleSavePromise = async (status) => {
        const payload = { ...newPromise, status };

        if (editingPromise) {
            await updateManifesto.mutateAsync({
                id: editingPromise._id,
                payload,
            });
        } else {
            await createManifesto.mutateAsync(payload);
        }

        closeModal();
    };

    const handleDeletePromise = async () => {
        if (!editingPromise) return;

        await deleteManifesto.mutateAsync(editingPromise._id);
        closeModal();
    };



    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPromise(null);
        setNewPromise({
            category: "Education",
            text: "",
            budget: "",
            timeline: "",
            proofDocument: null
        });
    };

    const isDisabled =
        createManifesto.isPending ||
        !newPromise.text ||
        !newPromise.budget ||
        !newPromise.timeline ||
        (!editingPromise && !newPromise.proofDocument);


    return (
        <div className="min-h-screen p-6 md:p-10">
            {isLoading && (
                <p className="text-center text-zinc-500">Loading manifestos...</p>
            )}

            {isError && (
                <p className="text-center text-red-500">Failed to load manifestos</p>
            )}

            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Manifesto Builder</h1>
                        <p className="text-zinc-500 mt-1">Define and manage your election promises and policy goals.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
                    >
                        <Plus size={20} /> Add New Promise
                    </button>
                </div>

                {/* Toolbar: Filter & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search promises..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <Filter size={18} className="text-zinc-400 shrink-0" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${filter === cat
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-zinc-600 border-zinc-200 hover:border-blue-300"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid of Promise Cards */}
                {filteredPromises.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPromises.map((promise) => (
                            <PromiseCard
                                key={promise._id}

                                promise={promise}
                                onEdit={(p) => {
                                    if (p.status === "Approved") return; // 🔒 BLOCK

                                    setEditingPromise(p);
                                    setNewPromise({
                                        category: p.category,
                                        text: p.text,
                                        budget: p.budget,
                                        timeline: p.timeline,
                                        proofDocument: null,
                                    });
                                    setIsModalOpen(true);
                                }}


                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-zinc-300">
                        <AlertCircle size={48} className="text-zinc-300 mb-4" />
                        <p className="text-zinc-500 font-medium">No promises found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Simple Add Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">

                            <h3 className="text-xl font-bold text-zinc-900">
                                {editingPromise ? "Edit Promise" : "Add New Promise"}
                            </h3>
                            <button
                                disabled={createManifesto.isPending}
                                onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full text-zinc-400 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Category</label>
                                <select
                                    value={newPromise.category}
                                    onChange={e => setNewPromise({ ...newPromise, category: e.target.value })}
                                    className="w-full mt-1.5 p-3 bg-zinc-50 border-2 border-zinc-300 rounded-xl outline-none focus:border-blue-600"
                                >
                                    {categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Promise Description</label>
                                <textarea
                                    value={newPromise.text}
                                    onChange={e => setNewPromise({ ...newPromise, text: e.target.value })}
                                    className="w-full mt-1.5 p-3 bg-zinc-50 border-2 border-zinc-300 rounded-xl outline-none focus:border-blue-600 h-24 resize-none"
                                    placeholder="What do you intend to achieve?"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Budget ($)</label>
                                    <input
                                        value={newPromise.budget}
                                        onChange={e => setNewPromise({ ...newPromise, budget: e.target.value })}
                                        type="text" className="w-full mt-1.5 p-3 bg-zinc-50 border-2 border-zinc-300 rounded-xl outline-none focus:border-blue-600" placeholder="e.g. 1.2M"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Timeline</label>
                                    <input
                                        type="text"
                                        value={newPromise.timeline}
                                        onChange={e => setNewPromise({ ...newPromise, timeline: e.target.value })}
                                        className="w-full mt-1.5 p-3 bg-zinc-50 border-2 border-zinc-300 rounded-xl outline-none focus:border-blue-600" placeholder="e.g. 12 Months"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">
                                    Upload Proof Document (PDF only)
                                </label>

                                <input
                                    type="file"
                                    accept="application/pdf,image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setNewPromise(prev => ({
                                                ...prev,
                                                proofDocument: reader.result, // base64 only
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    className="w-full mt-1.5 p-3 cursor-pointer bg-zinc-50 border-2 border-zinc-300 rounded-xl outline-none focus:border-blue-600"
                                />


                                {newPromise.proofDocument && (
                                    <p className="text-xs text-green-600 mt-1">
                                        uploaded
                                    </p>
                                )}
                            </div>

                        </div>
                        <div className="p-6 bg-zinc-50">
                            {editingPromise ? (
                                <button
                                    disabled={
                                        createManifesto.isPending ||deleteManifesto.isPending||
                                        editingPromise?.status === "Approved"
                                    }
                                    onClick={handleDeletePromise}

                                    className="w-full mb-3 py-3 font-bold bg-red-600 text-white rounded-xl
                                     hover:bg-red-700 transition-all disabled:opacity-50
                                                            disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Delete Promise
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={closeModal}
                                        disabled={createManifesto.isPending}
                                        className="flex-1 py-3 font-bold bg-red-600 text-white rounded-xl
                                         hover:bg-red-700 transition-all disabled:opacity-50
                                         disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        disabled={isDisabled}
                                        onClick={() => handleSavePromise("Draft")}
                                        className="flex-1 py-3 font-bold bg-green-600 text-white rounded-xl
                                         hover:bg-green-700 transition-all disabled:opacity-50
                                      disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {createManifesto.isPending ? "Saving..." : "Save as Draft"}
                                    </button>
                                </div>
                            )}

                            <button
                                disabled={isDisabled}
                                onClick={() => handleSavePromise("Submitted")}
                                className="w-full mt-4 py-3 font-bold bg-blue-600 text-white rounded-xl
                                  hover:bg-blue-700 transition-all disabled:opacity-50
                                  disabled:cursor-not-allowed cursor-pointer"
                            >
                                {createManifesto.isPending
                                    ? "Submitting..."
                                    : editingPromise
                                        ? "Submit Changes"
                                        : "Create Promise"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};



export default Manifesto;


