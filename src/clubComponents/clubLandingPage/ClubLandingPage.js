import React from 'react'
import ClubHeader from '../clubHeader/ClubHeader'
import { Outlet } from 'react-router-dom'

function ClubLandingPage() {
  return (
    <div>
        <ClubHeader/>
        <Outlet/>
    </div>
  )
}

export default ClubLandingPage