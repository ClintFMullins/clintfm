import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export function Showcase(props) {
  return (
    <Link to={props.link}>
      <div className="showcase">
        {props.children}
      </div>
    </Link>
  )
}