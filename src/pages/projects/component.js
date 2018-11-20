import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrentTime } from '../projects/components/current-time/component';

export function Projects() {
  return (
    <Switch>
      <Route exact path='/projects/current-time' component={CurrentTime}/>
    </Switch>
  );
}
