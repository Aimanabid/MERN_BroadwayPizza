import React from 'react'
import menuImg from '../../images/menuimage.jpg'
import './Menu.css'
import Logo from '../../Logo/Logo'
import Navbar from '../../Navbar/Navbar'
import aboutimg3 from '../../images/asset 1.png'
import aboutimg4 from '../../images/asset 2.png'
import aboutimg5 from '../../images/asset 3.png'

export default function Menu() {
  return (
    <>
    <div className="container-fluid">
    <div className="row">
    <Navbar />
    <div className="col-11">
    <Logo/>
    <div className="container-fluid">
    
        <div className="d-flex justify-content-center flex-column align-items-center">
        <a href={menuImg} download="Menu" >
          <button className="btn btn-success my-4 downloadbtn ">Download Menu</button>
          </a>
      <img src={menuImg} className='mb-4' alt="" />
      <div >
    <img src={aboutimg3} className='img-fluid my-4 img3' alt="" />
    <a href="https://play.google.com/store/apps/details?id=com.broadwaypizza.app&hl=en&gl=US" target='_blank'><img src={aboutimg4} className='img-fluid my-4 img4' alt="" /></a>
    <a href="https://apps.apple.com/tt/app/broadway-pizza-official/id1559366003" target='_blank'><img src={aboutimg5} className='img-fluid my-4 img5' alt="" /></a>
    </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </>
  )
}
