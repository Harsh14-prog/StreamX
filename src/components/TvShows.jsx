import React, { useEffect, useState } from "react";
import TopNav from "./Template/TopNav";
import Dropdown from "./Template/Dropdown";
import axios from "../Utils/Axios";
import Loading from "./Loading";
import VerticalCard from "./Template/VerticalCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";

const TvShows = () => {
  const [category, setCategory] = useState("popular");
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setTvShows((prevData) => [...prevData, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching TV shows:", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTvShows([]);
    setHasMore(true);
    getTvShows();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tvShows.length > 0 ? (
    <div className='h-screen w-full'>
      <div className='flex items-center justify-between px-[5%]'>
        <h1 className='text-2xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"></i>
          TV Shows
        </h1>

        <div className='flex-grow'>
          <TopNav/>
        </div>

        <div className='flex items-center'>
          <Dropdown
            className="min-w-[200px]"
            title="Category"
            options={["popular", "airing_today", "on_the_air", "top_rated"]}
            func={(event) => setCategory(event.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tvShows.length}
        next={getTvShows}
        hasMore={hasMore}
      >
        <VerticalCard data={tvShows}/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default TvShows;