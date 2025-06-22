import React, { useEffect, useState } from "react";
import TopNav from "./Template/TopNav";
import Dropdown from "./Template/Dropdown";
import axios from "../Utils/Axios";
import Loading from "./Loading";
import VerticalCard from "./Template/VerticalCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const Popular = () => {
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  console.log(popular);

  // Function to fetch popular data from API
  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prevData) => [...prevData, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching popular data:", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      setHasMore(true);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="h-screen w-full">
      <div className="flex items-center justify-between px-[5%]">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
          ></i>
          Popular
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
        </div>
      </div>

      {/* Infinite Scroll for Popular Section */}
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
      >
        <VerticalCard data={popular} title={category === "all" ? "movie" : category} />

      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
