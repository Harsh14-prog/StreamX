import React, { useEffect, useState } from "react";
import TopNav from "./Template/TopNav";
import Dropdown from "./Template/Dropdown";
import axios from "../Utils/Axios";
import Loading from "./Loading";
import VerticalCard from "./Template/VerticalCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  // console.log(category)
  console.log(trending)

 // function to fetch data vertical cards from api
  const getTrending = async () => {
    try {
      const {data}= await axios.get(`/trending/${category}/${duration}?page=${page}`)
      // console.log(result);
      // console.log(data)
      // console.log(data.results) -->>> array of data

      if (data.results.length > 0){
        // means requested page no.has data , so copy this new data in prev data(we scrolled from page 1)
         setTrending((prevdata) => [...prevdata , ...data.results ])
         setpage((prevpage) => prevpage + 1)
      }

      else {
        // req page has no any data of api ,(we scrolled but data finished of api)
        sethasMore(false)
      }
      

    } catch (error) {
      console.log("error comming while fetching data of category and duration" , error)
    }
  }

  // getTrending()

  const refreshHandler = () => {
   
    // The user visits the "Trending" section for the first time , trending.length == 0
    if (trending.length == 0){ // Check if the trending list is empty
      getTrending()  // If it's empty, fetch data
    }
    
    // trending.length > 0 , user already scrolled down trending section , if he changes category
    else {
      
      setpage(1) //  Reset the page to 1
      setTrending([]) // Clear existing data
      setHasMore(true); // Reset to allow infinite scrolling
      getTrending()  // Fetch new data
      // now new data of changed category start to render from page 1
    }

  }

  useEffect(() => {
    refreshHandler()
  } , [category , duration])


  return trending.length > 0 ?  (
    <div className='h-screen w-full '>

        <div className=' flex items-center justify-between px-[5%]'>
            <h1 className='text-2xl text-zinc-400 font-semibold'>
               <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"></i>
               Trending
            </h1>

           {/* topnav */}
            <div className='flex-grow'>
              <TopNav/>
            </div>

          {/* dropdown */}
         <div className='flex items-center'>
        
             <Dropdown
               className="min-w-[200px]"
               title="Category"
               options={["movie", "tv", "all"]}
               func={(event) => setCategory(event.target.value)}
             />

             <div className='w-4'></div>

             <Dropdown
                className="min-w-[200px]"
                title="Duration"
                options={["week", "day"]}
                func={(event) => setDuration(event.target.value)}
             />
         </div>
        </div>

        {/* vertical card */}   

        {/* apply infinite scroll on Vertical cards */}

        <InfiniteScroll
           dataLength = {trending.length}  // Keeps track of the number of items.
           next = {getTrending}  // Calls getTrending when scrolled to the bottom.
           hasMore = {hasMore} // Controls whether more data should be fetched.
        >
           <VerticalCard data = {trending}/>

        </InfiniteScroll>
    </div>
  ) : (

    <Loading/>
  )
  
};

export default Trending;
