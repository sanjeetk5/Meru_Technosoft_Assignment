import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  FileText,
  Archive,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, fetchInvoiceList } from "../redux/action/invoiceActions";
import { useNavigate } from "react-router-dom";

import InvoiceListSkeleton from "../components/InvoiceListSkeleton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Toast from "../components/Toast";

export default function InvoiceList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { invoices, loading, error, deleteLoading } = useSelector(
    (state) => state.invoiceState
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("LATEST");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    dispatch(fetchInvoiceList());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter, sort]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2500);
  };

  const getStatus = (invoice) => {
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);

    if (invoice.isArchived) return "ARCHIVED";
    if (invoice.balanceDue === 0) return "PAID";
    if (dueDate && today > dueDate) return "OVERDUE";
    return "DRAFT";
  };

  const currencySymbol = (currency) => {
    if (currency === "INR") return "₹";
    if (currency === "EUR") return "€";
    return "$";
  };

  const filteredInvoices = useMemo(() => {
    let data = invoices ? [...invoices] : [];

    if (search.trim() !== "") {
      data = data.filter((inv) => {
        return (
          inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
          inv.customerName.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (filter !== "ALL") {
      data = data.filter((inv) => getStatus(inv) === filter);
    }

    if (sort === "LATEST") {
      data.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
    }

    if (sort === "OLDEST") {
      data.sort((a, b) => new Date(a.issueDate) - new Date(b.issueDate));
    }

    if (sort === "TOTAL_HIGH") {
      data.sort((a, b) => b.total - a.total);
    }

    if (sort === "BALANCE_HIGH") {
      data.sort((a, b) => b.balanceDue - a.balanceDue);
    }

    if (sort === "CUSTOMER_AZ") {
      data.sort((a, b) => a.customerName.localeCompare(b.customerName));
    }

    return data;
  }, [invoices, search, filter, sort]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredInvoices.slice(startIndex, endIndex);
  }, [filteredInvoices, currentPage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  const filterButtonClass = (active) =>
    `px-5 py-2 rounded-full text-sm font-bold border transition shadow-sm
     ${
       active
         ? "bg-gray-900 text-white border-gray-900"
         : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
     }`;

  const generatePageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  const handleDeleteClick = (invoice, e) => {
    e.stopPropagation();
    setSelectedInvoice(invoice);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedInvoice) return;

    await dispatch(deleteInvoice(selectedInvoice._id));

    showToast("Invoice deleted successfully", "success");

    setShowDeleteModal(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="space-y-7">
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Invoices
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View, manage and track your invoices.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/invoices/create")}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow transition bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
        >
          <Plus size={18} />
          Create Invoice
        </motion.button>
      </div>

      {/* Search + Filters + Sort */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice number or customer name..."
            className="w-full border border-gray-200 rounded-2xl pl-11 pr-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFilter("ALL")}
              className={filterButtonClass(filter === "ALL")}
            >
              All
            </button>

            <button
              onClick={() => setFilter("DRAFT")}
              className={filterButtonClass(filter === "DRAFT")}
            >
              Draft
            </button>

            <button
              onClick={() => setFilter("PAID")}
              className={filterButtonClass(filter === "PAID")}
            >
              Paid
            </button>

            <button
              onClick={() => setFilter("OVERDUE")}
              className={filterButtonClass(filter === "OVERDUE")}
            >
              Overdue
            </button>

            <button
              onClick={() => setFilter("ARCHIVED")}
              className={filterButtonClass(filter === "ARCHIVED")}
            >
              Archived
            </button>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm font-bold text-gray-500">Sort By:</p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-5 py-3 rounded-2xl border border-gray-200 bg-white font-bold text-gray-700 outline-none focus:ring-2 focus:ring-green-400 shadow-sm cursor-pointer"
            >
              <option value="LATEST">Latest</option>
              <option value="OLDEST">Oldest</option>
              <option value="TOTAL_HIGH">Highest Total</option>
              <option value="BALANCE_HIGH">Highest Balance Due</option>
              <option value="CUSTOMER_AZ">Customer Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl font-semibold">
          {error}
        </div>
      )}

      {/* Skeleton */}
      {loading && <InvoiceListSkeleton />}

      {/* Cards */}
      {!loading && paginatedInvoices.length > 0 && (
        <>
          <motion.div
            variants={containerVariants}
            initial="visible"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {paginatedInvoices.map((inv) => {
              const status = getStatus(inv);
              const symbol = currencySymbol(inv.currency);

              return (
                <motion.div
                  key={inv._id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/invoices/${inv._id}`)}
                  className="cursor-pointer bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition p-6"
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="text-xs text-gray-500 font-bold">
                        Invoice No
                      </p>
                      <p className="text-lg font-extrabold text-gray-900 mt-1">
                        {inv.invoiceNumber}
                      </p>
                    </div>

                    {/* Status + Delete */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wide flex items-center gap-2
                        ${
                          status === "PAID"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : status === "OVERDUE"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : status === "ARCHIVED"
                            ? "bg-gray-200 text-gray-700 border border-gray-300"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {status === "PAID" && <CheckCircle size={14} />}
                        {status === "OVERDUE" && <Clock size={14} />}
                        {status === "ARCHIVED" && <Archive size={14} />}
                        {status === "DRAFT" && <FileText size={14} />}
                        {status}
                      </span>

                      <button
                        disabled={deleteLoading}
                        onClick={(e) => handleDeleteClick(inv, e)}
                        className="p-2 rounded-full hover:bg-red-50 text-red-500 transition border border-gray-200 bg-white shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Customer */}
                  <div className="mt-5">
                    <p className="text-xs text-gray-500 font-bold">Customer</p>
                    <p className="font-extrabold text-gray-900 mt-1">
                      {inv.customerName}
                    </p>
                  </div>

                  {/* Totals */}
                  <div className="mt-6 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-semibold">Total</span>
                      <span className="font-extrabold text-gray-900">
                        {symbol}
                        {inv.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3">
                      <span className="text-gray-500 font-semibold">Paid</span>
                      <span className="font-extrabold text-green-600">
                        {symbol}
                        {inv.amountPaid.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3">
                      <span className="text-gray-500 font-semibold">
                        Balance Due
                      </span>
                      <span className="font-extrabold text-red-600">
                        {symbol}
                        {inv.balanceDue.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
              <p className="text-sm font-bold text-gray-500">
                Page{" "}
                <span className="text-gray-900">{currentPage}</span> of{" "}
                <span className="text-gray-900">{totalPages}</span>
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-2 transition
                  ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                {generatePageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-xl font-extrabold border transition
                    ${
                      currentPage === page
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-2 transition
                  ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        invoiceNumber={selectedInvoice?.invoiceNumber}
      />
    </div>
  );
}
