import "./App.css";
import HomePage from "./Components/HomePage";
import Movies from "./Components/Movies";
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import SelectedMovie from "./Components/SelectedMovie";
import Login from "./Components/Login";
import Signup from "./Components/Signup";




function App() {
 
  return (
    <div className="App">
     
     <BrowserRouter>
    
     <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/signupForm" element={<Signup></Signup>}></Route>
      <Route path="/dashBoard" element={<HomePage></HomePage>}></Route>
      <Route path='/Movies/:allmovies' element = {<Movies></Movies>}></Route>
      <Route path="/selectedMovie/:movieId" element={<SelectedMovie></SelectedMovie>}></Route>
     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
