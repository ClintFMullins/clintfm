import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export function Choice() {
  return (
    <div className="choice-container">
      <Link className="choice choice-left" to="/work">
        w
      </Link>
      <Link className="choice choice-right" to="/play">
        p
      </Link>
    </div>
  );
}