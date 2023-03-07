import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import wmcSignup from "../Images/WMClogin2.png";

function SignupForm() {
    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let genderInputRef=useRef();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let emailOutputRef=useRef();
    let passwordOutputRef=useRef();
    let firstNameOutputRef=useRef();
    let lastNameOutputRef=useRef();
    let signUpdetails=async()=>{
        let sendData=new FormData();
        sendData.append("firstName",firstNameInputRef.current.value);
        sendData.append("lastName",lastNameInputRef.current.value);
        sendData.append("gender",genderInputRef.current.value);
        sendData.append("emailId",emailInputRef.current.value);
        sendData.append("password",passwordInputRef.current.value);
        let reqOptions={
            method:"POST",
            body:sendData
        }
        try{
        let rawData=await fetch("/signUp",reqOptions);
    
        let convertedData=await rawData.json();
        
        // console.log(convertedData)
        if(convertedData.state===true){
            alert(convertedData.status)
        }else{
            alert("Check user Details and enter again")     
        }}
        catch(error){
            alert("Enter User Details And  Profile Pic") 
        }
    }
  return (
    <div className="signupDiv">
        
        <h1 className="wmcSignupHeading">World Movies Collection Signup Page</h1>
        <img src={wmcSignup} className="wmcSignup"></img>
        <form className="signupForm">
            <fieldset>
        <div>
            <label className="signUpLabels">First Name</label>
            <input className="signupInputs" ref={firstNameInputRef}
             type='text'
             onChange={()=>{
                 let regEx=/^[A-Za-z.\-\_\ ]{2,15}$/
                 if(regEx.test(firstNameInputRef.current.value)){
                     firstNameOutputRef.current.innerHTML=""
                 }else{
                     firstNameOutputRef.current.innerHTML="Enter name min 2 char max 15 char"
                 }
             }}
            ></input>
            <br></br>
            <span ref={firstNameOutputRef}
           
            ></span>
        </div>

        <div>
            <label className="signUpLabels">Last Name</label>
            <input className="signupInputs" ref={lastNameInputRef}
             type='text'
             onChange={()=>{
                 let regEx=/^[A-Za-z.\-\_]{2,15}$/
                 if(regEx.test(lastNameInputRef.current.value)){
                     lastNameOutputRef.current.innerHTML=""
                 }else{
                     lastNameOutputRef.current.innerHTML="Enter name min 2 char max 15 char"
                 }
             }}
            ></input>
            <br></br>
            <span ref={lastNameOutputRef}></span>
        </div>
        <div>
            <label className="genderLabel">Gender</label>
            <select ref={genderInputRef} className="genderSelect">
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>

            </select>
        </div>

        <div>
            <label className="signUpLabels">Email Id</label>
            <input className="signupInputs" ref={emailInputRef}
            onChange={()=>{
                let regEx=/^[A-Za-z0-9.\-\_\]+\@[A-Za-z.\-\_]+\.([A-Za-z]{3,4})$/
                if(regEx.test(emailInputRef.current.value)){
                    // console.log("email true")
                    emailInputRef.current.style.border="5px solid green"
                    emailOutputRef.current.innerHTML=""
                }else{
                    // console.log("Email False");
                    emailInputRef.current.style.border="5px solid red"
                    emailOutputRef.current.innerHTML="Invalid Email Id"
                }
            }}
            ></input>
            <br></br>
            <span ref={emailOutputRef}></span>
        </div>

        <div>

            <label className="signUpLabels">Password</label>
            <input className="signupInputs" ref={passwordInputRef}
            onChange={()=>{
                let regEx=/^[A-Za-z0-9\@]{6,15}$/
                if(regEx.test(passwordInputRef.current.value)){
                    passwordOutputRef.current.innerHTML=""
                }else{
                    passwordOutputRef.current.innerHTML="Invalid Password"
                }
            }}
            ></input>
            <br></br>
            <span ref={passwordOutputRef}></span>
        </div>
        <button className="signupButton" type='button' onClick={()=>{
            signUpdetails();
        }}>Sign up</button>
        </fieldset>
        </form>
        <Link className="loginLink" to='/'>Login Page</Link>
    </div>
  )
}

export default SignupForm