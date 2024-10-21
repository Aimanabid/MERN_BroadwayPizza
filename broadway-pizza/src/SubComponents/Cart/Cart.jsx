import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Cart.css';
import Logo from '../../Logo/Logo';
import Navbar from '../../Navbar/Navbar';
import axios from 'axios';
import LoginForm from '../../Login Form/LoginForm';
import '../../Login Form/LoginForm.css'

export default function Cart({handleitems}) {
  
  const [fooditems, setFooditems] = useState([])
  const [show, setshow] = useState(false)
  const [price, showPrice] = useState(() => {
    const storedPrice = localStorage.getItem('itemprice');
    return storedPrice ? JSON.parse(storedPrice) : 0;
  });
  const [showform, setShowForm] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    if(show){
    setShowForm(true);
    setFormVisible(true);
  }
}, [show]);
  const [cartitems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartitems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const showItems = async()=>{
    let result= await axios.get('http://localhost:5000/card-items')
    setFooditems(result.data)
  } 
  useEffect(()=>{
   showItems()
  },[])
  const location = useLocation().pathname.split('/')[2];
  const currentdata = fooditems.find((v) => v.id === parseInt(location));

  const btnRef = useRef(null);

  useEffect(() => {
   
    if(handleitems && currentdata){
    if (currentdata) {
      const itemIndex = cartitems.findIndex(item => item.id === currentdata.id);

      const updatedCartItems = [...cartitems];
      if (itemIndex !== -1) {
        updatedCartItems[itemIndex].quantity += 0.5; 
      } else {
        updatedCartItems.push({ ...currentdata, quantity: 1 });  
      }
      setCartItems(updatedCartItems);
      localStorage.setItem('cartitems', JSON.stringify(updatedCartItems));
    }
  }
  }, [currentdata , cartitems,handleitems]);

  function removeItem(itemId) {
    const itemIndex = cartitems.findIndex((v) => v.id === itemId);

    if (itemIndex !== -1) {
      const updatedCartItems = [...cartitems];

      if (updatedCartItems[itemIndex].quantity > 1) {
        updatedCartItems[itemIndex].quantity -= 1;  
      } else {
        updatedCartItems.splice(itemIndex, 1);  
      }

      setCartItems(updatedCartItems);
      localStorage.setItem('cartitems', JSON.stringify(updatedCartItems));
    }
  }
  
    function increaseQuantity(itemId) {
      const updatedCartItems = cartitems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };  
        }
        return item;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem('cartitems', JSON.stringify(updatedCartItems));
    }
    const calculateTotalPrice = (items) => {
      return items.reduce((acc, curr) => acc + parseFloat(curr.price) * curr.quantity, 0);

    };
  
    useEffect(() => {
      showPrice(calculateTotalPrice(cartitems));
    }, [cartitems]);

  const placeOrder = async() =>{
    setshow(!show)
    try {
      const storedItems = JSON.parse(localStorage.getItem('cartitems'));
  
      const itemsToSend = storedItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
  
      const response = await axios.post('http://localhost:5000/cartItems', itemsToSend);
  
      console.log(response.data); 
      localStorage.removeItem('cartitems')
    } catch (err) {
      console.error('There was an error:', err);
    }
  }
   

  return (
    <>
    <div className={`container-fluid position-relative ${formVisible ? 'show-form' : ''}`}>
        <div className="loginshow">
          {
            showform ? <LoginForm setShowForm={setShowForm} /> : ''
          }
        </div>
        <div className="row">
            <Navbar />
          <div className="col-11">
            <Logo />
            <div className="container">
              <h4 className="text-center my-4 ">Cart Items</h4>
              <div className='row d-flex'>
                {cartitems.length > 0 ? (
                  cartitems.map((item, index) => (
                    <div className="col-lg-3 shadow my-2" key={index} style={{height:400+'px'}}>
                      <div className="d-flex flex-column">
                        <img
                          src={item.image}
                          className="img-fluid cartimg my-2"
                          alt={item.name}
                        />
                        <div className='row' style={{height: '40px'}}>
                          <div className="col-8">
                            <h6>{item.name}</h6>
                          </div>
                          <div className="col-4">
                            <p style={{ margin: 0 }}>
                              <strong className='pricetxt'>{item.price} Rs</strong>
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p style={{ margin: 0 }}>Quantity: {item.quantity}</p>
                        </div>
                        <div className="d-flex justify-content-between gapbtn">
                          <button className='btn btn-warning cartbtn' onClick={() => removeItem(item.id)}>-</button>
                            <button className='btn btn-warning cartbtn' onClick={()=>increaseQuantity(item.id)}>+</button>
                          
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4>Your Cart is empty</h4>
                )}
              </div>
            </div>
            {cartitems.length > 0 && (
              <div className="d-flex justify-content-center flex-column align-items-center">
                <div className='my-2'>Total price: {price} Rs</div>
                <button className='btn btn-warning my-2 mb-4 shadow' ref={btnRef} onClick={placeOrder}>Order Now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
