import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import Prompt from '../containers/Prompt';
import Counter from './CounterComponent';
import Camera from './CameraComponent';

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: null,
      roomID: null,
      redirect: false
    }
    this.socket = io();
    this.socket.on('WINNER', username => {
      console.log(`${username} won this round!`)
      this.socket.emit('REDIRECT')
    })
    this.socket.on('MOVE_TO_NEXT_ROUND', data => {
      this.setState({ redirect: data.redirect })
    })
  }

  componentDidMount() {
    let roomID = this.props.match.params.id;
    this.setState({ roomID: roomID })
    this.socket.emit('START_GAME', {
      roomID: roomID,
    })
    axios.get(`/api/rooms/${roomID}/images`)
      .then(response => {
        this.setState({ prompt: response.data })
      })
  }

  // playerWonRound = () => {
  //   console.log('someone won');
  //   this.setState({ redirect: true })
  // }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: `/rooms/${this.state.roomID}/scores`,
          state: {
            userName: this.props.location.state.userName
          }
        }} />
      )
    }
    return (
      <div className="GamePlay">
        <div className='PromptCounter'>
          {
            this.state.prompt
              ? <Prompt prompt={this.state.prompt} />
              : null
          }
          <Counter />
        </div>
        {
          this.state.roomID
            && this.state.prompt
            && this.props.location
            ? <Camera
              roomId={this.state.roomID}
              prompt={this.state.prompt}
              user={this.props.location.state.userName}
              // roundWin={this.playerWonRound}
            />
            : null
        }
      </div>
    );
  }
}

export default GamePlay;
