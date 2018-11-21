import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export function Showcase(props) {
  const style = {
    backgroundColor: `hsl(${props.hue}, 20%, 90%)`,
    border: `hsl(${props.hue}, 30%, 100%) 1px solid`,
  }

  return (
    <Link to={props.link}>
      <div className="showcase" style={style}>
        <div className="showcase" style={style}>
          <div className="showcase" style={style}>
            <div className="showcase" style={style}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}