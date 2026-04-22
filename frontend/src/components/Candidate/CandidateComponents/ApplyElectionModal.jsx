import React, { useState } from "react";
import { X } from "lucide-react";
import { UseApplication } from "../../../hooks/candidate/UseApplication";
import { UseManifesto } from "../../../hooks/candidate/UseManifesto";

const ApplyElectionModal = ({ election, onClose }) => {
  const { applyForElection } = UseApplication();
  const { myManifestos } = UseManifesto();

  const { data = [], isLoading } = myManifestos;

  const usableManifestos = data.filter(
    m => m.status === "Submitted" || m.status === "Approved"
  );

  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleApply = () => {
    console.log(election._id, selected,);
    
    applyForElection.mutate({
      electionId: election._id,
      manifestoIds: selected,
    }, {
      onSuccess: onClose,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-black">Select Manifestos</h2>
          <button onClick={onClose}><X /></button>
        </div>

        {isLoading && <p>Loading manifestos...</p>}

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {usableManifestos.map(m => (
            <label key={m._id} className="flex gap-3 border p-4 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(m._id)}
                onChange={() => toggle(m._id)}
              />
              <div>
                <p className="font-bold">{m.category}</p>
                <p className="text-sm text-zinc-500">{m.text}</p>
                <span className="text-xs text-green-600">{m.status}</span>
              </div>
            </label>
          ))}
        </div>

        <button
          disabled={selected.length === 0 || applyForElection.isPending}
          onClick={handleApply}
          className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-black disabled:opacity-50"
        >
          {applyForElection.isPending ? "Applying..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
};

export default ApplyElectionModal;
