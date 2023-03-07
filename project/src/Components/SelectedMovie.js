import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SelectedMovie() {
    useEffect(()=>{
        movieDetails();
    },[]);
const {movieId} =useParams();
let [movieDetail,setMovieDetails]=useState([]);
// let length;
let movieDetails=async ()=>{
let reqOption={
    method:"GET"
}
let rawData=await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=2f69efec`,reqOption);
let convertedData=await rawData.json();
// console.log(convertedData);
setMovieDetails(convertedData);

}
  return (
    <div className="selectedMovieDiv">
  {movieDetail.Response === 'True'?<div > 
    
    <br></br>
    <h1 className="selectedMovieTitle">{movieDetail.Title}({movieDetail.Year})</h1>
    <br></br>
    
    <img src={movieDetail.Poster} className="selectedMoviePic" ></img>
   
    <br></br>
    <br></br>
    <br></br>
   <div style={{display:"flex",justifyContent:"center",backgroundColor:"teal"}}>
    <table >
      <thead>
     
      </thead>
      <tbody>
      <tr >
      <th >Country</th>
      <td>{movieDetail.Country}</td>
      </tr>
      <tr >
      <th>Language</th>
      <td>{movieDetail.Language}</td>
      </tr>
      <tr >
      <th>Actors</th>
      <td>{movieDetail.Actors}</td>
      </tr>

      <tr >
      <th>Director</th>
      <td>{movieDetail.Director}</td>
      </tr>

      <tr >
      <th>Genre</th>
      <td>{movieDetail.Genre}</td>
      </tr>
      <tr >
      <th>Released</th>
      <td>{movieDetail.Released}</td>
      </tr>

      </tbody>
    </table>
    </div>
</div>:<h1>Loading.....</h1>}      
  
    </div>
  )
}

export default SelectedMovie