import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Splash from '../components/Splash/Splash';
import ProfileContainer from '../containers/ProfileContainer/ProfileContainer';
import Post from '../components/Post/Post';
import CitiesContainer from '../containers/CitiesContainer/CitiesContainer';

import './Routes.css'

export default ({ currentUser, setCurrentUser }) => (
  <div className="routes">
    <Switch>
      <Route exact path="/"  render={() => <Splash currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
      <div className="non-splash-routes">
        <Route exact path="/users/:id" render={() => <ProfileContainer currentUser={currentUser} />} />
        <Route path="/post/:postId" component={Post} />
        <Route exact path="/cities/:name" component={CitiesContainer} />
        <Route exact path="/cities" component={CitiesContainer} />
      </div>
    </Switch>
  </div>
)