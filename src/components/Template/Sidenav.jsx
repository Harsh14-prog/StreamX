import axios from '../../Utils/Axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {

 
  return (
    <div className='w-[20%] h-screen border-r-2 border-zinc-400 p-8'>

      <h1 className='text-2xl text-white font-bold'>

        <i className="ri-tv-fill text-[#6556CD] mr-2 "></i>
        <span>StreamX</span>

      </h1>

      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>

        <h1 className='text-white font-semibold text-xl mt-6 mb-4'>New Feeds</h1>

        <Link to='/trending' className='hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300'>

          <i className="ri-fire-fill mr-1 text-xl"></i> Trending

        </Link>

        <Link to = "/popular"  className='hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300'>

          <i className="ri-bard-fill mr-1 text-xl"></i> Popular

        </Link>

        <Link to = "/movie" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300'>

          <i className="ri-film-line mr-1 text-xl"></i> Movies

        </Link>

        <Link to = "/tv" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300'>

          <i className="ri-tv-fill mr-1 text-xl"></i> Tv Shows

        </Link>

        <Link to = "/person" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300'>

          <i className="ri-team-fill mr-1 text-xl"></i> People

        </Link>
      </nav>

      <hr className='border-zinc-400 my-4 border-t h-[1px]' />

      <nav className='flex flex-col text-zinc-400 text-xl gap-3'>

        <h1 className='text-white font-semibold text-xl mt-6'>Website Information</h1>

        <Link className='hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 mt-2'>
          <i className="ri-information-fill text-xl mr-1"></i> About StreamX
        </Link>

        <Link className='hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300'>
          <i className="ri-phone-fill text-xl mr-1"></i> Contact Us
        </Link>

      </nav>
    </div>
  );
};

export default SideNav;
