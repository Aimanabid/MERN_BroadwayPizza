import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Navbar from '../../Navbar/Navbar'
import Logo from '../../Logo/Logo'
import './Contacct.css'


const Contact = () => {
   const [message, setmessage]= useState('')
   const [name, setname]= useState('')
  const feedbackmsg = async(e)=>{
   e.preventDefault()
   if(message===''){
     toast.error('Kindly Fill the field to submit')
   }
   if(name===''){
     toast.error('Kindly Fill the name field to submit')
   }
   let result = await fetch('http://localhost:5000/contactUs',{
    method: "POST",
    body : JSON.stringify({ name , message}),
    headers: {
      'Content-type': 'application/json'
    },
   })
   result = await result.json() 
   console.log(result)
   setmessage('')
   setname('')
   toast.info('Submitted Successfully')
  }
   function handlemessage(e){
     let text= e.target.value;
     setmessage(text)
   }
   function handlename(e){
     let text= e.target.value;
     setname(text)
   }
  return (
    <>
    <ToastContainer/>
      <div className="container-fluid">
    <div className="row">
    <Navbar/>
    <div className="col-11">
    <Logo/>
    <ToastContainer/>
    <div className="container">
        <div className="d-flex align-items-center flex-column justify-content-center vh-100">
          <div className="col-6">
            <form className='formbg border shadow mt-4 p-4'>
              <h3>Contact Us</h3>
              <div className="form-group">
                <label htmlFor="uemail" >Name: </label>
                <input type="text" style={{fontSize:14+'px'}} className="form-control my-2" placeholder="Enter Your Name"  name="name" value={name} onChange={handlename}  required />
              </div>
              <div className="form-group">
                <label htmlFor="uemail">Message: </label>
                <textarea type="text" style={{fontSize:14+'px'}} className="form-control my-2" placeholder="Your feedback adds value to our services"  name="message" value={message} onChange={handlemessage}  required />
              </div>

              <div className='contact-div'>
            <div className='d-flex justify-content-around' >
            <div>UAN: <p className='border  rounded-1 bgtext shadow' >+92 21 111 339 339</p></div>
           <div> Whatsapp: <p p className='border  rounded bgtext shadow'>+92 21 111 339 339</p></div>
            </div>

            <p >For general query email us at: </p>
            <div className='row'>
            <div className="col-6">
            <p className='border rounded-1 bgtext shadow'>info@broadwaypizza.com.pk</p>
            </div>
            <div className="col-6">
            <p className='border rounded-1 bgtext shadow'>franchise@broadwaypizza.com.pk</p>
            </div> 
            </div>
            <div className="row">
            <div className="col-6 ">
            <p className='border rounded-1 bgtext shadow'>marketing@broadwaypizza.com.pk</p>
            </div>
            </div>

            </div>
            <button type="submit" className="btn btn-warning my-2" onClick={feedbackmsg} >Submit</button>
            </form>
          </div>
        </div>
      </div>

    </div>
    </div>
    </div>
    </>
  )
}

export default Contact
