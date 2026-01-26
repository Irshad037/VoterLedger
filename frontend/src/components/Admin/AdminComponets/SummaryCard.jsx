import React from "react";

const SummaryCard = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border-2 border-zinc-300 border-b-5 border-b-blue-600">
      <p className="text-xl font-bold">{title}</p>
      <p className="mt-2 text-3xl font-bold text-blue-700 text-center">
        {value}
      </p>
    </div>
  );
};

export default SummaryCard;
