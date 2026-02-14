import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PaymentModal({
  isOpen,
  onClose,
  onAddPayment,
  balanceDue,
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

            <h2 className="text-xl font-extrabold text-gray-900">
              Add Payment
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Balance Due:{" "}
              <span className="font-bold text-gray-900">{balanceDue}</span>
            </p>

            <input
              type="number"
              placeholder="Enter payment amount"
              onChange={(e) => onAddPayment("input", e.target.value)}
              className="mt-6 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={() => onAddPayment("submit")}
              className="mt-6 w-full py-4 rounded-2xl font-bold shadow transition bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
            >
              Add Payment
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
