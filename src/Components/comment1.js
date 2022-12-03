import React,{useState} from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"





export default function Comment1({review, info, updateMovie, addReview, setReview, reviewList, setReviewList}){
const [commentBox, setCommentBox]=useState(false)




const renderComment=()=>{
    console.log("Commenting")
    setCommentBox(true)
    console.log(commentBox)
}


    return(<div><Button variant="primary" onClick={renderComment}>Leave your own thoughts below!</Button>
    {commentBox===true ? <div>
        <Form.Control as='textarea' placeholder="Leave Review Here" id={`review + ${info.id}`}/>
        <Button variant='primary' onClick={()=>{updateMovie(info.id); setCommentBox(false)}}>Submit</Button>
        </div>:null}
        </div>
    )
}