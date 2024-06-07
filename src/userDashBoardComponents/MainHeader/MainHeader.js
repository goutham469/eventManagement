import React from 'react'
import { useNavigate } from 'react-router-dom'

function MainHeader() {
    let HomeIcon = "";
    let navigate = useNavigate();

    const childComponentHeaderElementStyle = {
        margin:"20px",
        color:"gold",
        "fontWeight":"700"
    }
    const parentComponentHeaderElementStyle = {
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-around",
        backgroundColor:"black"
    }
  return (
    <div style={parentComponentHeaderElementStyle}>
        <div className='childComponentHeaderElementStyleClassName' style={childComponentHeaderElementStyle}>
            {
                HomeIcon ? <HomeIcon/>:<h3 onClick={()=>{navigate('./home')}}>Home</h3>
            }
        </div>
        <div className='childComponentHeaderElementStyleClassName' style={childComponentHeaderElementStyle}>
            {
                HomeIcon ? <HomeIcon/>:<h3 onClick={()=>{navigate('./clubs')}}>clubs</h3>
            }
        </div>
        <div className='childComponentHeaderElementStyleClassName' style={childComponentHeaderElementStyle}>
            {
                HomeIcon ? <HomeIcon/>:<h3 onClick={()=>{navigate('./profile')}}>profile</h3>
            }
        </div>
    </div>
  )
}

export default MainHeader