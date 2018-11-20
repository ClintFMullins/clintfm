import React from 'react';
import { Homepage } from '../pages/homepage/component';
import { Switch, Route } from 'react-router-dom';
import { Projects } from '../pages/projects/component';
import './style.css';

export function App() {
  return (
    <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route path='/projects' component={Projects}/>
    </Switch>
  );
}
