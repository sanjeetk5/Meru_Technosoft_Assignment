import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  invoiceNumber,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-200 w-full max-w-md p-7 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-100 text-red-700">
                <Trash2 size={22} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-gray-900">
                  Delete Invoice
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-700 font-semibold">
              Are you sure you want to delete invoice{" "}
              <span className="font-extrabold text-gray-900">
                {invoiceNumber}
              </span>
              ?
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="w-full py-3 rounded-2xl font-bold bg-red-600 text-white hover:bg-red-700 transition shadow"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
