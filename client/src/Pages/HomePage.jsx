import React from 'react'
import HomeLayout from '../Layout/HomeLayout'
import { Link } from 'react-router-dom'
import HomePageImage from '../assets/homePageMainImage.png'

function HomePage() {
  return (
    <HomeLayout>
        <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
            <div className='w-1/2 space-y-6'>
               <h1 className="text-5xl font-semibold">
                 Find out best
                 <span className='text-yellow-500 font-bold'> Online Courses</span>
               </h1>
               <p className='text-xl text-gray-300'>
                we have large library of courses taught by highly skilled and Qualified faculty at affordable price
               </p>
               <div className='space-x-6'>

               <Link to='/courses'>
                  <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-400 transition-all ease-in-out'>
                    Explore Courses
                  </button>
               </Link>

               <Link to='/contact'>
                  <button className='border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-400 transition-all ease-in-out'>
                    Contact us
                  </button>
               </Link>
               </div>
            </div>
            <div className='w-1/2 flex items-center justify-center'>
                 <img src={HomePageImage} alt="Developer image" />
            </div>
        </div>
    </HomeLayout>
  )
}

export default HomePage
