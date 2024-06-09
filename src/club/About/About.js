import React, { useEffect, useState } from 'react'
import store from '../../store'

function About() {
    const [clubData, updateClubData] = useState({
        profilePic: '',
        clubName: '',
        clubId: '',
        description: []
    });
    const [clubPosts,updateClubPosts] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const base_url = process.env.REACT_APP_SERVER_BASE_URL;
                let responseFromServer = await fetch(`${base_url}/clubs/getClubData`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ clubId: store.getState().rool_no })
                });
                responseFromServer = await responseFromServer.json();
                updateClubData(responseFromServer.data);
            } catch (error) {
                console.error('Error fetching club data:', error);
            }
        }

        async function getPostsData() {
            try {
                const base_url = process.env.REACT_APP_SERVER_BASE_URL;
                let responseFromServer = await fetch(`${base_url}/clubs/getClubPosts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ clubId: store.getState().rool_no })
                });
                responseFromServer = await responseFromServer.json();   
                updateClubPosts(responseFromServer.data);
            } catch (error) {
                console.error('Error fetching club posts:', error);
            }
        }

        getData();
        getPostsData();
        

    }, []);

    console.log(clubData)
    console.log(clubPosts)
    
    return (
        <div>
            <div style={{ display: "flex",flexWrap:"wrap"}}>
                <div style={{ width: "40em" }}>
                    {
                        clubData && clubData.profilePic ? 
                        <img style={{ width: "100px", height: "100px" }} src={clubData.profilePic} alt="Club Profile" /> :
                        <p>Club Profile not available</p>
                    }
                </div>
                <div style={{margin:"20px"}}>
                    <b>{clubData && clubData.clubName ? clubData.clubName : "404, Club Name Not Found,login again"}</b>
                    <p>{clubData && clubData.clubId ? clubData.clubId : "404, Club ID Not Found"}</p>
                    <div style={{backgroundColor:"yellow",padding:"15px"}}>
                        <h4>Description</h4>
                        {
                            clubData && Array.isArray(clubData.description) && clubData.description.length > 0 ?
                                clubData.description.map((x, index) => {
                                    if (x.type === 'p') {
                                        return <p style={{textAlign:"left"}} key={index}>{x.value}</p>;
                                    }
                                    else if(x.type === 'image')
                                    {
                                        return <img width="100px" height="100px" style={{margin:"10px",borderRadius:"10px"}} src={x.src} alt='not_found'/>
                                    } 
                                    else {
                                    return null;
                                    }
                                }) :
                                <p>No description available</p>
                        }
                    </div>
                </div>
            </div>
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
                                            return <a href={x.value1}>{x.name1}</a>
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
    )
}

export default About
