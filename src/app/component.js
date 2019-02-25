import React from 'react';
import { Homepage } from '../pages/homepage/component';
import { Switch, Route } from 'react-router-dom';
import { Projects } from '../pages/projects/component';
import { Play } from '../pages/play/component';
import { Work } from '../pages/work/component';
import './styles.css';

export function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/work' component={Work}/>
        <Route exact path='/play' component={Play}/>
        <Route path='/play/' component={Projects}/>
      </Switch>
      {/* <Choice /> */}
    </>
  );
}
