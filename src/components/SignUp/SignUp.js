import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  let navigate = useNavigate()
  const [rollNo, updateRollNo] = useState('');
  const [emailId, updateEmailId] = useState('');
  const [password1, updatePassword1] = useState('');
  const [password2, updatePassword2] = useState('');
  const [errorMessage, updateErrorMessage] = useState('');

  async function createUser() {
    try {
      const base_url = process.env.REACT_APP_SERVER_BASE_URL;
      console.log(rollNo,emailId,password1)
      const response = await fetch(`${base_url}/user/createAccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "roll_no": rollNo,
          "email": emailId,
          "password": password1
        })
      });
      
      const responseFromServer = await response.json();
      
      if (responseFromServer.message === "roll_no_already_registered") {
        alert("Roll no already registered");
      } else {
        console.log("Account created", responseFromServer);
        if(responseFromServer.message == "rool_no_already_registered")
        {
          alert("rool no already registered, Login to continue");
          navigate("/login")
        }
        else if(responseFromServer.insertedId)
        {
          alert("Account created, Login to continue");
          navigate("/login")
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
      updateErrorMessage('An error occurred during sign up.');
    }
  }

  function checkFormData(event) {
    event.preventDefault();
    if (!rollNo) {
      updateErrorMessage('Roll no cannot be empty');
    } else if (!emailId) {
      updateErrorMessage('Email Id cannot be empty');
    } else if (!password1 || !password2) {
      updateErrorMessage('Password cannot be empty');
    } else if (password1 !== password2) {
      updateErrorMessage('Passwords do not match');
    } else {
      updateErrorMessage('');
      createUser();
    }
  }

  return (
    <div style={{backgroundColor:"white",padding:"10px",display:"flex",justifyContent:"space-around"}}>
      <div style={{backgroundColor:"#1f1f1f",padding:"20px",color:"white"}}>
        <h3>Sign up</h3>
        <form onSubmit={checkFormData}>
          <label>Enter your college roll no</label><br />
          <input style={{border:"1px solid black",padding:"5px",borderRadius:"5px"}} type='text' placeholder='Roll no' value={rollNo} onChange={(e) => updateRollNo(e.target.value)} /><br />
          <label>Personal email Id</label><br />
          <input style={{border:"1px solid black",padding:"5px",borderRadius:"5px"}} type='email' placeholder='Email' value={emailId} onChange={(e) => updateEmailId(e.target.value)} /><br />
          <label>Create password</label><br />
          <input style={{border:"1px solid black",padding:"5px",borderRadius:"5px"}} type='password' placeholder='Password' value={password1} onChange={(e) => updatePassword1(e.target.value)} /><br />
          <label>Re-enter password</label><br />
          <input style={{border:"1px solid black",padding:"5px",borderRadius:"5px"}} type='password' placeholder='Re-enter password' value={password2} onChange={(e) => updatePassword2(e.target.value)} /><br />
          <br />
          <p style={{ backgroundColor: "white", color: "red" }}>{errorMessage}</p>
          <button style={{border:"1px solid white",color:"white",backgroundColor:"black",borderRadius:"10px"}} type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
