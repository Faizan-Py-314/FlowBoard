import React, { useState }  from 'react'
import Navbar from './components/Navbar'
import Topbar from './components/Topbar'

function App() {
    const [navActive, setNavActive] = useState(false)

  return (
    <>
      <div className='flex'>
        <Navbar navActive={navActive} setNavActive={setNavActive} />
        <Topbar setNavActive={setNavActive} />
      </div>
    </>
  )
}

export default App
