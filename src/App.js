import logo from './logo.svg';
import './App.css';
import MovieForm from './Components/movieform';
import Feedback from './Components/feedback';
import Home from './Components/home';
import Test from './Components/test'; //delete this after test. 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Routes, Link, Route } from "react-router-dom";
import Movie from './Components/movie';
import TestMovie from './Components/testmovie';
function App() {
  return ( 
    <Container>
    <nav>
        
        <Link to='/'>  Home</Link>
        <Link to='/movies'> Movies </Link>
        <Link to='/feedback'>  FEEDBACK  </Link>
     
    </nav>
<Routes> 
    <Route path='/' element={<Home />}/>
  
    <Route path='/feedback' element={<Feedback />}/>
    <Route path='/test' element={<Test />}/>
    <Route path='/movies/' element={<MovieForm />}/>
    <Route path='/movies/:id' elemment={<TestMovie />}/>
</Routes>
  </Container> )
}

export default App;
