import React from 'react';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

const VerticalCard = ({ data, title }) => {
  return (
    <div className="w-full flex flex-wrap justify-center items-start gap-8 px-10 bg-[#1F1E24]">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link
            // ✅ Use media_type if available, otherwise fallback to title
            to={`/${item.media_type || title}/details/${item.id}`}
            key={index}
            className="relative w-[35vh] h-[50vh] flex-shrink-0 rounded-md shadow-2xl mb-[4%]"
          >
            <img
              className="w-full h-full object-cover rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path || item.profile_path}`}
              alt=""
            />

            <h1 className="text-xl text-zinc-400 mt-2 font-semibold">
              {item.name || item.title || item.original_name || item.original_title}
            </h1>
          </Link>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default VerticalCard;
