import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const Layout = ({children}) => {
  return (
    <div>
      
      <header>
        <Navbar/>
      </header>

      <main>
        {children}
      </main>

      <Footer/>

    </div>
  )
}

export default Layout