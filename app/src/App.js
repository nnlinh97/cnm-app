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
import History from './pages/History';
import Visit from './pages/Visit';
import Transaction from './pages/transactionDetail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={NewFeed} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateAccount} />
            <Route exact path='/payment' component={Payment} />
            <Route exact path='/tweets/:id' component={Profile} />
            <Route exact path='/visit/:id' component={Visit} />
            <Route exact path='/followings/:id' component={Following} />
            <Route exact path='/followers/:id' component={Followers} />
            <Route exact path='/history/:id' component={History} />
            <Route exact path='/transaction/:id' component={Transaction}/>
            {/* <Route exact path='/:username' component={Profile} />
            <Route exact path='/:username/followers' component={Followers} />
            <Route exact path='/:username/followings' component={Following} />
            <Route exact path='/account/register' component={Register} />
            <Route exact path='/account/payment' component={Payment} />
            <Route exact path='/account/createaccount' component={CreateAccount} /> */}

            <Route path='' component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
