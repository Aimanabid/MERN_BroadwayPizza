import React, { useEffect, useRef, useState } from 'react';
import './Button.css';
import axios from 'axios';

export default function Button({showactiveitem}) {
  const [btnText, settBtntext] = useState([])
  function handlebtnclick(id){
    showactiveitem(id)
  }

  const btnRef=useRef(null)
  function handlePrevious(){
    if(btnRef.current){
      btnRef.current.scrollBy({left: -200, behavior : 'smooth'})
    }
  }
  function handleNext(){
    if(btnRef.current){
      btnRef.current.scrollBy({left: 200, behavior : 'smooth'})
    }
  }
  const getitems = async () => {
    let response = await axios.get('http://localhost:5000/card-items');
    settBtntext(response.data);
  };

  useEffect(() => {
    getitems();
  }, []);
  
  return (
    <>
    <div className="sticky-buttons">
      <div className="container-fluid my-2 d-flex">
           <button className='btn prevbtn' onClick={handlePrevious}>&lt;</button>
        <div className="row no-gutters button-row" ref={btnRef}>
          {btnText.map((v, i) => (
            <div key={v.id} className="col-auto">
            <ButtonChild value={v} key={i} handlebtnclick={handlebtnclick} />
                      </div>

          ))}
        </div>
        <button className='btn nextbtn' onClick={handleNext}>&gt;</button>
      </div>
    </div>
    </>
  );
}

function ButtonChild({ value,handlebtnclick }) {
  return (
    <div className="col-auto">
      <button className="btn btn-warning btn-border-dark shadow"onClick={()=>{handlebtnclick(value.id)}} >{value.name}</button>
    </div>
  );
}

export { ButtonChild };
