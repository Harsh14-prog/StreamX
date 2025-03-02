import React from 'react'

const Loading = () => {
  return (
    <div className='w-full flex h-screen items-center justify-center bg-black'>
        <img className='h-[60%] object-cover' src="/loader.gif"  />
    </div>
  )
}

export default Loading