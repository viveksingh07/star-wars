import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import PlanetsContainer from './components/PlanetsContainer';
import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/planets' component={PlanetsContainer} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
