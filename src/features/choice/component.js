import React from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import './styles.css';

function HomepageChoice() {
  return <div className="profile">clint.fm</div>;
}

function EverywhereElse() {
  return (
    <>
      <Link className="choice choice-left" to="/work">
        w
      </Link>
      <Link className="choice choice-right" to="/play">
        p
      </Link>
    </>
  );
}

export function Choice() {
  return (
    <div className="choice-container">
      <Switch>
        <Route exact path='/' component={HomepageChoice}/>
        <Route path='/' component={EverywhereElse}/>
      </Switch>
    </div>
  );
}