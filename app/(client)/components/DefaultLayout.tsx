import React from 'react'
import Navbar from './navbar/Navbar'

const DefaultLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default DefaultLayout