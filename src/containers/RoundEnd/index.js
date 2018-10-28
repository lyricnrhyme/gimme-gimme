import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import RoundWinner from '../../components/RoundWinnerComponent';
import ScoreBoard from '../../components/ScoreBoardComponent';

class RoundEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      finalRedirect: false,
      countdown: null,
      roomID: null,
      players: [],
      photo: null,
    }
    this.socket = io();
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
    const roomID = this.props.match.params.id;
    this.setState({ roomID: roomID })
    axios.get(`/api/rooms/${roomID}/scores`)
      .then(response => {
        if (!response.data.round) {
          return this.setState({ finalRedirect: true })
        } else {
          this.setState({ players: response.data.players })
          this.setState({ photo: response.data.winningPhoto })
          io().emit('END_ROUND', { roomID: roomID });
        }
      })
  }

  tick() {
    if (this.state.countdown === 0) {
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    if (this.state.redirect && this.props.location.state) {
      return (
        <Redirect to={{
          pathname: `/rooms/${this.state.roomID}/images`,
          state: {
            userName: this.props.location.state.userName
          }
        }} />
      )
    }
    if (this.state.finalRedirect) {
      return (
        <Redirect to={{
          pathname: `/rooms/${this.state.roomID}/results`,
          state: {
            userName: this.props.location.state.userName
          }
        }} />
      )
    }
    return (
      <div className="RoundEnd">
        <RoundWinner
          userName={this.props.location.state.winner}
          photo={this.state.photo}
        />
        <div className='CodeCounter'>
          {this.state.countdown}
        </div>
        {
          this.state.players
            ? <ScoreBoard players={this.state.players} />
            : null
        }
      </div>
    );
  }
}

export default RoundEnd;
