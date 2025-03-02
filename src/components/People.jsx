import React, { useEffect, useState } from "react";
import TopNav from "./Template/TopNav";
import axios from "../Utils/Axios";
import Loading from "./Loading";
import VerticalCard from "./Template/VerticalCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);

      if (data.results.length > 0) {
        setPeople((prevData) => [...prevData, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching people:", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPeople([]);
    setHasMore(true);
    getPeople();
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return people.length > 0 ? (
    <div className='h-screen w-full'>
      <div className='flex items-center justify-between px-[5%]'>
        <h1 className='text-2xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"></i>
           People
        </h1>
        <div className='flex-grow'>
          <TopNav/>
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
      >
        <VerticalCard data={people}/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading/>
  );
};

export default People;
