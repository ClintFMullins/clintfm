import React from 'react';
import { Profile } from '../profile/component';
import './styles.css';

export function NavBar() {
  return (
    <div className="nav-bar">
      <Profile />
    </div>
  );
}