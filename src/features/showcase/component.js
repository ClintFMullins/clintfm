import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export function Showcase(props) {
  const style = {
    backgroundColor: `hsl(${props.hue}, 20%, 90%)`,
    border: `hsl(${props.hue}, 30%, 100%) 1px solid`,
  }

  let content = (
    <div className="showcase" style={style}>
      <div className="showcase" style={style}>
        <div className="showcase" style={style}>
          <div className="showcase" style={style}>
            <div style={{ width: '150px', height: '150px' }}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (props.link) {
    content = <Link to={props.link}>{content}</Link>;
  }

  return (
    <div className="showcase-organizer">
      {content}
    </div>
  );
}