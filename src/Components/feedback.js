import React,{useState,useEffect} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import FeedbackRender from "./feedbackrender";


//This component is intended to be in an about me page, where peeople can leavefeeback about what they've seen
export default function Feedback(){
const [feedbackData, setFeedbackData]=useState([])
const [fullName, setFullName]=useState('')
const [comment, setComment]=useState('')
const feedbackEndpoint= 'https://6352caffd0bca53a8eb55114.mockapi.io/feedback'
//Similar Situation I am using a bunch of API calls here as I could't quite figure out how to make all the API calls in another component and call them here. I understand as a result it is more wordy. 
useEffect(()=>{
    axios.get(feedbackEndpoint).then((response)=>{
        setFeedbackData(response.data);
        console.log(response.data)
    });
},[]);

const getFeedbackData=()=>{
    axios.get(feedbackEndpoint).then((getFeedbackData)=>{
        setFeedbackData(getFeedbackData.data)
    })
}

const postFeedback=(e)=>{
    e.preventDefault()
    axios.post(feedbackEndpoint,{
        fullName,
        comment
    }).then(()=>{getFeedbackData()});
    console.log(fullName)
}


const deleteFeedback=(id)=>{
    console.log('deleting'+fullName)
    axios.delete(feedbackEndpoint+`/${id}`).then(()=>{getFeedbackData()})
}
    

const comments=feedbackData.map((f,index)=>{
    return(<div key={f+index}>
        <br/> <FeedbackRender info={f}
        fullName={fullName}
        setFullName={setFullName}
        comment={comment}
        setComment={setComment}
        feedbackData={feedbackData}
        getFeedbackData={getFeedbackData}
        deleteFeedback={deleteFeedback}/></div>)
})

    return(<div>Thank you for visiting my page and checking out my final project. Please leave any feedback, or other thoughts, below!
        <Form onSubmit={postFeedback}>
            <Form.Control type='text' id='fullName' placeholder="Name" onChange={(e)=>setFullName(e.target.value)}></Form.Control>
            <Form.Control as='textarea' id="comment" placeholder="comment" onChange={(e)=>setComment(e.target.value)}></Form.Control>
            <Button variant="primary" type='submit'>Submit</Button>
        </Form>
        {comments}
       
                </div>)
}