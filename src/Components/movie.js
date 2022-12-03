import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import React, {useState} from "react";
import Card from"react-bootstrap/Card"
import Comment1 from "./comment1";
import axios from "axios";
import { Link, Route, Routes, useNavigate, useParams  } from 'react-router-dom'
import Test from "./test";
import TestMovie from "./testmovie";
import ReactStars from "react-rating-stars-component";




// To Do:
// Allow people to edit Movie details, Do one of those modals again 


export default function Movie({info, getFilmData, displayOne, filmData, setFilmData, deleteMovie, setToggle, toggle, star, newRating, setTitle, setDate, setDirector, setPlot, setImage, title, date, director, image, plot }){
 const[review, setReview]=useState([])
 //I place the review state down here because I don't want people to initially leave a review on the first for, 
 const Navigate=useNavigate()
 const [show, setShow] = useState(false)
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const{id} = useParams()




//A little messy to get the value of the text area by using the id, would ideally want it to take the target.value problem I am having is that it is updating the state render in real time, and I only want to do it after im done with a comment. 
const updateMovie=(id,e)=>{
  const reviewText=document.getElementById(`review + ${id}`)
  setReview([...review,reviewText.value])
  console.log('updating'+id);
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{
    title,
    date,
    director,
    image,
    plot,    
    review,
  }).then(()=>{getFilmData()})
}

//This update is if I would like to edit the details, lets say I got the name of the movie wrong but don't want to have to retype a bunch of stuff. 
 const updateMovie1=(id,e)=>{
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{
    title,
    date,
    director,
    image,
    plot,    
  }).then(()=>{getFilmData()})  
 }

const reviewRender=review.map((review,index)=>{
  return(<div key={review+index}><br/>{review}<br/></div>)
  })

const action=()=>{

 setToggle(true)
  
}
// const displayOne=function blah(movie,id){
//   if(movie.id === id){
//     return(<div><Test info={movie} /></div>)
    
//   }else{console.log('False')}
// }

  //I take the props from the movie form component and using React bootstrap make it into a card. 
  return(<div>
    
    <Modal centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit your Movie Details Here.  </Modal.Title>
    </Modal.Header>
        <Modal.Body> 
        <Form.Control type='text' id="title" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}></Form.Control>
            <Form.Control type='text' id="date" placeholder="Date" onChange={(e)=>{setDate(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='director' placeholder="Director" onChange={(e)=>{setDirector(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='url'placeholder="Image URL" onChange={(e)=>{setImage(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='plot' rows={3} placeholder="Plot"onChange={(e)=>{setPlot(e.target.value)}}></Form.Control>
        </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="danger" >Close</Button>
                    <Button variant="primary" onClick={()=>{updateMovie1(info.id); handleClose()}}>Submit</Button>
                </ButtonGroup>
                    
            </Modal.Footer>
    </Modal>
  

  <Card style={{width:'18rem', padding:'5px'}}>
          <ButtonGroup>
            <Button variant='danger' className="w-50" onClick={()=>deleteMovie(info.id)}>Delete Movie</Button>
            <Button variant='primary' className="w-50" onClick={handleShow}>Edit </Button></ButtonGroup>
            <Card.Img  onClick={()=>displayOne(info, info.id)} variant="top" src={info.image}/>
              <Card.Body>
                <Card.Title> Title: {info.title}</Card.Title> 
                  <Card.Text>
                    Date: {info.date}
                    <br/>
                    Director: {info.director}
                    <br/>
                    Summary:{info.plot}
                  </Card.Text>
                  Stars: <ReactStars count={5} value={info.rating} edit={false}/>
                    <Comment1 updateMovie={updateMovie} 
                              info={info} 
                              review={review} 
                              setReview={setReview}/>
                  <br></br>
                  {reviewRender}
      
                  </Card.Body>
          </Card></div>)
}