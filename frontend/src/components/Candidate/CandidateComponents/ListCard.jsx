import React ,{ useState } from "react";
import { Edit3, Trash2, Check, X } from "lucide-react";

const ListCard = ({
  title,
  subtitle,
  date,
  icon,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title, subtitle, date });

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-4 w-full">

        {/* ICON */}
        <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center">
          {icon}
        </div>

        {/* CONTENT */}
        {!isEditing ? (
          <div className="flex-1">
            <h4 className="text-sm font-bold">{title}</h4>
            <p className="text-xs text-zinc-500">
              {subtitle} • {date}
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-2">
            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
            <input
              value={editData.subtitle}
              onChange={(e) =>
                setEditData({ ...editData, subtitle: e.target.value })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
            <input
              value={editData.date}
              onChange={(e) =>
                setEditData({ ...editData, date: e.target.value })
              }
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 ml-4">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-zinc-400 hover:text-blue-600"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-zinc-400 hover:text-rose-600"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="p-2 text-green-600"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-zinc-500"
            >
              <X size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ListCard;
