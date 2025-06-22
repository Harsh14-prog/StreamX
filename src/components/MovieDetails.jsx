import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoadmovie, removemovie } from '../store/actions/movieActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from "./Template/HorizontalCard"


const MovieDetails = () => {
  const { pathname } = useLocation(); // Access URL pathname
  const navigate = useNavigate();
  const { id } = useParams(); // Get movie/tv ID from URL
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie); // Extract movie info from Redux state

  useEffect(() => {
    dispatch(asyncLoadmovie(id)); // Fetch movie data when the component loads
    return () => dispatch(removemovie()); // Clear movie data when the component unmounts
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-full h-[230vh] px-[10%] py-8 relative"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex gap-10 items-center text-xl">
        <Link onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"></Link>
        <a target="_blank" href={info.detail.homepage} rel="noreferrer">
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          rel="noreferrer"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          rel="noreferrer"
        >
          IMDb
        </a>
      </nav>

      {/* Movie Poster and Details */}
      <div className="w-full flex mt-10 gap-10">
        <img
          className="h-[60vh] w-[18vw] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path}`}
          alt="Movie Poster"
        />
        <div className="content text-white flex flex-col justify-between">
          <h1 className="text-5xl font-bold">
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}{' '}
            <small className="text-2xl font-bold text-gray-400">({info.detail.release_date.split('-')[0]})</small>
          </h1>
          <div className="flex items-center gap-x-5 mt-6">
            <span className="bg-yellow-600 text-xl font-semibold rounded-full w-[7vh] h-[7vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <h1 className="font-semibold text-xl">User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(', ')}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>
          <h1 className="italic mt-6 text-gray-300 font-semibold">{info.detail.tagline}</h1>
          <h2 className="text-2xl mt-6 mb-6">Overview</h2>
          <p className="leading-relaxed">{info.detail.overview}</p>
          <h2 className="text-2xl mt-6 mb-6">Movie Translations</h2>
          <p className="leading-relaxed mb-5">{info.translations.join(', ')}</p>

          <Link
              className="px-3 py-3 bg-[#6556CD] text-md rounded-md mt-4 inline-block w-auto shadow-md hover:bg-[#5546b3] transition self-start"
              to={`${pathname}/trailer`}
          >
          <i className="ri-play-mini-fill text-md mr-2"></i>
             Play Trailer
          </Link>

        </div>
      </div>

      {/* Available on Platforms */}
      {info.watchproviders && (
        <div className="w-[80%] mt-10">
          {['flatrate', 'rent', 'buy'].map((type) => (
            info.watchproviders[type] && (
              <div key={type} className="flex items-center gap-5 mt-5">
                <h1 className="font-semibold text-lg text-gray-300">{`Available to ${type === 'flatrate' ? 'Stream' : type}`}</h1>
                {info.watchproviders[type].map((w) => (
                  <img
                    key={w.provider_id}
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    title={w.provider_name}
                    className="w-[5vh] h-[5vh] rounded-md shadow-md"
                    alt={w.provider_name}
                  />
                ))}
              </div>
            )
          ))}
        </div>
      )}

      {/* Recommendations */}
      <hr className="mt-10 border-zinc-500 h-[2px] mb-5" />
      <h1 className="text-3xl font-bold mt-5 mb-5 text-white">Recommendations</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar}/>
      
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
