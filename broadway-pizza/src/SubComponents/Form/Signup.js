import React, { useState } from 'react';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../Logo/Logo';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Form({ text }) {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    uemail: '',
    upassword: '',
    uphone: '',
    index: '',
  });

  const [userdata, newuserdata] = useState([]);

  function setData(e) {
    let data = { ...formdata };
    let inputname = e.target.name;
    let inputvalue = e.target.value;
    data[inputname] = inputvalue;
    setformdata(data);
  }

  const submitfunc = async (e) => {
    e.preventDefault();

    if (formdata.uemail === '' || formdata.upassword === '' || formdata.uphone === '') {
      toast.info('Fill all the entries to proceed');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formdata.uemail)) {
      toast.info("Email must contain letters, an '@' symbol, and a valid domain (e.g., '.com').");
      return;
    }

    const phonePattern = /^\d+$/;
    if (!phonePattern.test(formdata.uphone)) {
      toast.info('Phone number must contain only numbers.');
      return;
    }
    if (formdata.uphone.length<11){
      toast.info('Phone Number must contain 11 digits')
      return;
    }

    let checkdata = userdata.filter(v => v.uemail === formdata.uemail && v.uphone === formdata.uphone);
    if (checkdata.length === 1) {
      toast.info('Entry already exists');
    } else {
      let olddata = {
        uemail: formdata.uemail,
        upassword: formdata.upassword,
        uphone: formdata.uphone,
      };
      newuserdata([...userdata, olddata]);
      setformdata({
        uemail: '',
        upassword: '',
        uphone: '',
        index: '',
      });
    }

    let result = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({
        email: formdata.uemail,
        password: formdata.upassword,
        phone: formdata.uphone,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (result.status ===400){
      toast.info('Email Already Registered')
      return 
    }
    if (result.status ===404){
      toast.info('Phone Number Already Registered')
      return 
    }
    result = await result.json();
    console.log(result);
    
    if(result){
      toast.info('Registration successfull')
      setTimeout(() => {
        navigate('/form')
      }, 1000);
      
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
            <Navbar />
          <div className="col-11">
            <Logo />
            <ToastContainer />
            <div className="container">
              <div className="d-flex align-items-center flex-column justify-content-center vh-100">
                <div className="col-6">
                  <form className="formbg border shadow p-4" onSubmit={submitfunc}>
                    <h3>{text || 'Your Account'}</h3>
                    <p style={{fontSize:'smaller'}}>Please provide us with your contact details for updates, exclusive offers, and an easy ordering experience right at your fingertips.</p>
                    <div className="form-group">
                      <label htmlFor="uemail">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={formdata.uemail}
                        name="uemail"
                        onChange={setData}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="uphone">Phone:</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                        value={formdata.uphone}
                        name="uphone"
                        onChange={setData}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="upassword">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={formdata.upassword}
                        name="upassword"
                        onChange={setData}
                      />
                    </div>
                    <button type="submit" className="btn btn-warning my-2">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
