import React from "react";
import{Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import '../App.css'
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";

function Login(){
    const [loginInfo, setLoginInfo] = useState({
    email:"",
    password:""
})

const navigate = useNavigate()
const handleChange = (e) =>{
    const {name, value} = e.target;
    console.log(name, value);
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo)

}

console.log("loginInfo", loginInfo);

const handleLogin = async (e) => {
    e.preventDefault();
    const {email, password} = loginInfo;
    if(!email || !password){
        return handleError("email & password are required")
    }

    try {
        const url = "https://glowing-lamp-v6pprr5jrj47cxq69-8080.app.github.dev/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
        const {success,error, message, jwtToken, name} = result;
        if(success){
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(()=>{
                navigate('/home')
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
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                     onChange={handleChange}
                     type="text"
                     name="email"
                     value={loginInfo.email}
                     placeholder="Enter your email..."
                     />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                     onChange={handleChange}
                     type="text"
                     name="password"
                     value={loginInfo.password}
                     placeholder="Enter your password..."
                     />
                </div>
                <button type="submit">Login</button>
                <span>Don't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login