import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import store from '../../store';

function Login() {
    const navigate = useNavigate();

    let [roolNo,updateRoolNo] = useState();
    let [password,updatePassword] = useState();
    let [errorMessage,updateErrorMessage] = useState();

    async function validateLogin(event)
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
                // fetch the server here to update error message
                const userObject = {"rool_no":roolNo,"password":password}
                console.log(userObject)

                // server fetching logic
                let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                // console.log(base_url)

                let responseFromServer = await fetch(`${base_url}/user/checkCredentials`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(userObject)
                })

                // console.log(responseFromServer)

                responseFromServer = await responseFromServer.json();

                console.log(responseFromServer);
                updateErrorMessage(responseFromServer.message);
                if(responseFromServer.message == "login_success")
                {
                    store.dispatch({type:"login",rool_no:roolNo})
                    console.log(store,store.getState())
                    navigate('../user')
                    
                }
            }
            
        }
    }
  return (
    <div style={{backgroundColor:"white",padding:"10px",display:"flex",justifyContent:"space-around"}}>
        <div style={{backgroundColor:"#1f1f1f",padding:"20px",color:"white"}}>
            <h4>Login</h4>
            <form>
                <label>enter rool no</label><br/>
                <input style={{border:"1px solid black",padding:"5px",borderRadius:"5px"}} type='text' onChange={(event)=>{updateRoolNo(event.target.value)}}/><br/>
                <label>enter password</label><br/>
                <input style={{border:"1px solid black",padding:"5px",borderRadius:"5px"}} type='password' onChange={(event)=>{updatePassword(event.target.value)}}/><br/>
                <br/>
                <button style={{border:"1px solid white",color:"white",backgroundColor:"black",borderRadius:"10px"}} onClick={(event)=>{validateLogin(event)}}>Login</button>
                <p style={{backgroundColor:"white",borderRadius:"5px",color:"red"}}>{errorMessage}</p>


                <button style={{border:"1px solid white",color:"white",backgroundColor:"black",borderRadius:"10px"}} onClick={()=>{navigate('/signup')}}>sign up</button>
                {/* <a href=''>forgot password</a> */}
                
            </form>
        </div>
    </div>
  )
}

export default Login