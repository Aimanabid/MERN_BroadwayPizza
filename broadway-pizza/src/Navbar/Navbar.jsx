import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import homeIcon from '../images/home_24dp_FFC714_FILL0_wght400_GRAD0_opsz24.svg';
import menuIcon from '../images/menu.svg';
import cartIcon from '../images/cart.svg';
import locationIcon from '../images/location.svg';
import profileIcon from '../images/person.svg';
import headerImg from '../images/menu header.svg';
import './Navbar.css';
import NavbarSlider from '../NavbarSlider/NavbarSlider';

export default function Navbar() {
  const location = useLocation(); 
  const [showSlider, setShowSlider] = useState(false);
  const [activeIcon, setActiveIcon] = useState(''); 

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveIcon('home');
    else if (path === '/menu') setActiveIcon('menu');
    else if (path === '/cart') setActiveIcon('cart');
    else if (path === '/location') setActiveIcon('location');
    else if (path === '/form') setActiveIcon('profile');
    else setActiveIcon(''); 
  }, [location]);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName); 
  };

  return (
    <>
      <div className="col-1 sticky-column sidebar border border-dark-rounded vh-100" style={{marginLeft : 0 ,paddingLeft: 0}}>
        <div className="mt-3">
          <div className="d-flex flex-column justify-content-center">
            <ul className="list-unstyled">
              <li
                onClick={() => {
                  setShowSlider(!showSlider);
                  handleIconClick('header');
                }}
                className={`mb-2 ${activeIcon === 'header' ? 'changebg' : ''}`}
              >
                <img src={headerImg} className="icon header-list" alt="icon 1" />
              </li>
              <Link to='/'>
                <li
                  className={`mb-2 ${activeIcon === 'home' ? 'changebg' : ''}`}
                  onClick={() => handleIconClick('home')}
                >
                  <img src={homeIcon} className="icon" alt="icon 1" />
                  <p className='navbartxt'>Order</p>
                </li>
              </Link>
              <Link to='/menu'>
                <li
                  className={`mb-2 ${activeIcon === 'menu' ? 'changebg' : ''}`}
                  onClick={() => handleIconClick('menu')}
                >
                  <img src={menuIcon} className="icon" alt="icon 2" />
                  <p className='navbartxt'>Menu</p>
                </li>
              </Link>
              <Link to='/cart'>
                <li
                  className={`mb-2 ${activeIcon === 'cart' ? 'changebg' : ''}`}
                  onClick={() => handleIconClick('cart')}
                >
                  <img src={cartIcon} className="icon" alt="icon 3" />
                  <p className='navbartxt'>Cart</p>
                </li>
              </Link>
              <Link to='/location'>
                <li
                  className={`mb-2 ${activeIcon === 'location' ? 'changebg' : ''}`}
                  onClick={() => handleIconClick('location')}
                >
                  <img src={locationIcon} className="icon" alt="icon 4" />
                  <p>Location</p>
                </li>
              </Link>
              <Link to='/form'>
                <li
                  className={`mb-2 ${activeIcon === 'profile' ? 'changebg' : ''}`}
                  onClick={() => handleIconClick('profile')}
                >
                  <img src={profileIcon} className="icon" alt="icon 5" />
                  <p className='navbartxt'>Profile</p>
                </li>
              </Link>
              {/* <Link to='/dashboard'>
                <li
                  className={`mb-2 ${activeIcon === 'profile' ? 'changebg' : ''}`}
                  onClick={() => handleIconClick('profile')}
                >
                  <img src={admin} className="icon" alt="icon 5" />
                  <p className='navbartxt'>Admin</p>
                </li>
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
      {showSlider && <NavbarSlider setShowSlider={setShowSlider} showSlider={showSlider} />}
    </>
  );
}
