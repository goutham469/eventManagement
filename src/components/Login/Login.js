import React, { useState } from 'react'

function Login() {
    let [roolNo,updateRoolNo] = useState();
    let [password,updatePassword] = useState();
    let [errorMessage,updateErrorMessage] = useState();


    async function checkLoginCredentials()
    {
        // fetch the server here to update error message
        const userObject = {"rool_no":roolNo,"password":password}
        console.log(userObject)

        // server fetching logic
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;

        let responseFromServer = await fetch(`${base_url}/user/checkCredentials`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(userObject)
        })

        responseFromServer = await responseFromServer.json();

        console.log(responseFromServer);
        updateErrorMessage(responseFromServer.message);
    }

    function validateLogin(event)
    {
        event.preventDefault();
        if(roolNo == null || roolNo == undefined || roolNo == '')
        {
            updateErrorMessage('* null userName found *')
        }
        else
        {
            updateErrorMessage('');
            if(password == null || password == undefined || password == '')
            {
                updateErrorMessage('* null password found *');
            }
            else
            {
                updateErrorMessage('');
                checkLoginCredentials();
            }
            
        }
    }
  return (
    <div style={{backgroundColor:"white",border:"1px solid black",padding:"10px"}}>
        <h4>Login</h4>
        <form>
            <label>enter rool no</label><br/>
            <input type='text' onChange={(event)=>{updateRoolNo(event.target.value)}}/><br/>
            <label>enter password</label><br/>
            <input type='password' onChange={(event)=>{updatePassword(event.target.value)}}/><br/>
            <button onClick={(event)=>{validateLogin(event)}}>Login</button>
            <p style={{backgroundColor:"white",borderRadius:"5px",color:"red"}}>{errorMessage}</p>


            <button>sign up</button>
            <a href=''>forgot password</a>
            
        </form>
    </div>
  )
}

export default Login