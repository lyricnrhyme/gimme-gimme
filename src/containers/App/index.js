import React, { Component } from 'react';
import './styles.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// containers
import EnterForm from '../EnterForm';
import PlayerList from '../PlayerList';
import GamePlay from '../GamePlay';
import GameWinner from '../GameWinner';
import RoundEnd from '../RoundEnd';

// components
import Header from '../../components/HeaderComponent';
import SoloMode from '../../components/SoloModeComponent';
import Overlay from '../../components/OverlayComponent';
import HowToPlay from '../../components/HowToPlayComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Overlay />
        <Header />
        <Router>
          <Switch>
            <Route exact={true} path='/' component={EnterForm} />
            <Route path='/solo' component={SoloMode} />
            <Route path='/howtoplay' component={HowToPlay} />
            <Route exact={true} path='/rooms' component={EnterForm} />
            <Route path='/rooms/:id/solo' component={SoloMode} />
            <Route path='/rooms/:id/images' component={GamePlay} />
            <Route path='/rooms/:id/scores' component={RoundEnd} />
            <Route path='/rooms/:id/results' component={GameWinner} />
            <Route path='/rooms/:id' component={PlayerList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
