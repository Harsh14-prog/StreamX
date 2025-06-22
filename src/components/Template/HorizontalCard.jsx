import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className='w-full bg-zinc-900 flex overflow-x-scroll overflow-y-hidden py-4'>
      {data.map((item, index) => (
        <Link
          to={`/${item.media_type || 'movie'}/details/${item.id}`} // ✅ fixed path
          key={index}
          className='min-w-[18%] mr-3 h-[400px] ml-3'
        >
          <div className='w-full h-2/3'>
            <img
              className='w-full h-full shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-md object-cover'
              src={
                item.backdrop_path || item.poster_path
                  ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path}`
                  : `/No-image.webp`
              }
              alt={item.title || item.name || "No title"}
            />

            <div className='p-3 text-white'>
              <h1 className='text-xl font-semibold truncate'>
                {item.name || item.title || "Untitled"}
              </h1>
              <p className='text-sm mt-2 text-zinc-400'>
                {item.overview ? (
                  <>
                    {item.overview.slice(0, 60)}...
                    <span className='text-zinc-200'> more</span>
                  </>
                ) : (
                  "No description available"
                )}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCard;
