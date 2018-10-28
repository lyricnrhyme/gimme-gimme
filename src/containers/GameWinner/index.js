import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

class GameWinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomID: null,
      winner: null,
      winningPhoto: null,
      redirect: false,
      players: null,
    }
  }

  componentDidMount() {
    const roomID = this.props.match.params.id;
    this.setState({ roomID: roomID })
    console.log('hi ', roomID);
    axios.get(`/api/rooms/${roomID}/results`)
      .then(response => {
        console.log(response);
        this.setState({
          winner: response.data.winner.name,
          winningPhoto: response.data.winningPhoto
        })
        if (response.data.players) {
          this.setState({ players: response.data.players })
        }
      })
  }

  replay = e => {
    e.preventDefault();
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div className="GameWinner">
        <div className="game-winner">The Game Goes To{this.state.winner}!</div>
        <div className="winning-photo">
          <img src={this.state.winningPhoto} alt="" />
        </div>
        <button onClick={this.replay}>Replay</button>
      </div>
    );
  }
}

export default GameWinner;
