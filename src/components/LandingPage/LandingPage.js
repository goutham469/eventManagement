import React from 'react'
import { Outlet } from 'react-router-dom'


import LandingPageHeader from '../LandingPageHeader/LandingPageHeader'

function LandingPage() {
  return (
    <div>
        <LandingPageHeader/>
        <Outlet/>
    </div>
  )
}

export default LandingPage