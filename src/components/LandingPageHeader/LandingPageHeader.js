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
  const styleSheet={
    "button":{margin:"20px",border:"1px solid white",borderRadius:"5px",padding:"3px",backgroundColor:"green"}
  }
  return (
    <div style={HeaderStyles}>
        <div style={styleSheet.button} onClick={(event)=>{navigate('/')}}>Event Management</div>
        <div style={styleSheet.button}  onClick={(event)=>{navigate('./login')}}>Login</div>
        <div style={styleSheet.button} onClick={(event)=>{navigate('./signup')}}> SignUp</div>
        <div style={styleSheet.button} >about</div>
        <div className='btn' style={{margin:"20px",backgroundColor:"white",color:"black"}} onClick={()=>{navigate('/club')}}>Club Login</div>
    </div>
  )
}

export default LandingPageHeader