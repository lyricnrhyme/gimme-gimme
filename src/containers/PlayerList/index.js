import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import io from 'socket.io-client';
import Player from '../../components/PlayerComponent';
import Counter from '../../components/CounterComponent';
import { Redirect } from 'react-router-dom';

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 60,
      redirect: false,
      players: []
    }
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.socket = io();
    this.socket.on('JOINED', userName => {
      console.log(`${userName} has joined!`);
      if (this.props.location.state.userName !== userName) {
        this.setState({
          players: [...this.state.players, userName]
        })
      }
    })
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    let roomID = this.props.match.params.id;

    this.setState({ timer });
    this.socket.emit('JOIN', {
      roomID: roomID,
      userName: this.props.location.state.userName
    })

    axios.get(`/api/rooms/${roomID}`)
      .then(response => {
        this.setState({ players: response.data.players })
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
    // console.log('count', this.state.count)
  }

  stopTimer() {
    let timer = clearInterval(this.state.timer);
    this.setState({ timer })
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
