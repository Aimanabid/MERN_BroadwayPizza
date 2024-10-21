import '../Navbar1/Navbar1.css'
import '../Catering/Catering.css'
import Logo from '../../Logo/Logo'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import axios from 'axios'

export default function Catering() {
  const [message, setmessage]= useState('')
   const [name, setname]= useState('')
   const [phone, setphone] = useState('')
   const [email, setEmail] = useState('')
   const[persons, setpersons] = useState('')
   const [date, setdate] = useState('')

   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    

    const phonePattern = /^\d+$/;
    
    const feedbackmsg= async(e) =>{
      e.preventDefault();
    
      if (name === '' || message === '' || phone === '' || email === '' || date === '' || persons === '') {
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
      try {
        const response = await axios.post('http://localhost:5000/catering', {
          name, phone, email, persons, date, message
        });
        
  
        if (response.status === 200) {
          toast.success('Form submitted successfully!');
          setname('');
          setphone('');
          setEmail('');
          setpersons('');
          setdate('');
          setmessage('');
        } else {
          toast.error('Form submission failed, please try again.');
        }
      } catch (error) {
        toast.error('There was an error submitting the form.');
        console.error(error);
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
   function handledate(e){
     let text= e.target.value;
     setdate(text)
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
              <h3>Catering</h3>
              <p >Indulge in the exceptional catering experience brought to you by Broadway's Pizza on Wheels. Elevate your event with our full-service catering, perfect for intimate family gatherings of 30 or grand celebrations hosting 300+ guests, including birthday parties, baby showers, bridal showers, Mehndi, Mayon, and more. Our tailored menus are designed exclusively for your occasion, ensuring a unique culinary experience. For added convenience, we offer pick-up services as well. Contact us at 111-339-339 or 03011136804 to explore the full spectrum of our catering services.</p>
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
                <input type="number" style={{fontSize:14+'px'}} className="form-control my-2"  name="persons" value={persons} onChange={handlepersons}  required />
              </div>
              <div className="form-group">
                <h6 htmlFor="dateTime" >Date and Time: </h6>
                <input type="date" style={{fontSize:14+'px'}} className="form-control my-2"  name="date" value={date} onChange={handledate}  required />
              </div>
              <div className="form-group">
                <h6 htmlFor="message">Special Instructions: </h6>
                <textarea type="text" style={{fontSize:14+'px'}} className="form-control my-2" placeholder="Type your message here"  name="message" value={message} onChange={handlemessage}  required />
              </div>

              <div className='contact-div'>
            <div className='d-flex justify-content-around' >
            <div>UAN: <p className='border  rounded-1 bgtext shadow' >+92 21 111 339 339</p></div>
           <div> Whatsapp: <p className='border  rounded bgtext shadow'>+92 21 111 339 339</p></div>
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
