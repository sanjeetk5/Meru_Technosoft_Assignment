import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-8">
      {/* Search */}
      <div className="flex items-center bg-white rounded-2xl px-5 py-3 shadow-sm w-[420px] border border-gray-200">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search invoices, customers..."
          className="ml-3 w-full outline-none text-gray-600 text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-100 transition">
          <Bell size={18} className="text-gray-600" />
        </button>

        <button className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold shadow hover:opacity-90 transition">
          Earn $90
        </button>

        <div className="w-11 h-11 rounded-2xl bg-gray-200 flex items-center justify-center font-bold text-gray-700">
          S
        </div>
      </div>
    </header>
  );
}
