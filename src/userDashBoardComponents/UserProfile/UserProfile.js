import React, { useEffect } from 'react'

function UserProfile() {
    let profileData = {
        "ProfilePic":"",
        "emailId":"",
        "password":"",
        "roolNo":"",
        "clubsRegistered":[]
    }
    useEffect(()=>{
        async function getProfileData()
        {
            const base_url = process.env.REACT_APP_SERVER_BASE_URL
            let responseFromServer = await fetch(`${base_url}/getPersonalData`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"rool_no":"store.getState().rool_no"})
            })
        }
    })
  return (
    <div>
        <h4>Profile Dashboard</h4>
        <div>

        </div>
    </div>
  )
}

export default UserProfile