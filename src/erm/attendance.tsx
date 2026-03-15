import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../interface/navbar"; 
import { API_BASE_URL } from "../config/base.tsx";

const AttendanceScanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        console.log("QR Token:", decodedText);
        
        try {
          const token = localStorage.getItem("token");
          console.log("Using token:", token);
          const response = await fetch(
            `${API_BASE_URL}/attendance/mark-attendance/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({
                qr_token: decodedText,
              }),
            }
          );

          const data = await response.json();
          if (response.ok) {
           await scanner.clear();
           toast.success(data.message);

           navigate("/attendance-success", {
              state: {
                message: data.message,
                date: data.date,
              },
            });
          }
          else {
            toast.error(data.error || "Failed to mark attendance");
          }
        } 

        catch (err) {
          toast.error("An error occurred while marking attendance.");
        }
      },
      (error) => {
        
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <>
      <Navbar />
    <div>
      <h2>Scan QR to Mark Attendance</h2>
      <div id="qr-reader" style={{ width: "300px" }} />
    </div>
    </>
  );
};

export default AttendanceScanner;

const AttendanceSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>  
      <Navbar />
    <div>
      <h1>{state?.message || "Attendance marked!"}</h1>
      <p>Date: {state?.date}</p>
      <p>Redirecting to home...</p>
    </div>
    </>
  );
};

export { AttendanceSuccess };