import React, { useEffect, useState } from 'react'
import store from '../../store'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
    let navigate = useNavigate();
    const styleSheet = {
        "profileChildComponent":{width:"20em",borderRadius:"30px",margin:"20px",textAlign:"left",padding:"20px"}
    }
    let [profilePic,updateProfilePic] = useState('')
    let [profileData,updateProfileData] = useState({
        "profilePic":"",
        "email":"",
        "password":"",
        "rool_no":"",
        "registered_clubs":[]
    })
     

    useEffect(()=>{
        async function getProfileData()
        {
            const base_url = process.env.REACT_APP_SERVER_BASE_URL
            let responseFromServer = await fetch(`${base_url}/user/getPersonalData`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"rool_no":`${store.getState().rool_no}`})
            })
            responseFromServer = await responseFromServer.json()

            updateProfileData(responseFromServer.message)
            // store.dispatch({type:"add_clubs",clubs:responseFromServer.message.registered_clubs})
            
        }
        if(!store.getState().signed)
        {
            console.log(store.getState())
            navigate('../')
        }



        getProfileData();
        console.log(store.getState(),profileData)


    },[])

    async function uploadProfilePic(event)
    {
        event.preventDefault();

        let imageFile = event.target.files[0]
        if(imageFile)
        {
            let formData = new FormData();
            formData.append("photo",imageFile);

            let base_url = process.env.REACT_APP_IMAGE_API;
            console.log(base_url)
            let responseFromServer = await fetch(`${base_url}/media/uploadImage`,{
                method:"POST",
                body:formData
            });

            const data = await responseFromServer.json()
            if(responseFromServer.ok)
            {
                console.log(data,data.file,data.file.path);
                profileData.ProfilePic = data.file.path;
                updateProfilePic(data.file.path)
                base_url = process.env.REACT_APP_SERVER_BASE_URL
                let a = await fetch(`${base_url}/user/updateProfilePic`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({"rool_no":store.getState().rool_no,"url":data.file.path})
                })
                a = await a.json()
                alert("image upload complete",a)
            }
            else
            {
                alert("image upload failed")
            }
        }
    }
  return (
    <div>
        <h4>Profile Dashboard</h4>
        <div style={{display:"flex",flexWrap:"wrap"}}>
            <div style={styleSheet.profileChildComponent}>
                {
                    profileData.profilePic ? 
                    <div>
                        <img style={{width:"150px"}} src={profileData.profilePic}/>
                        <br/>
                        <button className='btn btn-success m-2' onClick={(event)=>{updateProfileData(data=>({...data,profilePic:''}))}}>change</button>
                    </div>
                    :
                    <div>
                        <p>upload your profile pic now!</p>
                        <input type='file' accept='image/*' onChange={(event)=>{uploadProfilePic(event)}}/>
                    </div>
                }
            </div>
            <div style={styleSheet.profileChildComponent}>
                <p>rool no :- <b>{profileData.rool_no}</b></p>
                <p>email :- <b>{profileData.email}</b></p>
                <p>password :- <b>{profileData.password}</b></p>
                <p>clubs : </p>
                {
                    profileData.registered_clubs && profileData.registered_clubs.length == 0 ?
                    <div>
                        <b>No clubs or student chapters registered.</b>
                        <p> - register now to get updates about the club activities.</p>
                    </div>
                    :
                    <div>
                        {
                            profileData.registered_clubs && profileData.registered_clubs.map(clubName=>{
                                return <p style={{backgroundColor:"yellow",color:"black",fontSize:"20px",fontWeight:"500"}}>{clubName}</p>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default UserProfile