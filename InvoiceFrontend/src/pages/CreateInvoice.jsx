import { useState } from "react";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../redux/action/invoiceActions";
import { useNavigate } from "react-router-dom";

export default function CreateInvoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createLoading, createError } = useSelector(
    (state) => state.invoiceState
  );

  const [invoiceNumber, setInvoiceNumber] = useState("INV-" + Date.now());
  const [customerName, setCustomerName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  // NEW
  const [currency, setCurrency] = useState("USD");
  const [taxPercent, setTaxPercent] = useState(0);

  const [lineItems, setLineItems] = useState([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const handleAddItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...lineItems];
    updated.splice(index, 1);
    setLineItems(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
  };

  const calculateLineTotal = (item) => {
    return Number(item.quantity) * Number(item.unitPrice);
  };

  const subtotal = lineItems.reduce(
    (sum, item) => sum + calculateLineTotal(item),
    0
  );

  const taxAmount = (subtotal * Number(taxPercent)) / 100;
  const total = subtotal + taxAmount;

  const currencySymbol = currency === "INR" ? "₹" : currency === "EUR" ? "€" : "$";

  const handleSubmit = async () => {
    if (!customerName || !issueDate || !dueDate) {
      alert("Please fill all invoice fields");
      return;
    }

    if (lineItems.length === 0) {
      alert("Add at least one line item");
      return;
    }

    for (let item of lineItems) {
      if (!item.description || item.quantity <= 0 || item.unitPrice <= 0) {
        alert("Line item fields invalid");
        return;
      }
    }

    const payload = {
      invoiceNumber,
      customerName,
      issueDate,
      dueDate,
      currency,
      taxPercent,
      lineItems,
    };

    const created = await dispatch(createInvoice(payload));

    if (created) {
      navigate(`/invoices/${created._id}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start flex-col md:flex-row gap-4">
        <div>
          <button
            onClick={() => navigate("/invoices")}
            className="flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-900 transition"
          >
            <ArrowLeft size={18} />
            Back to Invoices
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">
            Create Invoice
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill details and generate a new invoice.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={createLoading}
          className={`px-6 py-3 rounded-2xl font-bold shadow transition
          ${
            createLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
          }`}
        >
          {createLoading ? "Creating..." : "Create Invoice"}
        </button>
      </div>

      {/* Error */}
      {createError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-2xl font-semibold">
          {createError}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        {/* LEFT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-7 space-y-6"
        >
          <h2 className="text-lg font-bold text-gray-900">
            Invoice Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-500">
                Invoice Number
              </label>
              <input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500">
                Customer Name
              </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500">
                Issue Date
              </label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="text-xs font-bold text-gray-500">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            {/* Tax */}
            <div>
              <label className="text-xs font-bold text-gray-500">
                Tax %
              </label>
              <input
                type="number"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                placeholder="Tax %"
                className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Line Items</h2>

            <button
              onClick={handleAddItem}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
            >
              <Plus size={18} />
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-3xl p-5 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-gray-900">
                    Item {index + 1}
                  </p>

                  {lineItems.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <input
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="border border-gray-200 rounded-2xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-green-400"
                  />

                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    placeholder="Qty"
                    className="border border-gray-200 rounded-2xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-green-400"
                  />

                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                    placeholder="Unit Price"
                    className="border border-gray-200 rounded-2xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <p className="text-sm font-bold text-gray-700 mt-4 text-right">
                  Line Total: {currencySymbol}{calculateLineTotal(item)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-7"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Invoice Preview
          </h2>

          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-7 space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Invoice
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                Invoice No:{" "}
                <span className="font-bold text-gray-900">{invoiceNumber}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <p className="text-gray-500 text-xs">Customer</p>
                <p className="font-bold text-gray-900 mt-1">
                  {customerName || "—"}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <p className="text-gray-500 text-xs">Due Date</p>
                <p className="font-bold text-gray-900 mt-1">
                  {dueDate || "—"}
                </p>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold">Subtotal</span>
                <span className="text-gray-900 font-extrabold">
                  {currencySymbol}{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-semibold">
                  Tax ({taxPercent}%)
                </span>
                <span className="text-gray-900 font-extrabold">
                  {currencySymbol}{taxAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm border-t pt-3">
                <span className="text-gray-500 font-semibold">Total</span>
                <span className="text-gray-900 font-extrabold text-lg">
                  {currencySymbol}{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
