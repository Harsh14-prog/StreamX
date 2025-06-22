import React, { useEffect, useState } from "react";
import axios from "../Utils/Axios";
import InfiniteScroll from "react-infinite-scroll-component";
import VerticalCard from "./Template/VerticalCard";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const getPeople = async () => {
    const { data } = await axios.get(`/person/popular?page=${page}`);
    if (data.results.length > 0) {
      setPeople((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return people.length > 0 ? (
    <>
      <div className="w-full px-10 flex items-center mb-4">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl"
          ></i>
          Popular People
        </h1>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <VerticalCard data={people} title="person" />
      </InfiniteScroll>
    </>
  ) : (
    <Loading />
  );
};

export default People;
