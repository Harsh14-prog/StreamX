import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Trending from '../components/Trending'
import Home from '../components/Home'

const Routing = () => {

  const router = createBrowserRouter([
      
     {
        path : "/" ,
        element : <Home/>
     },

     {
        path : "/trending" ,
        element : <Trending/>
     },

     {
        path : "/popular" ,
        element : <Trending/>
     },

     {
        path : "/movie" ,
        element : <Trending/>
     },

     {
        path : "/tv" ,
        element : <Trending/>
     },

     {
        path : "/person" ,
        element : <Trending/>
     },
  ])

  return (
    <RouterProvider router = {router}/>
  )
}

export default Routing