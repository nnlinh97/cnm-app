import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Profile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateAccount from './pages/CreateAccount';
import Payment from './pages/Payment';
import NewFeed from './pages/NewFeed';


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
            <Route exact path='/account/register' component={Register} />
            <Route exact path='/account/payment' component={Payment} />
            <Route exact path='/account/createaccount' component={CreateAccount} />
            <Route exact path='/newfeed/a' component={NewFeed} />

            <Route path='' component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
