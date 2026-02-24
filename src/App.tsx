import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseList from './test/H.tsx';
import  CreateLoginComponent from './auth/login.tsx'
import AttendanceScanner from './erm/attendance.tsx';
import EnrollmentMain from './erm/enrollment.tsx';
import { AttendanceSuccess } from "./erm/attendance.tsx";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './interface/home.tsx';
import Dashboard  from './auth/dashboard.tsx';
import Signup from './auth/signup.tsx';



const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/he" element={<CourseList/>} />
        <Route path="/login" element={<CreateLoginComponent/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/mark-attendance" element={<AttendanceScanner/>} />
        <Route path="/attendance-success" element={<AttendanceSuccess/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/enroll" element={<EnrollmentMain/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;