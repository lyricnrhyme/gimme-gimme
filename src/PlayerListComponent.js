import React, { Component } from 'react';
import './App.css';
import Player from './PlayerComponent';import Counter from './CounterComponent';

class PlayerList extends Component {
  render() {
    return (
      <div className="PlayerList">
        <div className='CodeCounter'>
        <h1>Put Code Here</h1>
        <Counter/>
        </div>
        <h2>Players</h2>
        <Player/>
      </div>
    );
  }
}

export default PlayerList;
