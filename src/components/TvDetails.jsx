import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoadtv, removetv } from '../store/actions/TvActions';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from "./Template/HorizontalCard";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncLoadtv(id));
    return () => dispatch(removetv());
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-full min-h-screen px-[10%] py-8 relative"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex gap-10 items-center text-xl">
        <Link onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer" />
        {info.detail.homepage && (
          <a target="_blank" href={info.detail.homepage} rel="noreferrer">
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} rel="noreferrer">
            <i className="ri-earth-fill"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} rel="noreferrer">
            IMDb
          </a>
        )}
      </nav>

      {/* Poster & Details */}
      <div className="w-full flex flex-col lg:flex-row mt-10 gap-10">
        <img
          className="h-[60vh] w-full lg:w-[18vw] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path}`}
          alt="TV Poster"
        />

        <div className="content text-white flex flex-col justify-between">
          <h1 className="text-4xl font-bold">
            {info.detail.name || info.detail.title || "Untitled"}{" "}
            <small className="text-2xl font-bold text-gray-400">
              ({info.detail.release_date ? info.detail.release_date.split("-")[0] : "N/A"})
            </small>
          </h1>

          <div className="flex flex-wrap items-center gap-5 mt-6 text-lg">
            <span className="bg-yellow-600 font-semibold rounded-full w-[7vh] h-[7vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <h1 className="font-semibold">User Score</h1>
            <h1>{info.detail.release_date || "N/A"}</h1>
            <h1>{info.detail.genres?.map((g) => g.name).join(", ") || "No genres"}</h1>
            <h1>{info.detail.runtime ? `${info.detail.runtime} min` : "N/A"}</h1>
          </div>

          {info.detail.tagline && (
            <h1 className="italic mt-6 text-gray-300 font-semibold">{info.detail.tagline}</h1>
          )}

          <h2 className="text-2xl mt-6 mb-2">Overview</h2>
          <p className="leading-relaxed">{info.detail.overview || "No overview available."}</p>

          {info.translations?.length > 0 && (
            <>
              <h2 className="text-2xl mt-6 mb-2">Available Translations</h2>
              <p className="leading-relaxed mb-5">{info.translations.join(", ")}</p>
            </>
          )}

          <Link
            className="px-3 py-3 bg-[#6556CD] text-md rounded-md mt-4 inline-block w-auto shadow-md hover:bg-[#5546b3] transition self-start"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-mini-fill text-md mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Platforms */}
      {info.watchproviders && (
        <div className="w-[80%] mt-10">
          {["flatrate", "rent", "buy"].map(
            (type) =>
              info.watchproviders[type] && (
                <div key={type} className="flex items-center gap-5 mt-5">
                  <h1 className="font-semibold text-lg text-gray-300">
                    Available to {type === "flatrate" ? "Stream" : type}
                  </h1>
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
          )}
        </div>
      )}

      {/* Recommendations */}
      <hr className="mt-10 border-zinc-500 h-[2px] mb-5" />
      <h1 className="text-3xl font-bold mt-5 mb-5 text-white">Recommendations</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
