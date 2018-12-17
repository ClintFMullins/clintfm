import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomepageLink, ChoiceContainer, Profile } from './styles.js';

function HomepageChoice() {
  return <Profile>clint.fm</Profile>;
}

function EverywhereElse() {
  return (
    <>
      <HomepageLink isLeft={true} to="/work">
        w
      </HomepageLink>
      <HomepageLink isLeft={false} to="/play">
        p
      </HomepageLink>
    </>
  );
}

export function Choice() {
  return (
    <ChoiceContainer>
      <Switch>
        <Route exact path='/' component={HomepageChoice}/>
        <Route path='/' component={EverywhereElse}/>
      </Switch>
    </ChoiceContainer>
  );
}