import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Ellipsis } from "lucide-react";

export default function ContextMenu({ onEdit, onDelete, editable }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Ellipsis className="text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in-down">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className={`w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg transition ${editable ? "":"hidden"}`}
          >
            <Pencil className="w-4 h-4 text-blue-600" />
            Éditer
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-700 hover:bg-red-50 rounded-b-lg transition"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
