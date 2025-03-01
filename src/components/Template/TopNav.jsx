import React, { useEffect, useState } from 'react'
import axios from '../../Utils/Axios'
import { Link } from 'react-router-dom'

const TopNav = () => {

   const [query, setquery] = useState("")
   // console.log(query)

   const [search, setsearch] = useState(null)
   // console.log(search)

   const getresult = async () => {
       try {
         
         const {data} = await axios.get(`/search/multi?query=${query}`) 
          setsearch(data.results);
       } catch (error) {
         console.log("Error occured" , error);
       }
   }

   useEffect(() => {
     getresult()
   } , [query])

   return (
      <div className='z-100 w-[80%] h-[10vh] relative flex items-center mx-auto'>

         <i className="ri-search-line text-3xl text-zinc-400"></i>

         <input 
             onChange={(event) => setquery(event.target.value)}
             value={query}
             className='w-[50%] mx-10 text-xl p-4 outline-none border-none bg-transparent text-zinc-200 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ' 
             type='text' 
             placeholder='Search anything'
/>

         {
            query.length > 0 &&

             <i onClick={()=>setquery("")} className="ri-close-line text-3xl text-zinc-400 hover:text-white"></i>
         
         }

         {/* Search Dropdown Box */}
         {query.length > 0 && search.length > 0 && 
         
            <div className=' w-[50%] max-h-[50vh] bg-[#1F1E24] absolute top-[100%] left-[5%] overflow-y-auto p-3 rounded '>
            
              {
               search && search.map((item , index) => (

                  <Link key={index} className='w-[100%] p-10 flex justify-start font-semibold text-zinc-600 hover:text-white duration-300 hover:bg-[#3a3a3a49] transition-all  items-center  border-b-2 border-zinc-600'>
                     
                     <img 
                     className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg ' 
                     src= {item.backdrop_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}` : "/No-image.webp"} alt="" />

                     <span>{item.name || item.title || item.original_name || item.original_title}</span>

                  </Link>
                ))
              }
            </div>
         }

      </div>
   )
}

export default TopNav
