import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Logo from './Logo/Logo';
import ImageSlider from './ImageSlider/ImageSlider';
import Card from './Card/Card';
import Button from './Buttons/Button';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { toast } from 'react-toastify';
import {  useLocation } from 'react-router-dom';

function App() {
  const [activeitem, showactiveitem] = useState(null);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');
  const effectRan = useRef(false); 
  const location = useLocation()

  useEffect(() => {
    if (effectRan.current === false) {
      if (isLogin) {
        enqueueSnackbar('Logged in successfully!');
        setTimeout(() => {
          localStorage.removeItem('isLogin');
          setIsLogin(false); 
        }, 1000);
      }
      effectRan.current = true;
    }
  }, [isLogin]);
  useEffect(()=>{
    if (location.state && location.state.mailSuccess) {
      toast.success('We have sent you a confirmation email');
    }
  },[location.state])

  return (
    <>
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}/>
      <div className="container-fluid">
        <div className="row " >
          <Navbar />
          <div className="col-xs-4 col-sm-4 col-md-8 col-lg-11 ">
            <Logo />
            <ImageSlider />
            <Button showactiveitem={showactiveitem} />
            <Card activeitem={activeitem} />
          </div>
        </div>
      </div>
      
    </>
  );
}

export default App;
