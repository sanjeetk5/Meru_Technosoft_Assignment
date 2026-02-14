import { motion } from "framer-motion";

export default function PaymentProgress({ total, paid }) {
  const percent = total === 0 ? 0 : Math.min((paid / total) * 100, 100);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-bold text-gray-900">Payment Progress</p>
        <p className="text-sm font-extrabold text-gray-900">
          {percent.toFixed(0)}%
        </p>
      </div>

      <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
        />
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Paid{" "}
        <span className="font-bold text-gray-900">
          {paid.toFixed(2)}
        </span>{" "}
        out of{" "}
        <span className="font-bold text-gray-900">
          {total.toFixed(2)}
        </span>
      </p>
    </div>
  );
}
