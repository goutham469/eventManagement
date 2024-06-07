import React, { useState } from 'react'

function SignUp() {
  let [roolNo,updateRoolNo] = useState();
  let [emailId,updateEmailId] = useState();
  let [password1,updatePassword1] = useState();
  let [password2,updatePassword2] = useState();
  let [errorMessage,updateErrorMessage] = useState();

  async function createUser()
  {
    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
    let responseFromServer = await fetch(`${base_url}/createAccount`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        "rool_no":roolNo,
        "email":emailId,
        "password":password1
      })
    })
    responseFromServer = await responseFromServer.json();

    if(responseFromServer.message == "rool_no_already_registered")
    {
      alert("roll no already registered")
    }
    else
    {
      console.log("account created ",responseFromServer)
    }
  }

  function checkFromData(event)
  {
    event.preventDefault();
    if(roolNo == null || roolNo == undefined || roolNo == '')
    {
      updateErrorMessage('null rool no found');
    }
    else
    {
      updateErrorMessage('');
      if(emailId == null || emailId == undefined || emailId == '')
      {
        updateErrorMessage('null email Id found')
      }
      else
      {
        updateErrorMessage('')
        if(password1 == null || password1 == undefined || password1 == '' || password2 == null || password2 == undefined || password2 == '')
        {
          updateErrorMessage('null password found')
        }
        else
        {
          updateErrorMessage('');
          if(password1 != password2)
          {
            updateErrorMessage('passwords not matched')
          }
          else
          {
            updateErrorMessage('');
            createUser()
          }
        }
      }
    }
  }
  return (
    <div>
      <h3>Sign up</h3>
      <form>
        <label>enter your college rool no</label><br/>
        <input type='text' placeholder='rool no'/><br/>
        <label>personal emailId</label><br/>
        <input type='email' placeholder='email'/><br/>
        <label>create password</label><br/>
        <input type='password'/><br/>
        <input type='password'/><br/>
        <br/>
        <button onClick={(event)=>{checkFromData(event)}}>sign up</button>
      </form>
    </div>
  )
}

export default SignUp