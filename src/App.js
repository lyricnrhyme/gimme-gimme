import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from './HeaderComponent';
import EnterForm from './EnterFormComponent';
import PlayerList from './PlayerListComponent';
import GamePlay from './GamePlayComponent';
import RoundEnd from './RoundEndComponent';
import GameWinner from './GameWinnerComponent';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact={true} path='/' component={EnterForm} />
            <Route path='/rooms/:id' component={PlayerList} />
            <Route path='/rooms/:id/images' component={GamePlay} />
            <Route path='/rooms/:id/scores' component={RoundEnd} />
            <Route path='/rooms/:id/results' component={GameWinner} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
