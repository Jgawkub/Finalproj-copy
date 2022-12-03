import React from "react";
import { useParams } from "react-router-dom";



export default function TestMovie(){
    const {id}= useParams()

    return (<div> Movie {id} </div>)
}