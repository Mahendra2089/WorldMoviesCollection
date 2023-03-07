import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function NavBar() {
    useEffect(()=>{
        onLoad();
    },[])
    let [userDetails,setUserDetials]=useState([]);
    let [profileMenuview,setProfileMenu]=useState("profileMenu");
    let [menuButton,setMenuButton]=useState("☰");
    let storeObj=useSelector((store)=>{
        return store
    })
    // setUserDetials(storeObj)  
    let onLoad=()=>{
        setUserDetials(storeObj[1].type.userDetails);
    }   
  return (
    <div >
        <button className="menuButton" type='button' onClick={()=>{
           if(profileMenuview === "profileMenu"){
            setProfileMenu("profileMenuActive")
            setMenuButton("✖");
           }else{
            setProfileMenu("profileMenu");
            setMenuButton("☰")
           }
        }}>{menuButton}</button>
        <div className={profileMenuview}>
            <h2 className="detailsHeading">Your Account Details</h2>
            <br></br>
        <strong> <h2 className="profileDetails">Profile Name </h2>{storeObj[1].type.userDetails[0].firstName} {storeObj[1].type.userDetails[0].lastName}</strong>
        <br></br>
        <br></br>
        <NavLink to='/signupForm'>Sign up</NavLink>
        <br></br>
        <NavLink to='/'>Sign out</NavLink> 
        </div>
        
    </div>
  )
}

export default NavBar