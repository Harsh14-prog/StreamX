import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({data}) => {
    if (!data) return null;
  return (
    <div style={
        {
            backgroundImage : `linear-gradient(to bottom, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.7) 90%) ,url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
            backgroundPosition : "top" ,
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat",
        }
        } className=' w-full h-[65vh] text-white flex flex-col justify-end p-[6%]'>

            <h1 className='w-[70%] text-5xl font-black drop-shadow-md'>{data.name || data.original_name || data.original_title || data.title}</h1>
            <p className='w-[70%] mb-3 mt-3'>{data.overview.slice(0-200)}... <Link className='text-blue-400'>more</Link></p>

            <div className=''>
                <i className='ri-megaphone-fill text-yellow-500 drop-shadow-md'></i> {data.release_date || "No Information"}
                <i className='ri-album-fill text-yellow-500 ml-5 drop-shadow-md'></i> {data.media_type}
            </div>

            <Link className='p-2 bg-[#6556CD] mt-5 text-white inline-block w-fit rounded'>Play Trailer</Link>
         
    </div>
  )
}

export default Header