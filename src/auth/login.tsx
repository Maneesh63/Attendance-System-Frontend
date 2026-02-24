import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../interface/navbar.tsx";

interface LoginResponse {
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: LoginResponse = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        toast.success(result.message || "Login successful");
        navigate("/");
      } else {
        toast.error(result.message || "Invalid credentials");
        setError(result.message);
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

        {/* Right Login Form */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">
            Please login to continue
          </p>

          <form onSubmit={login} className="space-y-4">
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

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer font-medium ml-1"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>

    </>
  );
};

export default CreateLoginComponent;
