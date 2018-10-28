import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import RoundWinner from '../../components/RoundWinnerComponent';
import RoundCounter from '../../components/RoundCounterComponent';
import ScoreBoard from '../../components/ScoreBoardComponent';

class RoundEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      redirect: false,
      roomID: null,
      players: [],
      photo: null,
    }
    io().on('MOVE_TO_NEXT_ROUND', data => {
      this.setState({ redirect: true })
    })
  }

  componentDidMount() {
    const roomID = this.props.match.params.id;
    this.setState({ roomID: roomID })
    axios.get(`/api/rooms/${roomID}/scores`)
      .then(response => {
        this.setState({ players: response.data.players })
        this.setState({ photo: response.data.winningPhoto })
        if (response.data.redirect) {
          io().emit('REDIRECT')
        }
      })
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
    return (
      <div className="RoundEnd">
        <RoundWinner
          userName={this.props.location.state.winner}
          photo={this.state.photo}
        />
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
