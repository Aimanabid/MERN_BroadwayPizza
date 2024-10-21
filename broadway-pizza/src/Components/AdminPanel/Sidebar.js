import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from '../../images/home (2).svg'
import dashboard from '../../images/dashboard.svg'
import Orders from '../../images/orders.svg'
import products from '../../images/inventory.svg'
import users from '../../images/group.svg'
import feedbacks from '../../images/chat.svg'
import login from '../../images/login.svg'
const Sidebar = () => {
  return (
    <div className='sidebarAdmin border border-light'>
    <Link to='/'><img src={HomePage} alt="Home Icon "/></Link>
      <h5 className='mt-2 mb-4'>Admin Panel</h5>
      <ul>
      <Link to="/dashboard"><li>
        <img src={dashboard} alt="" /> Dashboard
      </li></Link>
      <Link to="/orders"><li> <img src={Orders} alt="" /> Orders</li></Link>
      <Link to="/products"><li> <img src={products} alt="" /> Products</li></Link>
      <Link to="/users"><li> <img src={users} alt="" /> Users</li></Link>
      <Link to="/feedbacks"><li> <img src={feedbacks} alt="" /> Feedbacks</li></Link>
      <Link to="/form"> <li> <img src={login} alt="" /> Login</li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;
