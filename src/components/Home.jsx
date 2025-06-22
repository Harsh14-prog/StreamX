import React, { useEffect, useState } from 'react';
import Sidenav from './Template/Sidenav';
import TopNav from './Template/TopNav';
import Header from './Template/Header';
import axios from "../Utils/Axios";
import HorizontalCard from './Template/HorizontalCard';
import Dropdown from './Template/Dropdown';

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState(null);

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomWallpaper = data.results[Math.floor(Math.random() * data.results.length)];
      console.log("Wallpaper:", randomWallpaper);
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.error("An error occurred while fetching wallpaper:", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      console.log("Trending data fetched:", data.results);
      setTrending(data.results);
    } catch (error) {
      console.error("An error occurred while fetching trending data:", error);
    }
  };

  useEffect(() => {
    getWallpaper();
    getTrending();
  }, [category]);

  return (
    <div className='w-full h-screen flex'>
      <Sidenav />

      <div className='w-[80%] h-full overflow-auto'>
        <TopNav />
        <Header data={wallpaper} />

        <div className='flex justify-between p-3 mb-4'>
          <h1 className='text-zinc-300 font-bold text-3xl'>Trending</h1>
          <Dropdown
            className="max-w-[200px]"
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(ele) => setCategory(ele.target.value)}
          />
        </div>

        {trending && trending.length > 0 ? (
          <HorizontalCard data={trending} />
        ) : (
          <p className='text-white p-4'>No trending data found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
