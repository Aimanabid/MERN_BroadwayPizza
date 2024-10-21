import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([])

  const displayOrder = async()=>{
    let result = await axios.get('http://localhost:5000/ordered')
    setOrders(result.data)
  }
  useEffect(()=>{
    displayOrder()
  },[])
  const aggregatedOrders = orders.reduce((acc, order) => {
    const existingOrder = acc.find(item => item.id === order.id);

    if (existingOrder) {
      existingOrder.quantity += order.quantity; // Sum the quantities
      existingOrder.totalPrice += order.price * order.quantity; // Update total price
    } else {
      acc.push({
        ...order,
        totalPrice: order.price * order.quantity, // Calculate total price initially
      });
    }

    return acc;
  }, []);

  return (
    <>
      <div className="admin-dashboard ">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="main-content">
        <div>
      <h2>Orders Section</h2>
      <p>Your sold items</p>
    </div>
    <table className="orderTable shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Sold Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>${order.price}</td>
              <td>{order.quantity}</td>
              <td>${order.price * order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
