import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPageHeader() {
    let navigate = useNavigate();
    const HeaderStyles = {display:"flex",
    justifyContent:"space-around",
    minHeight:"50px",
    backgroundColor:"black",
    color:"white",
    flexWrap:"wrap"
  }
  return (
    <div style={HeaderStyles}>
        <div style={{margin:"20px"}} onClick={(event)=>{navigate('/')}}>Event Management</div>
        <div style={{margin:"20px"}}  onClick={(event)=>{navigate('./login')}}>Login</div>
        <div style={{margin:"20px"}} onClick={(event)=>{navigate('./signup')}}> SignUp</div>
        <div style={{margin:"20px"}} >about</div>
        <div className='btn' style={{margin:"20px",backgroundColor:"white",color:"black"}} onClick={()=>{navigate('/club')}}>Club Login</div>
    </div>
  )
}

export default LandingPageHeader