import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import User from './pages/User';
//import UserDetails from './pages/UserDetails';

export default function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/user/:id" exact component={User} />
        {/**<Route path="/user/:id/detail" exact component={UserDetails} /> **/}
      </Switch>
    </BrowserRouter>
  );
}
