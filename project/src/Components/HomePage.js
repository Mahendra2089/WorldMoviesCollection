import React,{ useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import wmc from "../Images/wmc.final.png";
import { FaGoogle,FaFacebook,FaInstagram} from "react-icons/fa";
import { FiTwitter} from "react-icons/fi";
import tollyWoodImg from '../Images/Tollywood1234.jpg'
import bollyWoodImg from '../Images/Bollywood1234.jpg'
import hollywood from '../Images/Hollywood1234.jpeg'
import { useSelector } from 'react-redux';
import NavBar from './NavBar';


function HomePage() {
useEffect(()=>{
  onLoadImages();
  userLogin();
},[])
  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  // let [imagesShow,setImageShow]=useState(tollyWoodImg);
  let navgation=useNavigate();


  let storeObj=useSelector((store)=>{
    return store
  })
  // console.log(storeObj); 
  let userLogin=()=>{
  if(storeObj.length>1){

  }else{
    return navgation('/');
  }
}

  let submitHandler = async() => {
   let rawData =await fetch(`https://www.omdbapi.com/?s=${search}&apikey=2f69efec`);
     let convertedData = await rawData.json();
    //  console.log(convertedData);

     if(convertedData.Response == "True"){
      setData(convertedData);
      navgation(`/Movies/${search}`);
     }else{
      alert("Movie Not Found");
     }

  };

  let onLoadImages=()=>{
  let Images=[tollyWoodImg,bollyWoodImg,hollywood];
  let length=Images.length;
  // console.log(Images);
  let imgSrc=document.querySelector('.moviesslideShow')
  let i=0;
  
  setInterval(() => {
      
  imgSrc.src=Images[i];
      i++;
    if(i===length){
      i=0;
    }
    
  },4000);
}
  return (
    <div>
<NavBar></NavBar>

    <div className="homepageStart">
    <img src={wmc} className = "wmcMainPic" ></img>
</div>


<div className="searchDiv"> 

        <form>
          <input
            type="text" placeholder="Search....."
            onChange={(e) => setSearch(e.target.value)}
         className="searchInput" ></input> 
           
            <button type='button' onClick={()=>{
             
              submitHandler();
           
            }}>🔍 </button>
        </form>
        
        </div>
     

<div className="aboutDiv">
<h1 className="aboutHeading">About</h1>
<p className="aboutPara">Here you get world wide movies with the movie poster and actors details and movie director and the release date of that movie.</p>

</div>

<div>
<div className="homePageMoviesPicsDiv">
<img src={tollyWoodImg} className='moviesslideShow' ></img>
</div>
<div className="footerDiv">
       <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
       <section className="fbInstaImages">
          <MDBIcon >
            <div className="icons">
          <h5 className="symbols" ><FaGoogle size={30} /> </h5>
          <h5 className="symbols" ><FaFacebook size={30}/> </h5>
          <h5 className="symbols" ><FaInstagram size={30}/> </h5>
          <h5 className="symbols" ><FiTwitter size={30}/> </h5>
          </div>
          </MDBIcon>
          </section>
      <section >
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
              </h6>
            <img src={wmc} className="footerWmcPic"></img>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4 contactDetails'>
              <h6 className='text-uppercase fw-bold mb-4 '>Contact</h6>
              <p className="footerContact">
                <MDBIcon icon="home" className="me-2" />
                Address: 
                Ayyappa Society, Madhapur Hyderabad,Telangana 500081,India
              </p>
              <p >
                <MDBIcon icon="envelope" className="me-3" />
               Gmail:
               seelammahendra798@gmail.com
              </p>
              <p>
                <MDBIcon icon="FiMail" className="me-3" />Mobile No: +91 7981687830
              </p>
              
            </MDBCol>
         
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 copyright' style={{ backgroundColor: 'black',color:'white',border : '4px solid red'}}>
       Copyright © 2023.
        <a className='text-reset fw-bold' >
          mahendra@seelam.
        </a>
      </div>
    </MDBFooter>
    </div>
</div>
    
    </div>
  )
}

export default HomePage