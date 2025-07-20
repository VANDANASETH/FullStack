import React from "react";
import{Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import '../App.css'
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";

function Signup(){

const [signupInfo, setSignupInfo] = useState({
    name:"",
    email:"",
    password:""
})

const navigate = useNavigate()
const handleChange = (e) =>{
    const {name, value} = e.target;
    console.log(name, value);
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo)

}

console.log("signupInfo", signupInfo);

const handleSignup = async (e) => {
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if(!name || !email || !password){
        return handleError("name, email & password are required")
    }

    try {
        const url = "https://glowing-lamp-v6pprr5jrj47cxq69-8080.app.github.dev/auth/signup";
        const response = await fetch(url, {
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const {success,error, message} = result;
        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }else if(error){
            const details = error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
    } catch (error) {
        handleError(error);
    }
}
    return(
        <div className="container">
            <h1>SignUp</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                     onChange={handleChange}
                     type="text"
                     name="name"
                     autoFocus
                     value={signupInfo.name}
                     placeholder="Enter your name..."
                     />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                     onChange={handleChange}
                     type="text"
                     name="email"
                     value={signupInfo.email}
                     placeholder="Enter your email..."
                     />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                     onChange={handleChange}
                     type="text"
                     name="password"
                     value={signupInfo.password}
                     placeholder="Enter your password..."
                     />
                </div>
                <button type="submit">SignUp</button>
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Signup