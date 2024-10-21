import React, { useRef, useEffect, useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Card({ activeitem }) {
  const [category, setCategory] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartitems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const getitems = async () => {
    let response = await axios.get('http://localhost:5000/card-items');
    setCategory(response.data);
  };

  useEffect(() => {
    getitems();
  }, []);

  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeitem]);

  const handleAddToCart = (item) => {
    if(localStorage.getItem('addCart')==='true'){
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    const updatedCartItems = [...cartItems];

    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity += 1; 
    } else {
      updatedCartItems.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCartItems);
    localStorage.setItem('cartitems', JSON.stringify(updatedCartItems));
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You need to Login first!",
    });  }
  
  };

  return (
    <>
      <div className="row">
        {category.length > 0 ? category.map((v, i) => {
          return (
            <div className=" col-sm-6 col-md-4 col-lg-3" key={i}>
              <ChildCard 
                value={v} 
                isActive={v.id === activeitem} 
                ref={v.id === activeitem ? activeRef : null} 
                onAddToCart={handleAddToCart}  
              />
            </div>
          );
        })
        : ''}
      </div>
      
    </>
  );
}
const ChildCard = React.forwardRef(({ value, isActive, onAddToCart }, ref) => {
  return (
    <div className={`cardrow my-2 p-2 ${isActive ? 'activecard' : ''}`} ref={ref}>
      <img src={value.image} className="card-img rounded-1" alt="Azadi 2K24" />
      <div className="d-flex justify-content-between my-3">
        <span className="card-text row1textbg">New!</span>
        <span className="row1textbg2">Rs {value.price}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="card-text">{value.name}</p>
        <Link to={`/cart-items/${value.id}`}>
        <button onClick={() => onAddToCart(value)} className="btn btn-warning row1btn d-flex align-items-center rounded-circle"> 
            <span >+</span> 
        </button>
          </Link>
      </div>
      <p className="row1text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem totam voluptatem quasi.</p>
    </div>
  );
});
