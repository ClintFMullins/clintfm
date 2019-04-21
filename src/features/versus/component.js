import React, { useState } from 'react';

export function Versus() {
  const [message, setMessage] = useState('not lambda');

  function handleClick() {
    fetch("/.netlify/functions/redis")
      .then(response => response.json())
      .then(json => setMessage(json.msg))
  }

  return (
    <>
      <div>message: {message}</div>
      <button onClick={handleClick}>Click it, dingus</button>
    </>
  );
}