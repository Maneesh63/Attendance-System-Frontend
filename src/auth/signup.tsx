import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../interface/navbar.tsx";
import { API_BASE_URL } from "../config/base.tsx";

interface SignupResponse {
  message: string;
  token: string;
  token_type: string;
  user_id: string;
  role: string;
}

const CreateLoginComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: SignupResponse = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);

        await fetch(`${API_BASE_URL}/attendance/create-attendance/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${result.token}`
            }
          });
        toast.success(result.message || "Signup successful");
        navigate("/");
      } 

    } catch (err: any) {
      toast.error("Something went wrong");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">

        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-10">
          <h1 className="text-3xl font-bold mb-4">S.T. HINDU COLLEGE</h1>
          <p className="text-blue-100 leading-relaxed">
            Access your courses, dashboard, and academic resources
            in one place.
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome</h2>
          <p className="text-gray-600 mb-6">
            Please register to continue
          </p>

          <form onSubmit={signup} className="space-y-4">

             <div>
              <label className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleOnChange}
                placeholder="9999999999"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1">
                 Role
              </label>
            <select name="role" onChange={handleOnChange} value={formData.role}>
              <option value="student">Student</option>
             <option value="teacher">Teacher</option>
            </select>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer font-medium ml-1"
            >
                Login
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateLoginComponent;
