import { Link, useNavigate } from "react-router-dom";
import { getToken, getUserName, removeToken } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
  const userName = getUserName();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="bg-linear-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">CourtBooking</h1>
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="px-3 py-1 bg-gray-800 bg-opacity-20 rounded-full hover:bg-opacity-40 transition"
          >
            Home
          </Link>
          {token && (
            <Link
              to="/bookings"
              className="px-3 py-1 bg-gray-800 bg-opacity-20 rounded-full hover:bg-opacity-40 transition"
            >
              My Bookings
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1 bg-gray-800 bg-opacity-20 rounded-full hover:bg-opacity-40 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-gray-800 bg-opacity-20 rounded-full hover:bg-opacity-40 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-red bg-opacity-20 px-3 py-1 rounded-full">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                  {userName[0].toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition text-white"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
