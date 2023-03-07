import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import NavBar from './NavBar';


function Movies() {

   
    useEffect(()=>{
        onLoad();
    },[]);
    let [movies,setMovies]=useState([])
    const {allmovies}=useParams();
    let onLoad=async()=>{
        let reqOption={
            method:"GET"
        }
        let rawData=await fetch(`https://www.omdbapi.com/?s=${allmovies}&apikey=2f69efec`,reqOption);
        let convertedData=await rawData.json();
        // console.log(convertedData);
        setMovies(convertedData.Search)
    }

    let download = (url,title) =>{
        fetch(url).then(res=>{
         res.arrayBuffer().then(function(buffer){
           let url = window.URL.createObjectURL(new Blob([buffer]));
           let link = document.createElement("a");
           link.href= url;
           link.setAttribute("download",`${title+".jpg"}`);
           document.body.appendChild(link);
           link.click();
         });
        })
       };
  return (
    <div  className="moviesMainDiv">
<h1 className="moviesHeading">You Got Some Movies</h1>
<div className="mapDiv">
{movies.map((movie)=>{
    return <div >
        <Link to={`/selectedMovie/${movie.imdbID}`} className='link'>
    <img src={movie.Poster} className="moviesPoster"></img>
    <h4 className="movieTitle">{movie.Title}</h4>
    </Link>
    <a  class="btn btn-primary" onClick={()=>{download(movie.Poster,movie.Title)}}>
    Download Picture
    </a>
</div>

})}
 </div>
    </div>
  )
}

export default Movies