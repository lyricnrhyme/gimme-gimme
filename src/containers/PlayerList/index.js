import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import io from 'socket.io-client';
import Player from '../../components/PlayerComponent';
import { Redirect } from 'react-router-dom';

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      countdown: null,
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
        return this.setState({
          players: [...response.data.players]
        })
      })
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
        <div className="loader" id="loader1"></div>
        <div className="loader" id="loader2"></div>
        <div className="loader" id="loader3"></div>


        <div className='CodeCounter'>
          {this.state.countdown}
        </div>
        <div className="room-success">Success! Room ID:
          <span>{this.props.match.params.id}</span>
        </div>
        <div className="player-name-list">Players Joined:</div>
        <div className="players-list">
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
      </div>
    );
  }
}

export default PlayerList;
