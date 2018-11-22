import React, { useState, useMutationEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export function Profile() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useMutationEffect(() => {
    setHasLoaded(true)
  }, [])

  return (
    <div className={`profile ${hasLoaded && 'profile-loaded'}`}>
      <Link to="/">clint.fm</Link>
    </div>
  );
}
