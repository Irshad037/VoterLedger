import React from "react";

const InputField = ({ label, value, onChange, type = "text", icon }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-zinc-500 uppercase">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
      />
    </div>
  </div>
);


export default InputField;