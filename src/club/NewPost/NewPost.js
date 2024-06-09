import React, { useState } from 'react'
import store from '../../store'
import { useNavigate } from 'react-router-dom'

function NewPost() {
  const navigate = useNavigate();

  let [masterForm,updateMasterForm] = useState({})
  let [elementChoosen,updateElementChoosen] = useState(0)
  let [noOfLinks,updateNoOfLinks] = useState(0)
  let [noOfContacts,updateNoOfContacts] = useState(0)

  // form data elements
  let [ subject,updateSubject] = useState('')
  let [lastDate,updateLastDate] = useState();

  let [description,updateDescription] = useState([])
  let [descriptionText,updateDescriptionText] = useState('')

  let [Links,updateLinks] = useState([])
  let [linkText,updateLinkText] = useState('')
  let [linkReference,updateLinkReference]=useState('')

  let [contactDetails,updateContactDetails] = useState([])
  let [name,updateName]=useState('')
  let [phone,updatePhone] = useState('')
  let [email,updateEmail] = useState('')

  async function uploadImage(event)
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
              updateDescription(previousData=>[...previousData,{"type":"image","src":data.file.path}])
              updateElementChoosen(0)
          }
          else
          {
              alert("image upload failed")
          }
      }
  }
  function addParagraph(event)
  {
    event.preventDefault();
    updateDescription(previousData=>[...previousData,{"type":"p","value":descriptionText}])
    updateDescriptionText('');
    updateElementChoosen(0)
    // console.log(description)
  }
  function addLink(event)
  {
    event.preventDefault();
    updateLinks(previousData=>[...previousData,{"name1":linkText,"value1":linkReference}])
    updateLinkText('')
    updateLinkReference('')
  }
  function addContactDetails(event)
  {
    event.preventDefault();
    updateContactDetails(previousData=>[...previousData,{"name":name,"phone":phone,"email":email}])
    updateName('')
    updatePhone('')
    updateEmail('')
  }

  async function saveTheFrom(event)
  {
    event.preventDefault();
    masterForm.subject = subject;
    masterForm.posters=[];
    masterForm.description = description;
    masterForm.links = Links
    masterForm.contactDetails = contactDetails;
    masterForm.lastDate = lastDate;
    masterForm.clubId = store.getState().rool_no;

    console.log(store.getState())
    let base_url = process.env.REACT_APP_SERVER_BASE_URL
    let responseFromServer = await fetch(`${base_url}/clubs/getClubName`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({"clubId":store.getState().rool_no})
    })
    responseFromServer = await responseFromServer.json();

    console.log(responseFromServer)

    masterForm.clubName = responseFromServer.name;

    responseFromServer = await fetch(`${base_url}/clubs/createAPost`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(masterForm)
    })
    
    if(responseFromServer.ok)
    {
      alert("post uploaded");
      navigate('/clubOK/about')
    }
    else{
      alert("problem at server");
      navigate('/clubOK/about')
    }
  }
  return (
    <div>
      <h3>NewPost</h3>
      <form>
        <label>subject</label><br/>
        <input type='text' onChange={(event)=>{updateSubject(event.target.value)}}/><br/>

        <lable>last date to apply or register</lable><br/>
        <input type='date' onChange={(event)=>{updateLastDate(event.target.value)}}/><br/>

        <label>Description of the event</label>
        <div>
          {
            elementChoosen == 0 ?
            <b>click on below buttons to add respective content</b>
            :
            elementChoosen == 1 ?
            <div>
              <label>enter the text and click below button to save.</label><br/>
              <textarea style={{width:"200px",height:"150px"}} placeholder='enter some text here ..' onChange={(event)=>{updateDescriptionText(event.target.value)}}></textarea>
              <br/>
              <button onClick={(event)=>{addParagraph(event)}}>add above content</button>
            </div>
            :
            <div>
              <label>choose any kind of image files</label><br/>
              <input type='file' accept='image/*'onChange={(event)=>{uploadImage(event)}}/><br/>
              
              <label>Note : wait untill the image is uploaded, refreshing the page will not upload the image</label>
            </div>
          }
          <div>
            <button onClick={(event)=>{event.preventDefault();updateElementChoosen(1)}}>text</button>
            <button onClick={(event)=>{event.preventDefault();updateElementChoosen(2)}}>image</button>
          </div>
        </div>
        <label>Add Important links</label><br/>
        {
          noOfLinks == 0?
          <button onClick={(event)=>{event.preventDefault();updateNoOfLinks(1)}}>add link</button>
          :
          <div>
            <input type='text' placeholder='link name' onChange={(event)=>{updateLinkText(event.target.value)}}/><br/>
            <input type='text' placeholder='link reference' onChange={(event)=>{updateLinkReference(event.target.value)}}/><br/>
            <button onClick={(event)=>{addLink(event)}}>add Link</button>
          </div>
        }
        <br/>
        <label>add Contact Details</label><br/>
        {
          noOfContacts == 0?
          <button onClick={(event)=>{event.preventDefault();updateNoOfContacts(1)}}>add Contact</button>
          :
          <div>
            <input type='text' placeholder='name' onChange={(event)=>{updateName(event.target.value)}}/><br/>
            <input type='number' placeholder='phone' onChange={(event)=>{updatePhone(String(event.target.value))}}/><br/>
            <input type='email' placeholder='email' onChange={(event)=>{updateEmail(event.target.value)}}/>
            <br/><button onClick={(event)=>{addContactDetails(event)}}>add Contact</button>
          </div>
        }

        <br/><br/><button onClick={(event)=>{saveTheFrom(event)}}>Save and submit form</button>
        
      </form>
    </div>
  )
}

export default NewPost