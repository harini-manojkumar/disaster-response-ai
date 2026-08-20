import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Lightweight modal used for the mission detail view — keeps Relay
// at 4 top-level pages (per spec) while still allowing drill-down.
export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-navy-800 border border-navy-600 rounded-t-card sm:rounded-card w-full sm:max-w-lg max-h-[85vh] overflow-y-auto shadow-card"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy-600 sticky top-0 bg-navy-800">
              <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-navy-700 text-slate-400"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
