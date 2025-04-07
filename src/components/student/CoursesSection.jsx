import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3' >Discover our top-rated courses across various categories. From coding and design <br /> to business and wellness, our courses are crafted to deliver results.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8 my-8 md:my-16">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

    
      <Link to={'/course-list'} onClick={() => scrollTo(0,0)} className='text-gray-600 border border-gray-500/80 px-10 py-3 rounded'>Show all courses</Link>
    </div>
  )
}

export default CoursesSection