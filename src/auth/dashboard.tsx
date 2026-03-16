import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar  from "../interface/navbar";
import { API_BASE_URL } from "../config/base.tsx";

interface UserData {
  username: string;
  email: string;
  role: string;
  message?: string;
  qr_code_url?: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/dashboard/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const result = await response.json();
        console.log("User Data:", result);
        setUserData(result);
        toast.success("User data fetched successfully");
      } catch (error) {
        toast.error("Session expired. Please login again");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);  

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {!userData ? (
        <p>Loading...</p>
      ) : (
        <>
         <h2>Name: {userData ? userData.username : "User"}</h2>
          <h2>Email: {userData.email}</h2>
          <h2>Role: {userData.role}</h2>
          <h2>
              QR-Code: 
              <a href={userData.qr_code_url} target="_blank" rel="noopener noreferrer">
              View QR
              </a>
            </h2>
          {userData.qr_code_url && (
            <img src={userData.qr_code_url} alt="QR Code" />
          )}
        </>
      )}
    </div>
    </>
  );
};

export default Dashboard;
