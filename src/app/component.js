import React from 'react';
import { Homepage } from '../pages/homepage/component';
import { Navigation } from '../features/navigation/component';
import { Switch, Route } from 'react-router-dom'
import { Projects } from '../pages/projects/component';
import './style.css';

export function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/projects' component={Projects}/>
      </Switch>
    </>
  );
}
