import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Player from './PlayerComponent';
import Counter from './CounterComponent';

class PlayerList extends Component {
  constructor() {
    super()
    this.state = {
      players: null
    }
  }

  componentDidMount() {
    let roomId = this.props.match.params.id;
    axios.get(`/rooms/${roomId}`)
      .then(response => {
        this.setState({ players: response.data })
      })
  }

  render() {
    return (
      <div className="PlayerList">
        <div className="room-success">Success! Room ID:
          <span>{this.props.match.params.id}</span>
        </div>
        <div className="player-name-list">Players Joined:</div>
        <ul>
          {this.state.players
            ? this.state.players.map((player, idx) => {
              return (
                <li key={idx}>
                  <Player player={player} />
                </li>
              )
            })
            : null
          }
        </ul>
      </div>
    );
  }
}

export default PlayerList;
