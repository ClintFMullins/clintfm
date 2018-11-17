import React, { useState } from 'react';
import { Homepage } from '../pages/homepage/component';
import { Switch, Route } from 'react-router-dom'
import './style.css';

function App() {
  const [state, setState] = useState(0);

  return (
    <Switch>
      <Route exact path='/' component={Homepage}/>
    </Switch>
  );
}

export default App;
