import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useWindowSize } from '../../utils/dom';

export function Homepage() {
  const { height } = useWindowSize();

  return (
    <div className="homepage" style={{ height }}>
      <div className="homepage-choice-wrapper">
        <Link className="homepage-big homepage-big-left" to="/work">
          work
        </Link>
        <Link className="homepage-big homepage-big-right" to="/play">
          play
        </Link>
      </div>
    </div>
  );
}