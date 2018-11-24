import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrentTime } from './components/current-time/component';
import { CTA } from './components/cta/component';
import { Rhymes } from './components/rhymes/component';

export function Projects() {
  return (
    <Switch>
      <Route exact path='/projects/current-time' component={CurrentTime}/>
      <Route exact path='/projects/cta' component={CTA}/>
      <Route exact path='/projects/rhymes' component={Rhymes}/>
    </Switch>
  );
}
