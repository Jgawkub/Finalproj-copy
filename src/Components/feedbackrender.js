import React,{useState} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default function FeedbackRender({props, info, fullName, comment, setComment, setFullName, feedbackData, getFeedbackData, deleteFeedback }){
    const [editBox,setEditBox]=useState(false)
    const feedbackEndpoint= 'https://6352caffd0bca53a8eb55114.mockapi.io/feedback'
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//Have my update function in iys component, this may not have been needed and I could it passed down as props, but I feel I am already passing down so many things to it thats  things as props. 
const updateFeedback=(id,e)=>{
    console.log(`updating + ${id}`)
    axios.put(feedbackEndpoint+`/${id}`,{
        fullName,
        comment
    }).then(()=>{getFeedbackData()})
}

    return(<div>
  
{/* I grabbed this Modal from the React Bootstrap so that when you edid a little pop up shows with your comments to change. Done for the little UI flair.   */}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your comment here! </Modal.Title>
        </Modal.Header>
            <Modal.Body> 
               <Form.Control type="text"placeholder="Name" className="w-auto" onChange={(e)=>setFullName(e.target.value)} ></Form.Control> 
                <br/>
                <Form.Control as='textarea' className="w-100" placeholder="Updated Comment" onChange={(e)=>setComment(e.target.value)}></Form.Control>
                <br/>
            </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="danger" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={()=>{updateFeedback(info.id);handleClose()}}>Submit</Button>
                    </ButtonGroup>
                        
                </Modal.Footer>
      </Modal>
      
      
      
      
      <Row>
        <Col></Col>
        <Col>
            <Card>
                {info.fullName}:
                <br/>
                {info.comment}
                <br/>
                    <ButtonGroup>
                        <Button variant="danger" onClick={()=>deleteFeedback(info.id)}>Delete</Button>
                        <Button variant="success" onClick={handleShow}>Edit</Button>
                    </ButtonGroup>
                </Card>
        </Col>
        <Col></Col>
        </Row>
    </div>)


}