import React, { useEffect, useState } from 'react'
import Sidenav from './Template/Sidenav'
import TopNav from './Template/TopNav'
import Header from './Template/Header'
import axios from "../Utils/Axios"
import HorizontalCard from './Template/HorizontalCard'
import Dropdown from './Template/Dropdown';

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [category, setCategory] = useState("all");
  const [Trending, setTrending] = useState(null)

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomWallpaper = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.log("An error occurred while fetching", error);
    }
  }

  // console.log(Trending)

  // to get category wise data
  const getTrending = async () => {
    try {
      const {data} = await axios.get(`/trending/${category}/day`)
      // console.log(data)
      setTrending(data.results);

    } catch (error) {
      console.log(" error occured ,data not fetched according to category", error)
    }
  }

  // console.log(category)

  useEffect(() => {

    getWallpaper();
    getTrending()
    
  }, [category]);

  return (
    <div className='w-full h-screen flex  '>

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

        <HorizontalCard data = {Trending}/>
      </div>
    </div>
  );
}

export default Home;
