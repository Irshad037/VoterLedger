import React from "react";
import { Plus } from "lucide-react";

const CriminalCase = ({
  criminalCases,
  setCriminalCases,
  handlePdfChange,
}) => {

  const addCriminalCase = () => {
    setCriminalCases((prev) => [
      ...prev,
      {
        id: Date.now(),
        caseId: "",
        caseDetails: "",
        file: "", 
      },
    ]);
  };


  const removeCriminalCase = (id) => {
    setCriminalCases((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCriminalCase = (id, field, value) => {
    setCriminalCases((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={addCriminalCase}
        className="flex items-center gap-2 text-sm font-bold text-blue-600"
      >
        <Plus size={16} /> Add Criminal Case
      </button>

      {criminalCases.length === 0 && (
        <p className="text-sm text-zinc-500">
          No criminal cases declared.
        </p>
      )}

      {criminalCases.map((c, index) => (
        <div
          key={c.id}
          className="rounded-xl border border-zinc-200 p-4 bg-zinc-50"
        >
          <div className="flex justify-between mb-2">
            <h3 className="text-sm font-bold">
              Case #{index + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeCriminalCase(c.id)}
              className="text-xs text-red-600 font-bold"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            placeholder="Case ID / FIR Number"
            value={c.caseId}
            onChange={(e) =>
              updateCriminalCase(c.id, "caseId", e.target.value)
            }
            className="w-full mb-2 p-2 border rounded"
          />

          <textarea
            placeholder="Case details"
            value={c.caseDetails}
            onChange={(e) =>
              updateCriminalCase(c.id, "caseDetails", e.target.value)
            }
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handlePdfChange(e, index)}
            className="cursor-pointer"
          />

          {c.file && (
            <p className="text-xs text-green-600 mt-1">
              PDF selected
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CriminalCase;
