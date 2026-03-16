import Navbar from "./navbar.tsx";
import Footer from "./footer.tsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/base.tsx";


interface Course {
  id: number;
  name: string;
  description: string;
  total_years: string;
  total_semesters: string;
  total_credits: string;
}

function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("API URL direct:", import.meta.env.VITE_API_URL);
    console.log("API URL from config:", API_BASE_URL);
    console.log("ENV OBJECT:", import.meta.env);
    const fetchCourses = async () => {
      try {
        console.log("API URL direct:", import.meta.env.VITE_API_URL);
        console.log("ENV OBJECT:", import.meta.env);
        const response = await fetch(`${API_BASE_URL}/erp/courses/`);
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

   const downloadQr = async () => {
    try{
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/attendance/create-attendance/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      }
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error || "Failed to create attendance");
      throw new Error("Failed to create attendance");
    }

     
    toast.success(data.message || "QR code generated successfully!");
    const link = document.createElement("a");
    link.href = data.qr_image_url;    
    link.download = "attendance_qr.png"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Error downloading QR:", error);
  }
};
       
         

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="px-6 py-24 text-center bg-gradient-to-br from-blue-50 to-white mt-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-600">S.T. HINDU COLLEGE</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Empowering students with quality education and practical skills
          for a successful future.
        </p>
      </section>

      <div className="text-center my-12">
        <button
         onClick={() => navigate("/mark-attendance")}
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Scan your Attendance QR Code
        </button>
      </div>
      
      <section className="px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Courses
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                
                <div className="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg mb-4 font-bold text-lg">
                  {course.name.charAt(0)}
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {course.name}
                </h3>

                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>

                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <p>🎓 Years: {course.total_years}</p>
                  <p>📘 Semesters: {course.total_semesters}</p>
                  {/* <p>⭐ Credits: {course.total_credits}</p> */}
                </div>

                {/* <button className="text-blue-600 font-medium hover:underline">
                  View details →
                </button> */}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">
          About Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          MyCollege is committed to academic excellence and holistic
          development of students through modern teaching methods.
        </p>
      </section>

      <Footer />
    </>
  );
}

export default Home;
