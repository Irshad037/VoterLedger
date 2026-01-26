import React from "react";
import { FileText, Upload, CheckCircle } from "lucide-react";

const FileUploadRow = ({ label, file, onUpload }) => {
  return (
    <div className="flex items-center justify-between p-3 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
      <div className="flex items-center gap-3">
        <FileText size={18} className="text-zinc-400" />
        <span className="text-sm font-medium text-zinc-700">
          {label}
        </span>

        {file && (
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
            <CheckCircle size={14} /> Uploaded
          </span>
        )}
      </div>

      <label className="cursor-pointer flex items-center gap-1.5 text-xs font-bold text-blue-600">
        <Upload size={14} />
        {file ? "Replace File" : "Upload File"}
        <input
          type="file"
          hidden
          onChange={(e) => onUpload(e.target.files[0])}
        />
      </label>
    </div>
  );
};

export default FileUploadRow;