import React from 'react'

const Topbar = () => {
  return (
    <>
      <div className='w-full p-2 '>
        <div>
          <div className='searchBar'>
            <h1>Navbar</h1>
            <input type="search" name="search" placeholder='Search' />

          </div>
          <div className='filters'>

          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar