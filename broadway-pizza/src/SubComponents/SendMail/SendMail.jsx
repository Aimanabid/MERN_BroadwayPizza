import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import Logo from '../../Logo/Logo';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SendMail = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); 
    const navigate= useNavigate()

    const changemail = (e) => {
        setEmail(e.target.value);
    };
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handlesubmit = async (e) => {
        e.preventDefault();
        
    if(email===''){
        toast.info('Enter you email to proceed');
        return
    }
    if (!emailPattern.test(email)) {
      toast.info("Email must contain letters, an '@' symbol, and a valid domain (e.g., '.com').");
      return;
    }
    setLoading(true)
        let result = await fetch('http://localhost:5000/mail', {
            method: "post",
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': "application/json" },
        });

        result = await result.json();
        console.log(result);
        setLoading(false)

        if(result.success){     
                navigate('/', {state : {mailSuccess: true}})  ;  
        } else {
            toast.error('Error sending email.');
        }
        setEmail("")
    };

    return (
        <>
        <ToastContainer/>
        <div className="container-fluid">
    <div className="row">
    <Navbar/>
    <div className="col-11">
    <Logo/>
    <div className="container">
    <div className="d-flex justify-content-center align-items-center vh-100">
    <form className='shadow p-4' onSubmit={handlesubmit}>
                <label htmlFor="email" className='form-label my-2'>Enter Your Email:</label>
                <input className='form-control ' type="email" value={email} onChange={changemail} required placeholder='eg: example@gmail.com' disabled={loading} />
                
                <button className='btn btn-warning my-2' type="submit" disabled={loading}>Submit</button>
            </form>
            </div>
    </div>
    </div>
    </div>
    </div>            
    </>
    );
};

export default SendMail;
