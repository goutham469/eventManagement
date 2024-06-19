import React from 'react'

// import club icons
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

function Description() {
  const styleSheet = {
    "clubIcon":{width:"240px",height:"240px",margin:"20px"}
  }
  return (
    <div>
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>
      <div>
        <img style={styleSheet.clubIcon} src={nss} />
        <h4>NSS</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={csi} />
        <h4>CSI</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={acm} />
        <h4>ACM</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={scintilations} />
        <h4>Scintilations</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={asme} />
        <h4>ASME</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={gdse} />
        <h4>GDSE</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={vjhub} />
        <h4>VJHub</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={turingHut} />
        <h4>Turing Hut</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={edcell} />
        <h4>ED Cell</h4>
      </div>
      <div>
        <img style={styleSheet.clubIcon} src={vjtheatro} />
        <h4>VJTheatro</h4>
      </div>
      </div>
      <div>
        <br/>
        <br/>
        <p style={{fontSize:"26px",color:"green",fontFamily:"fantasy"}}>Get daily updates about clubs and Student chapter activities.</p>
      </div>
    </div>
  )
}

export default Description