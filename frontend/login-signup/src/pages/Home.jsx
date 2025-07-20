import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import {ToastContainer} from 'react-toastify';

function Home(){
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("User Logged Out")
        setTimeout(()=>{
            navigate('/login');
        },1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "https://glowing-lamp-v6pprr5jrj47cxq69-8080.app.github.dev/products";
            const response = await fetch(url, {
                method: "GET",
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': "application/json",
                }
            });
            const result = await response.json()
            console.log(result);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(()=>{
        fetchProducts()
    },[])
    return(
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <ToastContainer/>
        </div>
    )
}

export default Home