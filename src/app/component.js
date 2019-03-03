import React, { useEffect } from 'react';
import { Homepage } from '../pages/homepage/component';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Projects } from '../pages/projects/component';
import { Play } from '../pages/play/component';
import { Work } from '../pages/work/component';
import './styles.css';

function ScrollToTopRaw({ location, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
}

const ScrollToTop = withRouter(ScrollToTopRaw);

export function App() {
  return (
    <ScrollToTop>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/work' component={Work}/>
        <Route exact path='/play' component={Play}/>
        <Route path='/play/' component={Projects}/>
      </Switch>
      {/* <Choice /> */}
    </ScrollToTop>
  );
}
