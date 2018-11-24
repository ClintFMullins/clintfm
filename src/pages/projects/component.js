import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrentTime } from './components/current-time/component';
import { CTA } from './components/cta/component';
import { Rhymes } from './components/rhymes/component';
import { Lavalamp } from './components/lavalamp/component';

export function Projects() {
  return (
    <Switch>
      <Route exact path='/projects/current-time' component={CurrentTime}/>
      <Route exact path='/projects/cta' component={CTA}/>
      <Route exact path='/projects/rhymes' component={Rhymes}/>
      <Route exact path='/projects/lava' component={Lavalamp}/>
    </Switch>
  );
}
