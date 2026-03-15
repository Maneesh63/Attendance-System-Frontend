import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from '../interface/navbar.tsx';
// import Footer from "./footer.tsx";

interface Course {
  id: number;
  name: string;
  description: string;
  total_years: string;
  total_semesters: string;
  total_credits: string;
}

const EnrollmentMain = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]> ([]);
    const [formData, setFormData] = useState({
        course_id: "",
        full_name: "",
        date_of_birth: "",
        gender: "",
        address: "",
        institution_name: "",
        university: "",
        course: "",
        cgpa: "",
        alternate_mobile_number: "",
        mobile_number: "",
        mother_name: "",
        father_name: "",
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

    setFormData((prev) => ({
       ...prev,
       [name]: value,
         }));
       };
    

    const fetchCourses = async () => {
    
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/erp/courses/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }

      );
       
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
        const data = await response.json();
        setCourses(data.courses);
    }
    catch (error) {
      toast.error("Error fetching courses");
    }
   };

    useEffect(() => {
        fetchCourses();
    }, [])

    const handleEnrollment = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
               "http://127.0.0.1:8000/erp/enroll-student/",
               {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
               }
            );
            const data = await response.json();
            
            if (response.ok) {
                toast.success(data.message || "Enrollment successful");
                navigate("/", {
                    state: {
                        message: data.message,
                    },
                });
            }
            else {
                toast.error(data.error || "Enrollment failed");
            }
               }

        catch (error) {
            toast.error("Enrollment failed");
        }
    }

    return (
   <>
  <Navbar />

 <div className="bg-gray-100 min-h-screen mt-24 px-12 pb-12">

    <form onSubmit={handleEnrollment} className="space-y-16 pt-10">
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-8 border-b pb-3">
          Personal Details
        </h3>

        <div className="grid grid-cols-3 gap-10">

          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Mother Name</label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Father Name</label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

        </div>
      </div>

      {/* ================= ACADEMIC DETAILS ================= */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-8 border-b pb-3">
          Academic Details
        </h3>

        <div className="grid grid-cols-4 gap-10">

          <div>
            <label className="block mb-2 font-medium">University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Institution</label>
            <input
              type="text"
              name="institution_name"
              value={formData.institution_name}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">CGPA</label>
            <input
              type="text"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-2 bg-transparent"
            />
          </div>

        </div>
      </div>

      
      <div className="pt-10">
        <button
          type="submit"
          className="px-10 py-3 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Submit Enrollment
        </button>
      </div>

    </form>
  </div>
</>
  );
};

export default EnrollmentMain;