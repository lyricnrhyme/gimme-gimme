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
      finalRedirect: false,
      finalWinner: null,
      countdown: null,
      roomID: null,
      players: [],
      photo: null,
      redirect: false,
      winner: null
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
        // response.data.players.map(player => {
        //   if (player.score > 2) {
        //     return this.setState({
        //       finalWinner: player,
        //       finalRedirect: true
        //     })
        //   }
        // })
        this.setState({ winner: response.data.winner })
        this.setState({ players: response.data.players })
        this.setState({ photo: response.data.winningPhoto })
        io().emit('END_ROUND', { roomID: roomID });
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
    // if (this.state.finalRedirect) {
    //   return (
    //     <Redirect to={{
    //       pathname: `/rooms/${this.state.roomID}/results`,
    //       state: {
    //         userName: this.props.location.state.userName,
    //         winner: this.state.finalWinner
    //       }
    //     }} />
    //   )
    // }
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
      </div >
    );
  }
}
export default RoundEnd;
