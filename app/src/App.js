import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Profile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Login from './pages/Login';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/:username' component={Profile} />
            <Route path='/' component={Login} />
            <Route path='/:username/followers' component={Followers} />
            <Route path='/:username/following' component={Following} />
            <Route path='' component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
