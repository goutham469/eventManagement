import React from 'react'
import MainHeader from '../MainHeader/MainHeader'
import { Outlet } from 'react-router-dom'

function MainPage() {
  return (
    <div>
        <MainHeader/>
        <Outlet/>
    </div>
  )
}

export default MainPage