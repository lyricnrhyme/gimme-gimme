import React, { Component } from 'react';
import './styles.css';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import Prompt from '../../components/Prompt';
import Camera from '../Camera/CameraComponent';

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: null,
      countdown: null,
      roomID: null,
      redirect: false,
      winner: null
    }
    this.socket = io();

    this.socket.on('WINNER', username => {
      console.log(`${username} won this round!`)
      this.setState({
        winner: username,
        redirect: true
      })
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

    this.socket.on('PROMPT', prompt => {
      this.setState({
        prompt: prompt
      })
    })
  }

  componentDidMount() {
    let roomID = this.props.match.params.id;
    this.setState({
      roomID: roomID,
    })
    this.socket.emit('START_GAME', {
      roomID: roomID,
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: `/rooms/${this.state.roomID}/results`,
          state: {
            userName: this.props.location.state.userName,
            winner: this.state.winner || null
          }
        }} />
      )
    }
    return (
      <div className="GamePlay">
        <div className='Prompt'>
          {
            this.state.prompt
              ? <Prompt prompt={this.state.prompt} />
              : null
          }
        </div>
        <div className="countdown">
          {this.state.countdown}
        </div>
        {
          this.state.roomID
            && this.state.prompt
            && this.props.location
            ? <Camera
              roomId={this.state.roomID}
              prompt={this.state.prompt}
              user={this.props.location.state.userName}
            />
            : null
        }
      </div>
    );
  }
}

export default GamePlay;
