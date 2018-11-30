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
            <Route exact path='/:username/followers' component={Followers} />
            <Route exact path='/:username/followings' component={Following} />
            <Route exact path='/' component={Login} />
            <Route path='' component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
