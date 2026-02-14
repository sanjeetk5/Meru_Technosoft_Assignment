import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

export default function Toast({
  show,
  message,
  type = "success",
  duration = 2500,
}) {
  const toastStyle = () => {
    if (type === "success") return "bg-green-600 text-white";
    if (type === "error") return "bg-red-600 text-white";
    return "bg-gray-900 text-white";
  };

  const progressStyle = () => {
    if (type === "success") return "bg-green-300";
    if (type === "error") return "bg-red-300";
    return "bg-gray-300";
  };

  const icon = () => {
    if (type === "success") return <CheckCircle size={18} />;
    if (type === "error") return <XCircle size={18} />;
    return <Info size={18} />;
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 180,
              damping: 18,
            },
          }}
          exit={{
            opacity: 0,
            y: -25,
            scale: 0.9,
            transition: { duration: 0.2 },
          }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-xl flex flex-col gap-2 font-bold ${toastStyle()} z-[9999] min-w-[320px] overflow-hidden`}
        >
          {/* Toast Content */}
          <div className="flex items-center gap-3">
            {icon()}
            <span className="text-sm">{message}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`h-full ${progressStyle()}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
