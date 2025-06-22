import React, { useEffect, useState } from "react";
import TopNav from "./Template/TopNav";
import Dropdown from "./Template/Dropdown";
import axios from "../Utils/Axios";
import Loading from "./Loading";
import VerticalCard from "./Template/VerticalCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevdata) => [...prevdata, ...data.results]);
        setpage((prevpage) => prevpage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching trending data", error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      setTrending([]);
      setHasMore(true);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="h-screen w-full">
      <div className="flex items-center justify-between px-[5%]">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
          ></i>{" "}
          Trending
        </h1>

        <div className="flex-grow">
          <TopNav />
        </div>

        <div className="flex items-center">
          <Dropdown
            className="min-w-[200px]"
            title="Category"
            options={["movie", "tv", "all"]}
            func={(event) => setCategory(event.target.value)}
          />
          <div className="w-4"></div>
          <Dropdown
            className="min-w-[200px]"
            title="Duration"
            options={["week", "day"]}
            func={(event) => setDuration(event.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
      >
        {/* ✅ Do not pass title */}
        <VerticalCard data={trending} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
