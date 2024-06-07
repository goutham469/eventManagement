import React from 'react'
import { useNavigate } from 'react-router-dom'

function ClubHeader() {
    let navigate = useNavigate();
    const HeaderStyles = {display:"flex",
    justifyContent:"space-around",
    minHeight:"50px",
    backgroundColor:"black",
    color:"white",
    flexWrap:"wrap"
  }
  const ChildBars = {
    margin:"20px"
  }
  return (
    <div style={HeaderStyles}>
        <div style={ChildBars} onClick={(event)=>{navigate('/')}}>Event Management</div>
        <div style={ChildBars} onClick={(event)=>{navigate('./login')}}>Login</div>
        <div style={ChildBars} onClick={(event)=>{navigate('./signup')}}>SignUp</div>
        <div style={ChildBars}>about</div>
        <div className='btn' style={{margin:"20px",backgroundColor:"white",color:"black"}} onClick={()=>{navigate('/')}}>user Login</div>
    </div>
  )
}

export default ClubHeader