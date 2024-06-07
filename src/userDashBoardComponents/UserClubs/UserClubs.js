import React from 'react'

function UserClubs() {
    const StyleSheet = {
        "clubsParent":{
            display:"flex",
            flexWrap:"wrap",
            justifyContent:"space-around"
            },
        "clubsChild":{
            backgroundColor:"#9aa9b6",
            color:"black",
            padding:"10px",
            margin:"10px",
            borderRadius:"10px",
            textAlign:"left"
        }
    }
    
  return (
    <div>
        <h3>Clubs and professional Chapters</h3>
        <div style={StyleSheet.clubsParent}>
            <div style={StyleSheet.clubsChild}>
                <h4>NSS</h4>
                <p>category : student club</p>
                <p>very unique and professional than any student club in VNR.</p>
            </div>
            <div style={StyleSheet.clubsChild}>
                <h4>NSS</h4>
                <p>category : student club</p>
                <p>very unique and professional than any student club in VNR.</p>
            </div>
            <div style={StyleSheet.clubsChild}>
                <h4>NSS</h4>
                <p>category : student club</p>
                <p>very unique and professional than any student club in VNR.</p>
            </div>
            <div style={StyleSheet.clubsChild}>
                <h4>NSS</h4>
                <p>category : student club</p>
                <p>very unique and professional than any student club in VNR.</p>
            </div>
            <div style={StyleSheet.clubsChild}>
                <h4>NSS</h4>
                <p>category : student club</p>
                <p>very unique and professional than any student club in VNR.</p>
            </div>
        </div>
    </div>
  )
}

export default UserClubs