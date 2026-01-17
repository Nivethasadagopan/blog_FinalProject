import React from 'react'
//import Navbar from './common/Navbar'
import BlogProfileImage from "../assets/Blog Website Design.jpg"
import CSS from "../assets/css-3.png"
import HTML from "../assets/html.png"
import DB from "../assets/data-server.png"
import JS from "../assets/js.png"
import REACTICON from "../assets/physics.png"
import NODE from "../assets/node-js.png"
//import P1 from "../assets/p1.jpg"
//import P2 from "../assets/p2.png"
//import P3 from "../assets/p3.png"
import MovieApp from "../assets/MovieApp.png"
import TaskManagementApp from "../assets/TaskManagementApp.png"
import WeatherApp from "../assets/WeatherApp.png"
import BlogImage from "../assets/blogImage.png"
import { useNavigate } from 'react-router-dom';
import Footer from './common/Footer'
import { useAuth } from '../context/AuthContext';

function Home() {
    const navigate = useNavigate()
    const { user } = useAuth(); // logged-in user

    const projects = [
    {
        title: "Movie App",
        image: MovieApp,
        link: "https://movie-app-tmdb-jet.vercel.app/"
    },
    {
        title: "Task Management App",
        image: TaskManagementApp,
        link: "https://task-management-app-sigma-cyan.vercel.app/"
    },
    {
        title: "Weather App",
        image: WeatherApp,
        link: "https://weather-app-ten-phi-14.vercel.app/"
    }


];


    return (
        <div>

            {/* HERO SECTION */}
            <div className='flex items-center justify-center'>
                <div className="w-full sm:w-1/2 flex-col justify-center">
                    <h2 className='text-3xl md:text-6xl font-bold pb-2'>Hi! I Am</h2>

                    <h2 className='text-4xl md:text-7xl font-bold text-orange-400 py-2'>
                        {user?.displayName || user?.email?.split("@")[0] || "Guest User"}
                    </h2>

                    <img src={BlogProfileImage} className='w-60 block sm:hidden' alt="Profile" />

                    <p className='py-2'>
                        I design and develop clean, modern, and user‑friendly websites.  
                        Explore my work — I focus on quality, creativity, and performance.  
                        You can try my services for 7 days before making a decision.
                    </p>

                    <a 
  href="/Nivetha-Sadagopan-CV.pdf" 
  target="_blank" 
  rel="noopener noreferrer"
  className="button-style mt-2"
>
  Hire Me
</a>

                </div>

                <div className='justify-center hidden sm:block'>
                    <img src={BlogProfileImage} className='w-60 md:w-96' alt="Profile" />
                </div>
            </div>

            {/* SKILLS ICONS */}
            <div className='flex justify-evenly py-6'>
                <img src={HTML} style={{ width: "50px" }} alt="HTML" />
                <img src={CSS} style={{ width: "50px" }} alt="CSS" />
                <img src={JS} style={{ width: "50px" }} alt="JavaScript" />
                <img src={REACTICON} style={{ width: "50px" }} alt="React" />
                <img src={DB} style={{ width: "50px" }} alt="Database" />
                <img src={NODE} style={{ width: "50px" }} alt="Node.js" />
            </div>

            {/* SERVICES + EXPERIENCE */}
            <div className='flex flex-col mt-10 items-center justify-around sm:flex-row'>
                <div className='flex-col'>
                    <div className='mt-4 border-[6px] rounded-lg border-purple-500 p-5 border-t-0 w-60 flex-col items-center'>
                        <div className='rounded-full border-2 p-5 font-bold text-white text-center bg-gradient-to-br from-purple-200 to-purple-600'>6</div>
                        <p className='text-center font-medium'>Projects Completed</p>
                    </div>

                    <div className='mt-4 border-[6px] rounded-lg border-green-500 p-5 border-t-0 w-60 flex-col items-center'>
                        <div className='rounded-full border-2 p-5 font-bold text-white text-center bg-gradient-to-br from-green-200 to-green-600'>6</div>
                        <p className='text-center font-medium'>Months of Experience</p>
                    </div>
                </div>

                <div className='ml-4 mt-4 sm:mt-0'>
                    <h2 className='text-3xl sm:text-7xl font-bold'>My Awesome</h2>
                    <h2 className='text-3xl sm:text-7xl font-bold text-orange-400'>Services</h2>

                    <p className='my-2'>
                        I’ve attached my resume for your reference.  
                        Feel free to explore my skills, experience, and completed projects.
                    </p>

                    <a 
  href="/Nivetha-Sadagopan-CV.pdf" 
  download 
  className="button-style mt-2"
>
  Download CV
</a>

                </div>
            </div>

            {/* PROJECTS SECTION */}
            <div>
                <h2 className='text-center text-5xl my-14 font-bold'>
                    Check Out My Live <span className='text-orange-400'>Projects</span>
                </h2>

                <div className='flex justify-around my-5 flex-col sm:flex-row gap-6'>

    {projects.map((project, index) => (
        <div 
            key={index} 
            className='w-64 border rounded-lg shadow-md p-3 cursor-pointer hover:shadow-xl transition'
            onClick={() => window.open(project.link, "_blank")}
        >
            <img 
                src={project.image} 
                className='w-full h-40 object-cover rounded-md' 
                alt={project.title} 
            />

            <h3 className='text-xl font-semibold mt-3 text-center'>
                {project.title}
            </h3>

            <p className='text-center text-sm text-gray-500'>
                Link here →
            </p>
        </div>
    ))}

</div>

            </div>

            {/* BLOG SECTION */}
            <div className='flex items-center justify-center my-14'>
                <div className='justify-center hidden sm:block'>
                    <img src={BlogImage} className='w-60 md:w-96' alt="Blog" />
                </div>

                <div className="w-full sm:w-1/2 flex-col justify-center ml-6">
                    <h2 className='text-3xl md:text-6xl font-bold pb-2'>I Love Writing</h2>
                    <h2 className='text-4xl md:text-7xl font-bold text-orange-400 py-2'>Tech Blogs</h2>

                    <p className='py-2'>
                        Want to know more about my work and learning journey?  
                        I share insights, experiences, and tutorials through my blogs.
                    </p>

                    <button className='button-style mt-2' onClick={() => navigate("/blogs")}>
                        Read My Blogs
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home
