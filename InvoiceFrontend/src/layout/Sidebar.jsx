import { NavLink, useNavigate } from "react-router-dom";
import { FileText, LayoutDashboard, PlusCircle, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/authActions";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authState);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen px-6 py-8 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Invoice<span className="text-green-600">Pro</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Invoice & Payments Module
        </p>
      </div>

      {/* User */}
      {user && (
        <div className="mb-6 bg-gray-50 border border-gray-200 rounded-2xl p-4">
          <p className="text-xs text-gray-500 font-bold">Logged in as</p>
          <p className="text-sm font-extrabold text-gray-900 mt-1">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">{user.email}</p>
        </div>
      )}

      {/* Create Invoice Button */}
      <button
        onClick={() => navigate("/invoices/create")}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow hover:opacity-90 transition mb-8"
      >
        <PlusCircle size={18} />
        New Invoice
      </button>

      {/* Links */}
      <div className="flex flex-col gap-3">
        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition ${
              isActive
                ? "bg-green-100 text-green-700 border border-green-200"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FileText size={18} />
          Invoices
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition ${
              isActive
                ? "bg-green-100 text-green-700 border border-green-200"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-red-600 hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
