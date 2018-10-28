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
<<<<<<< HEAD
      count: 3,
=======
      countdown: null,
>>>>>>> tick-tock
      redirect: false,
      players: []
    }

    this.socket = io();
    this.socket.on('JOINED', userName => {
      console.log(`${userName} has joined!`);
      if (this.props.location.state.userName !== userName) {
        this.setState({
          players: [...this.state.players, userName]
        })
      }
    })

    this.socket.on('TICK', countdown => {
      if (countdown === 0) {
        this.setState({
          redirect: true
        })
      } else {
        this.setState({
          countdown: countdown
        })
      }
    })
  }

  componentDidMount() {
    let roomID = this.props.match.params.id;

    if (this.props.location.state.roomCreated) {
      this.socket.emit('CREATE', {
        roomID: roomID,
        userName: this.props.location.state.userName
      })
    } else {
      this.socket.emit('JOIN', {
        roomID: roomID,
        userName: this.props.location.state.userName
      })
    }

    axios.get(`/api/rooms/${roomID}`)
      .then(response => {
        console.log(response.data.players)
        response.data.players.map(player => {
          this.setState({ players: [...this.state.players, player.name] })
        })
        // this.setState({ players: response.data.players })
      })
  }

  tick() {
    if (this.state.count === 0) {
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: `/rooms/${this.props.match.params.id}/images`,
          state: {
            userName: this.props.location.state.userName
          }
        }} />
      )
    }
    return (
      <div className="PlayerList">
        <div className='CodeCounter'>
          <h1>Put Code Here</h1>
          {/* <Counter seconds={this.state.seconds}/> */}
          {this.state.countdown}
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
