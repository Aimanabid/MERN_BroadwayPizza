import React, { useState } from 'react';
import logoImg from '../images/asset 0.png';
import delivery from '../images/delivery.png';
import takeaway from '../images/takeaway.png';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function LoginForm({ setShowForm }) {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate()

  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  function handleCityChange(e) {
    setCity(e.target.value);
  }
  const phonePattern = /^\d+$/;
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(phone ==='' || city===''){
      toast.info('Kindly fill all the entries')
      return
    }
    
    if (!phonePattern.test(phone)) {
      toast.info('Phone number must contain only numbers.');
      return;
    }
    if(phone.length<11){
      toast.info('Phone Number must contain 11 digits')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/cartForm', {
        city: city, 
        phoneNo: phone
      });
      console.log(response.data); 
      navigate('/mailForm')
    } catch (err) {
      console.error('There was an error:', err); // Handle errors
    }
    setPhone('')
    setCity('')
   setShowForm(false)
   toast.info('Order Placed')
   
    
 
   
  };

  return (
    <>
    <ToastContainer/>
    <div className="loginform-overlay">
      <div className="loginform-container p-4">
        <div className="d-flex justify-content-between ">
          <div style={{ width: '1080px' }}>
            <img src={logoImg} alt="logo" style={{ width: '23%' }} />
          </div>
          <span onClick={() => setShowForm(false)} style={{ cursor: 'pointer' }}>
            &#10006;
          </span>
        </div>
        <div className="d-flex justify-content-around align-items-center margintop">
          <Link to="/form">
            <div className="d-flex w-25 deliverytxt">
              <img src={delivery} alt="delivery" className="delivery mx-1" />
              <p className='formtxt'>DELIVERY</p>
            </div>
          </Link>
          <Link to="/location">
            <div className="d-flex">
              <img src={takeaway} alt="takeaway" className="pickup mx-1" />
              <p className='formtxt'>PICKUP</p>
            </div>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="selectCity" className="form-label">Select City</label>
            <select name="city" id="selectCity" onChange={handleCityChange} className="form-control w-100" defaultValue="">
              <option value="" disabled>Select a city</option>
              <option value="Lahore">Lahore</option>
              <option value="Multan">Multan</option>
              <option value="Karachi">Karachi</option>
              <option value="Peshawar">Peshawar</option>
            </select>
            <input type="tel" name="phone" value={phone} onChange={handlePhoneChange} className="form-control w-100 mt-4" placeholder="Eg. +92-32XXXXXXXX" />
            <button type="submit" className="btn btn-warning mt-4 w-100 formbtn">SAVE LOCATION</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
