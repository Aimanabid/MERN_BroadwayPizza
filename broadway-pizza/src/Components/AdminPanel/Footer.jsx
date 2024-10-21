import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="top_header">
        <section>
          <span>
            <i className="fa fa-map-marker"></i>
          </span>
          <span>Broadway Pizza </span>
        </section>
        <section>
          <span>
            <i className="fa fa-phone"></i>
          </span>
          <span>(00) 9742 0000</span>
        </section>
        <section>
          <span>
            <i className="fa fa-envelope"></i>
          </span>
          <span>broadwayPizza.com</span>
        </section>
      </div>

      <span className="border-shape"></span>

      <div className="bottom_content">
        <section>
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-telegram"></i>
          </a>
        </section>
        <section>
          <a href="#">Home</a>
          <a href="#">About us</a>
          <a href="#">Order</a>
          <a href="#">Retail</a>
          <a href="#">Member</a>
          <a href="#">Contact Us</a>
        </section>
      </div>

      <div className="copyright">
        Copyright © 2021 websitename - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
