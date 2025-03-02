import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Trending from '../components/Trending'
import Home from '../components/Home'
import Popular from '../components/Popular'
import Movies from '../components/Movies'
import People from '../components/People'
import TvShows from '../components/TvShows'

const Routing = () => {

  const router = createBrowserRouter([
      
     {
        path : "/" ,
        element : <Home/>
     },

     {
        path : "/trending" ,
        element : <Trending/>,
      
     },

     {
      path : "/popular" ,
      element : <Popular/>,
    
     },

   {
      path : "/movie" ,
      element : <Movies/>,
    
   },

   {
      path : "/tv" ,
      element : <TvShows/>,
    
   },

   {
      path : "/person" ,
      element : <People/>,
    
   },


  ])

  return (
    <RouterProvider router = {router}/>
  )
}

export default Routing