import React, { Component } from 'react';
import './styles.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// containers
import EnterForm from '../EnterForm';
import PlayerList from '../PlayerList';
import GamePlay from '../GamePlay';
import RoundEnd from '../RoundEnd';


// components
import Header from '../../components/HeaderComponent';
import GameWinner from '../GameWinner';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact={true} path='/' component={EnterForm} />
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
