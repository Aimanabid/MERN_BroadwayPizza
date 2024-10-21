import React, { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import { Star } from 'react-feather';
import 'flickity/css/flickity.css';
import '../AdminPanel/AdminPanel.css' // Include Flickity styles
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import feedbackImg from '../../images/feedback.png'

const Feedback = () => {
  const [reviews, setreviews] = useState([])
  const carouselOptions = {
    wrapAround: true,
    autoPlay: 1500,
    prevNextButtons: false
  };

  const handleFeedback = async()=>{
    let result = await axios.get('http://localhost:5000/customerFeedback')
    setreviews(result.data)
  }
  useEffect(()=>{
    handleFeedback()
  },[])
  return (
    <>
    <div className="admin-dashboard ">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="main-content">
        <div>
      <div className="container mx-auto px-4 py-4">
      <div className="happy-customer">
        <h4 className="text-center text-lg text-gray-900 font-semibold uppercase tracking-wide mb-3">Happy Customers</h4>
        <Flickity className="rating-carousel" options={carouselOptions}>
          {reviews.map((review, index) => (
            <div className="carousel-cell" key={index}>
              <div className="rating">
                <div className="rating-user">
                  <img src={feedbackImg} alt="user" className="rating-user--avatar" />
                  <h4 className="rating-user--name">Customer</h4>
                </div>
                <div className="rating-rate">
                  <p className="rating-message">{review.message}</p>
                  <div className="rating-star">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="feather-icon" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Flickity>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>  
    </>
  );
};

export default Feedback;
