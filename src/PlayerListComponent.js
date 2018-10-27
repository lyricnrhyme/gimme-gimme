import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Player from './PlayerComponent';
import Counter from './CounterComponent';

class PlayerList extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 60
    }
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.setState({
      count: this.state.count - 1
    })
=======
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
>>>>>>> 7408ecf8b252fc1a93268ec76f707c3a4e8d1c0e
  }

  render() {
    return (
      <div className="PlayerList">
<<<<<<< HEAD
        <div className='CodeCounter'>
        <h1>Put Code Here</h1>
        {/* <Counter seconds={this.state.seconds}/> */}
        {this.state.count}
=======
        <div className="room-success">Success! Room ID:
          <span>{this.props.match.params.id}</span>
>>>>>>> 7408ecf8b252fc1a93268ec76f707c3a4e8d1c0e
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
