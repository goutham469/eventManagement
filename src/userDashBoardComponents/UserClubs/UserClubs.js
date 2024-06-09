import React, { useEffect,useState } from 'react'
import './UserClubs.css'


import { IoMdCheckmark } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";

import nss from '../UserHome/ClubIcons/nss.png'
import csi from '../UserHome/ClubIcons/csi.png'
import acm from '../UserHome/ClubIcons/acm.png'
import scintilations from '../UserHome/ClubIcons/scintillations.png'
import asme from '../UserHome/ClubIcons/asme.png'
import gdse from '../UserHome/ClubIcons/gdse.png'
import vjhub from '../UserHome/ClubIcons/vjhub.png'
import turingHut from '../UserHome/ClubIcons/turinhHut.png'
import edcell from '../UserHome/ClubIcons/edcell.png'
import vjtheatro from '../UserHome/ClubIcons/vjtheatro.png'
import store from '../../store'

function UserClubs() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const StyleSheet = {
        clubsParent: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
        },
        clubsChild: {
            backgroundColor: "#9aa9b6",
            color: "black",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            textAlign: "left",
            display: "flex",
            width: "40em"
        },
        clubIcon: {
            width: "120px",
            height: "120px",
            margin: "10px"
        }
    }

    useEffect(() => {
        async function getProfileData() {
            try {
                const base_url = process.env.REACT_APP_SERVER_BASE_URL
                let response = await fetch(`${base_url}/user/getPersonalData`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "rool_no": `${store.getState().rool_no}` })
                })
                response = await response.json()

                if (response.message && response.message.registered_clubs) {
                    store.dispatch({ type: "add_clubs", clubs: response.message.registered_clubs });
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        getProfileData();
    }, [])

    async function followClub(name) {
        console.log(name)
        try {
            let base_url = process.env.REACT_APP_SERVER_BASE_URL
            let response = await fetch(`${base_url}/user/followClub`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "rool_no": store.getState().rool_no, "club": name })
            })
            let data = await response.json();
            if (data.allClubs) {
                store.dispatch({ type: "add_clubs", clubs: data.allClubs });
            }
        } catch (err) {
            console.error("Failed to follow club:", err);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }
    
  return (
    <div className='userHomeMain'>
        <h3>Clubs and professional Chapters</h3>
        <div style={StyleSheet.clubsParent}>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={nss}/>
                </div>
                <div>
                    <h4>NSS</h4>
                    <p>category : student club</p>
                    <p>very unique and professional than any student club in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('nss') ? 
                        <div>
                            <IoMdCheckmark  color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('nss')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={acm}/>
                </div>
                <div>
                    <h4>ACM</h4>
                    <p>category : professional chapter</p>
                    <p>very unique and professional than any student club in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('acm') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('acm')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={scintilations}/>
                </div>
                <div>
                    <h4>scintilations</h4>
                    <p>category : student club</p>
                    <p>very unique and professional than any student club in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('scintilations') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('scintilations')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={csi}/>
                </div>
                <div>
                    <h4>CSI</h4>
                    <p>category : professional chapter</p>
                    <p>very unique and professional student chapter in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('csi') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('csi')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={asme}/>
                </div>
                <div>
                    <h4>ASME</h4>
                    <p>category : professional chapter</p>
                    <p>student professional chapter in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('asme') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('asme')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={vjtheatro}/>
                </div>
                <div>
                    <h4>VJ theatro</h4>
                    <p>category : student club</p>
                    <p>very unique and professional than any student club in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('vjtheatro') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('vjtheatro')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={edcell}/>
                </div>
                <div>
                    <h4>ED - cell</h4>
                    <p>category : student club</p>
                    <p>very unique and professional than any student club in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('edcell') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('edcell')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={turingHut}/>
                </div>
                <div>
                    <h4>Turing hut</h4>
                    <p>category : professional chapter</p>
                    <p>very unique professional chapter in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('turingHut') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('turingHut')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={vjhub}/>
                </div>
                <div>
                    <h4>VJ Hub</h4>
                    <p>category : professional chapter</p>
                    <p>very unique  rofessional chapter in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('vjhub') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('vjhub')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            <div style={StyleSheet.clubsChild}>
                <div>
                    <img style={StyleSheet.clubIcon} src={gdse}/>
                </div>
                <div>
                    <h4>GDSC</h4>
                    <p>category : professional chapter</p>
                    <p>very unique professional chapter in VNR.</p>
                    {
                        store.getState().clubs_registered.includes('gdse') ? 
                        <div>
                            <IoMdCheckmark color='green'/><label>following</label>
                        </div>
                        :
                        <button className='userCOmponentFollowButton' onClick={()=>{followClub('gdse')}}><FaPlusCircle className='m-1' color='blue'/>follow</button>
                    }
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UserClubs