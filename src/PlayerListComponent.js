import React, { Component } from 'react';
import './App.css';
import Player from './PlayerComponent';

class PlayerList extends Component {
  render() {
    return (
      <div className="PlayerList">
        <h1>Put Code Here</h1>
        <h2>Players</h2>
        <Player/>
      </div>
    );
  }
}

export default PlayerList;
