import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export function NavBar() {
  return (
    <div className="nav-bar">
      <Link className="profile nav-link-choice" to="/">clint.fm</Link>
      <Link className="nav-link-choice-sub nav-link-choice choice-1" to="/work">work</Link>
      <Link className="nav-link-choice-sub nav-link-choice choice-2" to="/play">play</Link>
    </div>
  );
}