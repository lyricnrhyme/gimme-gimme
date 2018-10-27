import React, { Component } from 'react';
import './App.css';

class GameWinner extends Component {
  render() {
    return (
      <div className="GameWinner">
        <h1>Dis Player Won</h1>
        <button>Replay</button>
      </div>
    );
  }
}

export default GameWinner;
