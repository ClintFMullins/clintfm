import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrentTime } from './components/current-time/component';
import { CTA } from './components/cta/component';
import { Rhymes } from './components/rhymes/component';
import { Lavalamp } from './components/lavalamp/component';
import { CreaturePresentation } from './components/creature-presentation/component';

export function Projects() {
  return (
    <Switch>
      <Route exact path='/play/current-time' component={CurrentTime}/>
      <Route exact path='/play/cta' component={CTA}/>
      <Route exact path='/play/rhymes' component={Rhymes}/>
      <Route exact path='/play/lava' component={Lavalamp}/>
      <Route exact path='/play/creature' component={CreaturePresentation}/>
    </Switch>
  );
}