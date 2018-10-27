import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Player from './PlayerComponent';
import Counter from './CounterComponent';
import { Redirect } from 'react-router-dom';

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
<<<<<<< HEAD
      count: 10,
      redirect: false,
      players: null
    }
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
=======
      count: 60,
      players: null,
    }
    this.tick = this.tick.bind(this);
    this.socket = null;
    this.socket = io();
>>>>>>> development
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
    let roomId = this.props.match.params.id;
    this.socket.emit('create', {
      roomId,
      players: this.state.players
    })
    axios.get(`/rooms/${roomId}`)
      .then(response => {
        this.setState({ players: response.data })
      })
      
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    if (this.state.count === 0) {
      this.setState({
        timer: null
      })
      this.stopTimer();
      this.setState({
        redirect: true
      })
    }
    this.setState({
      count: this.state.count - 1
    })
    console.log('count', this.state.timer)
  }

  stopTimer() {
    let timer = clearInterval(this.state.timer);
    this.setState({timer})
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={`/rooms/${this.props.match.params.id}/images`} />
      )
    }
    return (
      <div className="PlayerList">
        <div className='CodeCounter'>
<<<<<<< HEAD
        <h1>Put Code Here</h1>
        <div className='countdown'>{this.state.count}</div>
=======
          <h1>Put Code Here</h1>
          {/* <Counter seconds={this.state.seconds}/> */}
          {this.state.count}
>>>>>>> development
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
