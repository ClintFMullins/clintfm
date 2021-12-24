import React from "react";
import { Switch, Route } from "react-router-dom";
import { CurrentTime } from "./components/current-time/component";
import { FlightFilms } from "./components/flightfilms/component";
import { CTA } from "./components/cta/component";
import { Rhymes } from "./components/rhymes/component";
import { Lavalamp } from "./components/lavalamp/component";
import { Mating } from "./components/mating/component";
import { MusicSequence } from "./components/music/component";
import { tutorialSVG } from "../../features/svg/component";
import { PS1Gen } from "../../features/ps1/component";
import { LevelUp } from "../../features/level-up/component";
import { StoryTime } from "../../features/storytime/component";
import { Reddit } from "../../features/reddit/component";
import { Versus } from "../../features/versus/component";
import { Decode } from "../../features/decode/component";

export function Projects() {
  return (
    <Switch>
      <Route exact path="/play/current-time" component={CurrentTime} />
      <Route exact path="/play/cta" component={CTA} />
      <Route exact path="/play/rhymes" component={Rhymes} />
      <Route exact path="/play/lava" component={Lavalamp} />
      <Route exact path="/play/creatures" component={Mating} />
      <Route exact path="/play/sequence" component={MusicSequence} />
      <Route exact path="/play/svg" component={tutorialSVG} />
      <Route exact path="/play/prompt" component={PS1Gen} />
      <Route exact path="/play/level" component={LevelUp} />
      <Route exact path="/play/story" component={StoryTime} />
      <Route exact path="/play/reddit" component={Reddit} />
      <Route exact path="/play/versus" component={Versus} />
      <Route exact path="/play/flight" component={FlightFilms} />
      <Route exact path="/play/decode" component={Decode} />
    </Switch>
  );
}
