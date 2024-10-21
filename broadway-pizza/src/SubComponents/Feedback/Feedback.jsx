import React, { useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Logo from '../../Logo/Logo'
import { toast, ToastContainer } from 'react-toastify'

export default function Feedback() {
  const [message, setmessage]= useState('')
   const feedbackmsg = async(e)=>{
    e.preventDefault()
    if(message===''){
      toast.error('Kindly Fill the field to submit')
    }
    else{
      toast.success('Thanks For Your Feedback')
      console.log(message)
    }
    let result = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      body: JSON.stringify({
        message
      }),
      headers : {"Content-type": "application/json"},
  });
  result = await result.json()
  console.log(result)
  setmessage('')
}
    function handlemessage(e){
      let text= e.target.value;
      setmessage(text)
    }
    
  return (
    <>

    <div className="container-fluid">
    <div className="row">
    <Navbar/>
    <div className="col-11">
    <Logo/>
    <ToastContainer/>
    <div className="container">
        <div className="d-flex align-items-center flex-column justify-content-center vh-100">
          <div className="col-6">
            <form className='formbg border shadow p-4'>
              <h3>Your Feedback</h3>
              <div className="form-group">
                <label htmlFor="uemail" className='my-2'>Message: </label>
                <textarea type="text" className="form-control my-4" placeholder="Your feedback adds value to our services"  name="message" style={{fontSize:14+'px'}} value={message} onChange={handlemessage}  required />
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
