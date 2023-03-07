import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import wmc from "../Images/WMClogin2.png";

function Login() {
    let emailIdInputRef=useRef();
    let passwordInputRef=useRef();
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let loginDetails=async()=>{
    let sendData= new FormData();
    sendData.append("emailId",emailIdInputRef.current.value);
    sendData.append("password",passwordInputRef.current.value)

    let reqOptions={
        method:"POST",
        body:sendData
    }
    let rawData=await fetch("/login",reqOptions);
    let connectedData=await rawData.json();
    // console.log(connectedData);
    alert(connectedData.status);
    if(connectedData.loginStatus === true){
      navigate("/dashboard");
      dispatch({type:connectedData});
    }else{
         return navigate('/');
    }
    }
  return (
    <div className="loginMainDiv">

<h2 className="wmcLoginHeading">Welcome to World Movies Collection Login Page</h2>
<img src={wmc} className = "wmcLogin"></img>
        <form className="loginForm">
            <fieldset>
                <div>
                    <label className="loginLabels">Email Id </label>
                    <input ref={emailIdInputRef}></input>
                </div>

                <div>
                    <label className="loginLabels">Password</label>
                    <input ref={passwordInputRef}></input>
                </div>
                <br></br>
                <button type='button' onClick={()=>{
                    loginDetails();
                }}>Login</button>
            </fieldset>
        </form>
        <Link  to='signupForm' className="newAccount"> don't have an Account ? Create New Account</Link>
    </div>
  )
}

export default Login