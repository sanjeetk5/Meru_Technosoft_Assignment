import { useEffect, useState } from "react";
import {
  CreditCard,
  ArchiveRestore,
  Archive,
  FileText,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

import PaymentModal from "../components/PaymentModal";
import InvoiceSkeleton from "../components/InvoiceSkeleton";
import Toast from "../components/Toast";
import PaymentProgress from "../components/PaymentProgress";

import useCounter from "../hooks/useCounter";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchInvoiceDetails,
  addPayment,
  archiveInvoice,
  restoreInvoice,
} from "../redux/action/invoiceActions";

export default function InvoiceDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    invoice,
    lineItems,
    payments,
    total,
    amountPaid,
    balanceDue,
    error,
    paymentLoading,
    archiveLoading,
    restoreLoading,
  } = useSelector((state) => state.invoiceState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // ✅ HOOKS ALWAYS RUN (no conditional)
  const animatedTotal = useCounter(total || 0, 800);
  const animatedPaid = useCounter(amountPaid || 0, 800);
  const animatedBalance = useCounter(balanceDue || 0, 800);

  useEffect(() => {
    dispatch(fetchInvoiceDetails(id));
  }, [dispatch, id]);

  const formatDate = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2500);
  };

  // loading return safe now
  if (loading) return <InvoiceSkeleton />;

  if (!invoice) {
    return (
      <div className="text-gray-600 font-semibold">Invoice not found.</div>
    );
  }

  const currencySymbol =
    invoice.currency === "INR"
      ? "₹"
      : invoice.currency === "EUR"
      ? "€"
      : "$";

  const subtotal = invoice.subtotal || 0;
  const taxPercent = invoice.taxPercent || 0;
  const taxAmount = invoice.taxAmount || 0;

  const today = new Date();
  const dueDateObj = new Date(invoice.dueDate);

  let status = "DRAFT";
  if (balanceDue === 0) status = "PAID";
  else if (dueDateObj && today > dueDateObj) status = "OVERDUE";

  const handleArchiveToggle = async () => {
    if (invoice.isArchived) {
      await dispatch(restoreInvoice(invoice._id));
      showToast("Invoice restored successfully", "success");
    } else {
      await dispatch(archiveInvoice(invoice._id));
      showToast("Invoice archived successfully", "success");
    }
  };

  const handleModalAction = async (type, value) => {
    if (type === "input") setPaymentAmount(value);

    if (type === "submit") {
      const amt = Number(paymentAmount);

      if (!amt || amt <= 0) {
        showToast("Enter a valid payment amount", "error");
        return;
      }

      if (amt > balanceDue) {
        showToast("Overpayment not allowed!", "error");
        return;
      }

      await dispatch(addPayment(invoice._id, amt));

      showToast("Payment added successfully", "success");

      setPaymentAmount("");
      setIsModalOpen(false);
    }
  };

  // const handleDownloadPDF = async () => {
  //   try {
  //     setPdfLoading(true);

  //     const token = localStorage.getItem("token");

  //     const res = await fetch(
  //       `https://invoice-backend-1-i32j.onrender.com/api/invoices/${invoice._id}/pdf`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const blob = await res.blob();
  //     const url = window.URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `invoice-${invoice.invoiceNumber}.pdf`;
  //     link.click();

  //     window.URL.revokeObjectURL(url);

  //     showToast("PDF downloaded successfully", "success");
  //   } catch (err) {
  //     showToast("PDF download failed", "error");
  //   } finally {
  //     setPdfLoading(false);
  //   }
  // };

  
//   const handleDownloadPDF = async () => {
//   try {
//     setPdfLoading(true);

//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `https://invoice-backend-1-i32j.onrender.com/api/invoices/${invoice._id}/pdf`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     // ✅ Check if request failed
//     if (!res.ok) {
//       const errorText = await res.text();
//       console.log("PDF Download Error:", errorText);
//       showToast("PDF download failed (Server error)", "error");
//       return;
//     }

//     // ✅ Check if server is returning pdf
//     const contentType = res.headers.get("content-type");

//     if (!contentType || !contentType.includes("application/pdf")) {
//       const errorText = await res.text();
//       console.log("Not a PDF response:", errorText);
//       showToast("PDF download failed (Invalid response)", "error");
//       return;
//     }

//     const blob = await res.blob();

//     // ✅ If blob is too small, it means error pdf / corrupted
//     if (blob.size < 1000) {
//       showToast("PDF corrupted or empty", "error");
//       return;
//     }

//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `invoice-${invoice.invoiceNumber}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//     window.URL.revokeObjectURL(url);

//     showToast("PDF downloaded successfully", "success");
//   } catch (err) {
//     console.log("PDF download error:", err);
//     showToast("PDF download failed", "error");
//   } finally {
//     setPdfLoading(false);
//   }
// };

const handleDownloadPDF = async () => {
  try {
    setPdfLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://invoice-backend-1-i32j.onrender.com/api/invoices/${invoice._id}/pdf`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Check if request failed
    if (!res.ok) {
      const errorText = await res.text();
      console.log("PDF Download Error:", errorText);
      showToast("PDF download failed (Server error)", "error");
      return;
    }

    // ✅ Check if server is returning pdf
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/pdf")) {
      const errorText = await res.text();
      console.log("Not a PDF response:", errorText);
      showToast("PDF download failed (Invalid response)", "error");
      return;
    }

    const blob = await res.blob();

    // ✅ If blob is too small, it means error pdf / corrupted
    if (blob.size < 1000) {
      showToast("PDF corrupted or empty", "error");
      return;
    }

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

    showToast("PDF downloaded successfully", "success");
  } catch (err) {
    console.log("PDF download error:", err);
    showToast("PDF download failed", "error");
  } finally {
    setPdfLoading(false);
  }
};

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="space-y-8 relative">
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl font-semibold">
          {error}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Invoice Details
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage invoice items, payments and preview.
          </p>

          {invoice.isArchived && (
            <p className="text-red-500 text-sm font-bold mt-2">
              ⚠ This invoice is archived (read-only)
            </p>
          )}
        </div>

        <div className="flex gap-3 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={pdfLoading}
            onClick={handleDownloadPDF}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-semibold shadow-sm transition
            ${
              pdfLoading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Download size={18} />
            {pdfLoading ? "Generating..." : "Download PDF"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={archiveLoading || restoreLoading}
            onClick={handleArchiveToggle}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-semibold shadow-sm transition
            ${
              invoice.isArchived
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
            }
            ${
              archiveLoading || restoreLoading
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {invoice.isArchived ? (
              <>
                <ArchiveRestore size={18} />
                {restoreLoading ? "Restoring..." : "Restore"}
              </>
            ) : (
              <>
                <Archive size={18} />
                {archiveLoading ? "Archiving..." : "Archive"}
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={invoice.isArchived || paymentLoading}
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold shadow transition
            ${
              invoice.isArchived || paymentLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
            }`}
          >
            <CreditCard size={18} />
            {paymentLoading ? "Processing..." : "Add Payment"}
          </motion.button>
        </div>
      </div>

      {/* Main Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-1 xl:grid-cols-2 gap-7 transition ${
          invoice.isArchived ? "opacity-80" : ""
        }`}
      >
        {/* LEFT */}
        <div className="space-y-7">
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-7"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Invoice Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Basic invoice summary & customer details
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wide
                ${
                  status === "PAID"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : status === "OVERDUE"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-6 text-sm">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs">Invoice Number</p>
                <p className="font-bold text-gray-900 mt-1">
                  {invoice.invoiceNumber}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs">Customer</p>
                <p className="font-bold text-gray-900 mt-1">
                  {invoice.customerName}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs">Issue Date</p>
                <p className="font-bold text-gray-900 mt-1">
                  {formatDate(invoice.issueDate)}
                </p>
              </div>

              <div
                className={`rounded-2xl p-4 border shadow-sm
                ${
                  status === "OVERDUE"
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p className="text-gray-500 text-xs">Due Date</p>
                <p
                  className={`font-bold mt-1 ${
                    status === "OVERDUE" ? "text-red-700" : "text-gray-900"
                  }`}
                >
                  {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <PaymentProgress total={total || 0} paid={amountPaid || 0} />
          </motion.div>

          {/* Preview Totals */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-7"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Totals</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Subtotal</span>
                <span className="font-extrabold text-gray-900">
                  {currencySymbol}
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">
                  Tax ({taxPercent}%)
                </span>
                <span className="font-extrabold text-gray-900">
                  {currencySymbol}
                  {taxAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-500 font-semibold">Total</span>
                <span className="font-extrabold text-gray-900 text-lg">
                  {currencySymbol}
                  {animatedTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Paid</span>
                <span className="font-extrabold text-green-600">
                  {currencySymbol}
                  {animatedPaid.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 font-semibold">Balance Due</span>
                <span className="font-extrabold text-red-600">
                  {currencySymbol}
                  {animatedBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-7"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Invoice Items
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-gray-500 text-xs uppercase tracking-wider">
                  <th className="py-4 px-4 text-left">Description</th>
                  <th className="py-4 px-4 text-center">Qty</th>
                  <th className="py-4 px-4 text-center">Unit</th>
                  <th className="py-4 px-4 text-right">Total</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {lineItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {item.description}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      {currencySymbol}
                      {item.unitPrice}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900">
                      {currencySymbol}
                      {item.lineTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPayment={handleModalAction}
        balanceDue={balanceDue}
      />
    </div>
  );
}
