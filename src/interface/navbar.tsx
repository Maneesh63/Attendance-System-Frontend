import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/utils.tsx";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
   <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
   <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
     
      <Link to="/" className="text-xl font-bold text-blue-800">
        S.T. HINDU COLLEGE
      </Link>

      <div className="space-x-4">
        {!loggedIn ? (
          <>
            <Link
              to="/login"
           className="text-gray-700 hover:text-black hover:font-bold transition"

            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white bg-blue-600 rounded"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text bg-red-500 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
