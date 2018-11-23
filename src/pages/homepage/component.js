import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage-choice-wrapper">
        <Link to="/" className="homepage-big homepage-big-left">
          work
        </Link>
        <Link className="homepage-big homepage-big-right" to="/play">
          play
        </Link>
      </div>
    </div>
  );
}