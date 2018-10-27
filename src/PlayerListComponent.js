import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Player from './PlayerComponent';
import Counter from './CounterComponent';

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 60,
      players: null,
    }
    this.tick = this.tick.bind(this);
    this.socket = null;
    this.socket = io();
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
    let roomId = this.props.match.params.id;
    this.socket.emit('create', { roomId })
    axios.get(`/rooms/${roomId}`)
      .then(response => {
        this.setState({ players: response.data })
      })
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    return (
      <div className="PlayerList">
        <div className='CodeCounter'>
          <h1>Put Code Here</h1>
          {/* <Counter seconds={this.state.seconds}/> */}
          {this.state.count}
        </div>
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
