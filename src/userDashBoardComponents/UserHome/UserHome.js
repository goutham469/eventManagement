import React, { useEffect,useState } from 'react'
import './UserHome.css'


import nss from './ClubIcons/nss.png'
import csi from './ClubIcons/csi.png'
import acm from './ClubIcons/acm.png'
import scintilations from './ClubIcons/scintillations.png'
import asme from './ClubIcons/asme.png'
import gdse from './ClubIcons/gdse.png'
import vjhub from './ClubIcons/vjhub.png'
import turingHut from './ClubIcons/turinhHut.png'
import edcell from './ClubIcons/edcell.png'
import vjtheatro from './ClubIcons/vjtheatro.png'


function UserHome() {
  const styleSheet = {
    "clubIcon":{width:"80px",height:"80px",margin:"20px"}
  }
  const [clubPosts,updateClubPosts] = useState([])
  useEffect(()=>{
    async function getData()
    {
      let base_url = process.env.REACT_APP_SERVER_BASE_URL
      let responseFromServer = await fetch(`${base_url}/user/getClubUpdates`)
      responseFromServer = await responseFromServer.json();

      updateClubPosts(responseFromServer)
    }
    getData();
  },[])
  return (
    <div>
      <div>
        <img style={styleSheet.clubIcon} src={nss}/>
        <img style={styleSheet.clubIcon} src={csi}/>
        <img style={styleSheet.clubIcon} src={acm}/>
        <img style={styleSheet.clubIcon} src={scintilations}/>
        <img style={styleSheet.clubIcon} src={asme}/>
        <img style={styleSheet.clubIcon} src={gdse}/>
        <img style={styleSheet.clubIcon} src={vjhub}/>
        <img style={styleSheet.clubIcon} src={turingHut}/>
        <img style={styleSheet.clubIcon} src={edcell}/>
        <img style={styleSheet.clubIcon} src={vjtheatro}/>
      </div>
      <div>
        <h4 style={{textAlign:"left"}}>Notificatons and Updates</h4>
        <div>
        <div className='PostsOfClub'>
                <h3>Posts of Club</h3>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                    {
                        clubPosts && clubPosts.length > 0 ?
                        clubPosts.map(post=>{
                            return <div style={{backgroundColor:"yellow", width:"40em",margin:'10px',borderRadius:'20px',padding:"10px",textAlign:"left"}}>
                                <b>{post.subject}</b>
                                <p>-By {post.clubName}</p>
                                <h6>about the event</h6>
                                <div style={{border:"1px solid black",width:"fit-content",padding:"5px",borderRadius:"10px"}}>
                                    {
                                        post.description.map(x=>{
                                            if(x.type == "p")
                                            {
                                                return <p>{x.value}</p>
                                            }
                                        })
                                    }
                                </div>
                                <div style={{display:"flex",flexWrap:"wrap"}}>
                                    <div style={{margin:"10px"}}>
                                        posted on : <b>{post.postedOn}</b>
                                    </div>
                                    <div style={{margin:"10px"}}>
                                        last Date : <b>{post.lastDate}</b>
                                    </div>
                                </div>
                                <div>
                                    <b>Important links</b><br/>
                                    {
                                        post.links.map(x=>{
                                            return <a target='_blank' href={x.value1}>{x.name1}</a>
                                        })
                                    }
                                </div>
                                <div>
                                    <b>Contact details</b>
                                    <div style={{display:"flex",flexWrap:"wrap"}}>
                                        {
                                            post.contactDetails.map(x=>{
                                                return <div style={{width:"15em",overflowX:"scroll" ,margin:"10px",padding:"5px",backgroundColor:"white",color:"black",borderRadius:"10px"}}>
                                                    <b>{x.name}</b>
                                                    <p>ph :- {x.phone}</p>
                                                    <p>email :- {x.email}</p>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                        :
                        <h4>Reload the page</h4>
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserHome