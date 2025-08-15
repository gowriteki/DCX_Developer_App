import React from "react";
import { useNavigate } from "react-router-dom";
export const NotFound=()=>{
    const navigate = useNavigate();
    const redirect=()=>{
        navigate('/');
    }
    return(<div className='d-flex flex-column justify-content-center align-items-center vh-100 text-center'id="not-found">
        <h5 className="fw-bold" >sorry this page doesn't exist</h5>
        <p>The link you followed may be broken or not Available <button className="btn btn-link blue-text" onClick={redirect}>Go to Home page</button></p>
    </div>)
}