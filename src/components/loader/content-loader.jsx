import React from 'react'

const ContentLoader = () => {
     const arr = new Array(9).fill("selam");

  return arr.map((i, key) => ( 

    <div key={key} data-testid="content-loader" className='p-5 border text-black shadow text-transparent select-none bg-gray-100 animate-pulse rounded-md'>

        <div>.</div>
        <div>.</div>
    </div>
  ))
}

export default ContentLoader;