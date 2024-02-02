import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/user-form/all')
      .then(response => {
        console.log("resoponse",response)
        setMessage(response.data.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  useEffect(()=>{
    if (message){
       setData(message)
    }
  },[message])
console.log("message",message)
console.log("data",data)
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{data.email}</p>
      <p>{data.name}</p>
      <p>{data.phone}</p>
    </div>
  );
}

export default Todo;