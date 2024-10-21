import React, { useState } from 'react';
import Logo from '../../Logo/Logo';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../Navbar/Navbar';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function Franchise() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [city, setCity] = useState('');
  const [ownFranchise, setOwnFranchise] = useState('');
  const [ownProperty, setOwnProperty] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [capital, setCapital] = useState('');
  const [address, setAddress] = useState('');

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\d+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !occupation || !city || !ownFranchise || !ownProperty || !hearAbout || !capital || !address) {
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

    
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
            <Navbar />
          <div className="col-11">
            <Logo />
            <div className="container">
              <div className="d-flex justify-content-center">
                <div className="col-6">
                  <form className='formheight border shadow mt-4 p-4' onSubmit={handleSubmit}>
                    <h3>Become a Broadway Franchise Partner</h3>
                    <div className="form-group">
                      <label>Your Name (*)</label>
                      <input type="text" className="form-control my-2" placeholder="Type your name here" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Your Phone (*)</label>
                      <input type="tel" className="form-control my-2" placeholder="Type your number here" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Your Email (*)</label>
                      <input type="email" className="form-control my-2" placeholder="Type your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Your Occupation (*)</label>
                      <input type="text" className="form-control my-2" placeholder="Type your occupation name here" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Which city/town are you interested in opening the franchise? (*)</label>
                      <input type="text" className="form-control my-2" placeholder="Type city here" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Do you own any other franchise? (If yes, please specify the name) (*)</label>
                      <input type="text" className="form-control my-2" placeholder="Yes/No" value={ownFranchise} onChange={(e) => setOwnFranchise(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Do you own the property where you are interested in opening the franchise? (*)</label>
                      <div className='d-flex justify-content-around my-2'>
                        <div><input type="radio" name="own_property" value="Yes" onChange={(e) => setOwnProperty(e.target.value)} /> Yes</div>
                        <div><input type="radio" name="own_property" value="No" onChange={(e) => setOwnProperty(e.target.value)} /> No</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Where did you hear about us? (*)</label>
                      <select className="form-control my-2" value={hearAbout} onChange={(e) => setHearAbout(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Relative">Relative</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Website">Website</option>
                        <option value="Google">Google</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>How much capital do you have to invest in this franchise? (*)</label>
                      <select className="form-control my-2" value={capital} onChange={(e) => setCapital(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="PKR20 million">PKR20 million</option>
                        <option value="PKR25 million">PKR25 million</option>
                        <option value="PKR30 million">PKR30 million</option>
                        <option value="PKR35 million">PKR35 million</option>
                        <option value="PKR40 million">PKR40 million</option>
                        <option value="PKR45 million">PKR45 million</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Your Office Address (*)</label>
                      <input type="text" className="form-control my-2" placeholder="Type your office address here" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <p style={{ textAlign: 'center', margin: '20px' }}>
                      <strong><span style={{ color: 'rgb(226, 80, 65)' }}>Note:</span>&nbsp;</strong>
                      This is not a job submission form!
                    </p>
                    <button type="submit" className="btn btn-warning my-2">Submit your Query</button>
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
