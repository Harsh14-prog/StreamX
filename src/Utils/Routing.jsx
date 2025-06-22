import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Trending from "../components/Trending";
import Home from "../components/Home";
import Popular from "../components/Popular";
import Movies from "../components/Movies";
import People from "../components/People";
import TvShows from "../components/TvShows";
import MovieDetails from "../components/MovieDetails";
import TvDetails from "../components/TvDetails";
import PersonDetails from "../components/PersonDetails";

const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/trending",
      element: <Trending />,
    },

    {
      path: "/popular",
      element: <Popular />,
    },

    {
      path: "/movie",
      element: <Movies />,
    },

    {
      path: "/tv",
      element: <TvShows />,
    },

    {
      path: "/person",
      element: <People />,
    },

    {
      path: "/movie/details/:id",
      element: <MovieDetails />,
    },

    {
      path: "/tv/details/:id",
      element: <TvDetails />,
    },
    {
      path: "/person/details/:id",
      element: <PersonDetails />,
    },

    {
      path: "*",
      element: (
        <div className="text-center text-white text-3xl mt-10">
          404 - Page Not Found
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routing;
