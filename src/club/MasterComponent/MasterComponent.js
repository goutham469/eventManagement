import React, { useEffect } from 'react'
import { useNavigate,Outlet } from 'react-router-dom'
import store from '../../store';

function MasterComponent() {
    let navigate = useNavigate();
    useEffect(()=>{
      if(store.getState().signed == false)
      {
        navigate('/club')
      }
    })
  return (
    <div>
        <div style={{display:"flex",justifyContent:"space-around",backgroundColor:"black"}} className='Header'>
            <div style={{margin:"10px"}} className='btn btn-warning' onClick={()=>{navigate('./about')}}>Home</div>
            <div style={{margin:"10px"}} className='btn btn-warning' onClick={()=>{navigate('./newPost')}}>+New event</div>
        </div>
        <Outlet/>
    </div>
  )
}

export default MasterComponent