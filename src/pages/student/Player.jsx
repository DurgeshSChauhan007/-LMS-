import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const course = enrolledCourses.find(course => course._id === courseId);
    if (course) {
      setCourseData(course);
    }
  }, [enrolledCourses, courseId]);

  const toggleSection = (index) => {
    setOpenSection(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
    <div className='p-4 sm:p-10 flex flex-col md:grid md:grid-cols-2 gap-10 md:px-36'>
      {/* Left column */}
      <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>
        <div className='pt-5'>
          {courseData && courseData.courseContent.map((chapter, index) => (
            <div key={index} className='border border-gray-300 bg-white mb-2 rounded-lg'>
              <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                <div className='flex items-center gap-2'>
                  <img className={`transition-transform ${openSection[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt='arrow icon' />
                  <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                </div>
                <p className='text-sm md:text-base'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-screen' : 'max-h-0'}`}>
                <ul className='list-disc md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <li key={lectureIndex} className='flex items-start gap-2 py-1'>
                      <img src={false ? assets.blue_tick_icon : assets.play_icon} alt='play icon' className='w-4 h-4 mt-1' />
                      <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-base'>
                        <p className='text-sm'>{lecture.lectureTitle}</p>
                        <div className='flex gap-2'>
                          {lecture.lectureUrl && (
                            <p onClick={() => setPlayerData({
                              ...lecture, chapter: index + 1, lecture: lectureIndex + 1
                            })} className='text-blue-500 cursor-pointer'>Watch</p>
                          )}
                          <p className='text-sm'>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-2 py-3 mt-10'>
          <h1 className='text-xl font-bold'>Rate this Course:</h1>
          <Rating initialRating={0}/>
        </div>
      </div>

      {/* Right column */}
      <div className='md:mt-10'>
        {playerData ? (
          <div>
            <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video' />
            <div className='flex justify-between items-center mt-1'>
              <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
              <button className='text-blue-600'>{false ? 'Completed' : 'Mark Completed'}</button>
            </div>
          </div>
        ) : (
          <img src={courseData ? courseData.courseThumbnail : ''} alt='' className='w-full h-72 object-cover rounded-lg' />
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Player;