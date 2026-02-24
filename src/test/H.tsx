import { useEffect, useState } from "react";
 
interface Course {
  id: number;
  name: string;
  description: string;
  total_years: string;
  total_semesters: string;
  total_credits: string;
}

function CourseList() {
    const [courses, setCourses] = useState<Course[]> ([]);
    
    const fetchCourses = async () => {
        try {
            const response  = await fetch("http://127.0.0.1:8000/erp/courses/")
            const data = await response.json();
            setCourses(data.courses);
            console.log("Courses:", data.courses);

        }
        catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [])
    
    return (
        <div>
            <h1>Course List</h1>
            {/* <button onClick={fetchCourses}>Load Courses</button> */}
            {courses && (
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>{course.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CourseList;