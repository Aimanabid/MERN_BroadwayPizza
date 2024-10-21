import Logo from '../../Logo/Logo'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import Navbar from '../../Navbar/Navbar'

export default function Corporate() {
  const [message, setmessage]= useState('')
   const [name, setname]= useState('')
   const [phone, setphone] = useState('')
   const [email, setEmail] = useState('')
   const[persons, setpersons] = useState('')

   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    

    const phonePattern = /^\d+$/;
    
    function feedbackmsg(e){
      e.preventDefault();
    
      if (name === '' || message === '' || phone === '' || email === '' || persons === '') {
        toast.info('Kindly fill all the entries to submit');
        return;
      }
      if (!emailPattern.test(email)) {
        toast.info("Email must contain letters, an '@' symbol, and a valid domain (e.g., '.com').");
        return;
      }
      if (!phonePattern.test(phone)) {
        toast.info('Phone number must contain only numbers.');
        return;
      }
      if (phone.length > 11) {
        toast.info('Phone number must contain 11 digits');
        return;
      }
    }
    
   function handlemessage(e){
     let text= e.target.value;
     setmessage(text)
   }
   function handlename(e){
     let text= e.target.value;
     setname(text)
   }
   function handlephone(e){
     let text= e.target.value;
     setphone(text)
   }
   function handlepersons(e){
     let text= e.target.value;
     setpersons(text)
   }
   function handleEmail(e){
     let text= e.target.value;
     setEmail(text)
   }
  return (
    <>
    <ToastContainer/>
    <div className="container-fluid">
    <div className="row">
    <Navbar/>
    <div className="col-11">
    <Logo/>
    <div className="container">
    <div className="d-flex justify-content-center">
    </div>
    <div className="d-flex justify-content-center">
    <div className="col-6">
    <form className='formheight border shadow mt-4 p-4' onSubmit={feedbackmsg}>
              <h3>Corporate</h3>
              <p className="">The Broadway Pizza is excited to introduce our exclusive Prepaid Gift Voucher Program, designed specifically to meet the requirements of our esteemed corporate partners. Our program offers versatile Prepaid Gift Vouchers that corporate clients can present to their employees as a gesture of gratitude or to their valued customers as a premium corporate gift.</p>
              <div className="form-group">
                <h6 htmlFor="name" >Name: </h6>
                <input type="text" style={{fontSize:14+'px'}} className="form-control my-2" placeholder="Enter Your Name"  name="name" value={name} onChange={handlename}  required />
              </div>
              <div className="form-group">
                <h6 htmlFor="phone" >Phone: </h6>
                <input type="number" style={{fontSize:14+'px'}} className="form-control my-2" placeholder="Enter Your Phone Number"  name="phone" value={phone} onChange={handlephone}  required />
              </div>
              <div className="form-group">
                <h6 htmlFor="email" >Email: </h6>
                <input type="email" style={{fontSize:14+'px'}} className="form-control my-2" placeholder="Enter Your email"  name="email" value={email} onChange={handleEmail}  required />
              </div>
              <div className="form-group">
                <h6 htmlFor="email" >Number of Persons: </h6>
                <input type="number" style={{fontSize:14+'px'}} className="form-control my-2"  name="persons" value={persons} onChange={handlepersons} placeholder='Enter Here'  required />
              </div>
              <div className="form-group">
                <h6 htmlFor="uemail">Your Requirements/Queries </h6>
                <textarea type="text" style={{fontSize:14+'px'}} className="form-control my-2" placeholder="Type your query here"  name="message" value={message} onChange={handlemessage}  required />
              </div>

              <div className='contact-div'>
            <div className='d-flex justify-content-around' >
            <div>UAN: <p className='border  rounded-1 bgtext shadow' >+92 21 111 339 339</p></div>
           <div> Whatsapp: <p p className='border  rounded bgtext shadow'>+92 21 111 339 339</p></div>
            </div>

            <p >For general query email us at: </p>
            <div className='row'>
            <div className="col-6">
            <p className='border rounded-1 bgtext shadow text-center'>info@broadwaypizza.com.pk</p>
            </div>
            <div className="col-6">
            <p className='border rounded-1 bgtext shadow text-center'>franchise@broadwaypizza.com.pk</p>
            </div> 
            </div>
            <div className="row">
            <div className="col-6 ">
            <p className='border rounded-1 bgtext shadow text-center'>marketing@broadwaypizza.com.pk</p>
            </div>
            </div>

            </div>
            <button type="submit" className="btn btn-warning my-2"  >Submit</button>
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


