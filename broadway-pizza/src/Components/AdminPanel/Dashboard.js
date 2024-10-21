import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import './AdminPanel.css';
import Logo from '../../Logo/Logo'
import Flickity from 'react-flickity-component';
import { Star } from 'react-feather';
import 'flickity/css/flickity.css';
import feedbackImg from '../../images/feedback.png'
import axios from 'axios';
import BarGraph from './BarGraph';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';


const Dashboard = () => {
  const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once visible
                }
            },
            {
                threshold: 0.5, // Adjust based on how much of the section should be visible
            }
        );

       
        const currentSection = sectionRef.current; // Copy the ref value to a variable

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection); // Use the copied variable here
            }
        };
    }, []); // Empty dependency array to run only once


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
    <div className="admin-dashboard ">
      <Sidebar />
      <div className="dashboard-content">
        <Logo />
        <div className="main-content">
        
          <h4>Welcome to Broadway Pizza Admin Dashboard!</h4>
          <p>Here you can manage the Broadway Pizza website.</p>
          
          <BarGraph />
          <section
            id="statistic"
            className="statistic-section one-page-section sectionShadow"
            style={{ marginTop: '120px' }}
            ref={sectionRef}
        >
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-12 col-md-3 bg-warning shadow p-4">
                        <div className="counter">
                            <i><FontAwesomeIcon icon= {faPizzaSlice} className=' fa-2x stats-icon'/></i>
                            <h2 className="timer count-title count-number">
                                {isVisible ? <CountUp end={999} /> : 0}
                            </h2>
                            <div className="stats-line-black"></div>
                            <p className="stats-text">Pizza Flavors</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3 bg-warning shadow p-4">
                        <div className="counter">
                            <i><FontAwesomeIcon icon = {faUser} className='fa-2x stats-icon'/></i>
                            <h2 className="timer count-title count-number">
                                {isVisible ? <CountUp end={60000} /> : 0}
                            </h2>
                            <div className="stats-line-black"></div>
                            <p className="stats-text">Satisfied Customers</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3 bg-warning shadow p-4">
                        <div className="counter">
                            <i className="fa fa-clock-o fa-2x stats-icon"></i>
                            <h2 className="timer count-title count-number">
                                {isVisible ? <CountUp end={12} /> : 0}
                            </h2>
                            <div className="stats-line-black"></div>
                            <p className="stats-text">Years Experience</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3 bg-warning shadow p-4">
                        <div className="counter">
                            <i><FontAwesomeIcon icon={faShop} className='fa-2x stats-icon'/></i>
                            <h2 className="timer count-title count-number">
                                {isVisible ? <CountUp end={35} /> : 0}
                            </h2>
                            <div className="stats-line-black"></div>
                            <p className="stats-text">Branches</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className='my-4 happycustomer'>
    <div className="happy-customer" style={{marginTop : 150 +'px'}}>
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
                  <div className="rating-star mb-4">
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

      <div>
    <Footer/>
      </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
