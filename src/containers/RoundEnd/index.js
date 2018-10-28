import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import RoundWinner from '../../components/RoundWinnerComponent';
import RoundCounter from '../../components/RoundCounterComponent';
import ScoreBoard from '../../components/ScoreBoardComponent';
import Counter from '../../components/CounterComponent';

class RoundEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.socket = io();
    this.socket.on('ROUND_END', countdown => {
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
    this.socket.emit('WIN_ROUND', {
      roomID: roomID
    })
    axios.get(`/api/rooms/${roomID}/scores`)
      .then(response => {
        this.setState({ players: response.data })
      })
      console.log('???', this.state.countdown)
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={`/rooms/${this.props.match.params.id}/images`} />
      )
    }
    return (
      <div className="RoundEnd">
        <RoundWinner userName={this.props.location.state.winner} />
        {this.state.countdown}
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
