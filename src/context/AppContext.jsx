import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();


    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Fetch all Courses
    const fetchAllCourses = async() => {
        setAllCourses(dummyCourses);
    }

    // Function to calculate average rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }

        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })

        return totalRating / course.courseRatings.length;
    }

    // Function to calculate Course Chapter Time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.forEach(lecture => time += lecture.lectureDuration);
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };
    
    

    // Function to calculate Course duration
    const calculateCourseDuration = (course) => {
        if (!course || !course.courseContent) return "0m"; // Prevent errors
    
        let time = 0;
        
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                chapter.chapterContent.forEach(lecture => {
                    time += lecture.lectureDuration;
                });
            }
        });
    
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };
    

    // Function to calculate to Number of lectures in a course
    const calculateNumberOfLectures = (course) => {
        let numberOfLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                numberOfLectures += chapter.chapterContent.length;
            }}
        );
        return numberOfLectures;
    }

    // Fetch user enrolled courses
    const fetchUserEnrolledCourses = async() => {
        setEnrolledCourses(dummyCourses)
    }
    useEffect(() => {
        fetchAllCourses();
        fetchUserEnrolledCourses();
    },[])

    const value = {
        currency,
        allCourses, setAllCourses, 
        navigate,  calculateRating,
        isEducator, setIsEducator,
        calculateChapterTime, calculateCourseDuration, calculateNumberOfLectures,
        enrolledCourses, fetchUserEnrolledCourses,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

