import React, { useEffect } from 'react';
import './NavbarSlider.css';
import '../SubComponents/Navbar1/Navbar1.css';
import contract from '../images/asset 10.svg'
import about from '../images/asset 4.svg'
import blog from '../images/asset 5.svg'
import feedback from '../images/asset 6.svg'
import catering from '../images/asset 7.svg'
import corporate from '../images/asset 8.svg'
import franchise from '../images/asset 9.svg'
import facebook from '../images/asset 11.svg'
import instagram from '../images/asset 12.svg'
import whatsapp from '../images/asset 13.svg'
import callUs from '../images/asset 14.svg'
import { Link } from 'react-router-dom';

export default function NavbarSlider({showSlider,setShowSlider}) {
    useEffect(() => {
        const sidebar = document.querySelector('.sidebarRow');
        sidebar.classList.add('open');
    
        return () => {
          sidebar.classList.remove('open');
        };
      }, []);
    
      return (
        <>
          <div className='sidebarRow'>
            <ul className='border border-rounded'>
              <div className="d-flex justify-content-between p-2 crossicon">
                <h3 className='mb-4 '>Menu</h3>
                <p onClick={() => setShowSlider(!showSlider)}>&#10006;</p>
              </div>
              <Link to={'/about-us'}>
              <li className='border border-rounded p-2'>
              <img src={about} alt="About" style={{ width: 36+'px' }} />About 
              </li></Link>
              <Link to={'/blogs'}>
            <li className='border border-rounded p-2'> <img src={blog} alt="" style={{width: 36+'px'}}/>Blog
            </li></Link>
            <Link to={'/feedback'}><li className='border border-rounded p-2'> <img src={feedback} alt="" style={{width: 36+'px'}}/>Feedback</li></Link>
            <Link to={'/catering'}><li className='border border-rounded p-2'>  <img src={catering} alt="" style={{width: 36+'px'}}/>Catering</li></Link>
            <Link to={'/corporate'}><li className='border border-rounded p-2'><img src={corporate} alt="" style={{width: 36+'px'}}/>Corporate</li></Link>
            <Link to={'/franchise'}><li className='border border-rounded p-2'><img src={franchise} alt="" style={{width: 36+'px'}}/>Franchise</li></Link>
            <Link to={'/contact'}><li className='border border-rounded p-2'><img src={contract} alt="" style={{width: 36+'px'}}/>Contact</li></Link>
            <li>
              <p className='text'>Connect with Us</p>
            </li>
            <a href="https://www.facebook.com/Broadwaypizzaa" target='_blank'>
            <li className='border border-rounded p-2'><img src={facebook} alt="" style={{width: 36+'px'}}/>Facebook</li></a>
            <a href="https://www.instagram.com/broadwaypizzaa/?theme=dark" target='_blank'>
            <li className='border border-rounded p-2'><img src={instagram} alt="" style={{width: 36+'px'}}/>Instagram</li></a>
            <a href="https://api.whatsapp.com/send/?phone=%2B9221111339339&text&type=phone_number&app_absent=0" target='_blank'>
            <li className='border border-rounded p-2'><img src={whatsapp} alt="" style={{width: 36+'px'}}/>WhatsApp</li></a>
            <a href="tel://021-111-339-339" target='_blank'>
            <li className='border border-rounded p-2 mb-4' style={{marginBottom:12+'px'}}><img src={callUs} alt="" style={{width: 36+'px'}}/>Call Us</li></a>
          </ul>
        </div>
    
    </>
  );
}
