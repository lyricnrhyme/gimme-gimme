import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import './styles.css';

class EnterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      roomCreated: false,
      nameInput: '',
      roomInput: '',
      roomID: '',
      redirect: false,
      errorMessage: null,
    }
    this.socket = null;
  }

  handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value
    })
  }

  createRoom = e => {
    e.preventDefault();
    axios.post('/api/rooms', { playerName: this.state.nameInput })
      .then(response => {
        this.socket = io();
        this.setState({
          roomCreated: true,
          roomID: response.data.roomID,
          redirect: true
        })
      })
      .catch(err => {
        console.log(err);

      })
  }

  joinRoom = e => {
    e.preventDefault();
    axios.post(`/api/rooms/${this.state.roomInput}`, { playerName: this.state.nameInput })
      .then(response => {
        if (response.data.message) {
          this.setState({ errorMessage: response.data.message })
        } else {
          this.setState({
            roomID: response.data.roomID,
            redirect: true
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    if (this.state.redirect && this.state.roomID.length > 0) {
      return (
        <Redirect to={{
          pathname: `/rooms/${this.state.roomID}`,
          state: {
            roomCreated: this.state.roomCreated,
            userName: this.state.nameInput
          }
        }} />
      )
    } else {
      return (
        <div className="EnterForm">
          <form onSubmit={this.createRoom}>
            <label>Create Room</label>
            <input
              type="text"
              name="nameInput"
              onChange={this.handleChange}
              placeholder="player name"
            />
            <input type="submit" value="Create" />
          </form>
          <form onSubmit={this.joinRoom} id="joinForm">
            <div>Join Existing Room</div>
            <div className="error-message">{this.state.errorMessage}</div>
            <input
              type="text"
              name="nameInput"
              onChange={this.handleChange}
              placeholder="player name"
            />
            <input
              type="text"
              id="room-input"
              name="roomInput"
              onChange={this.handleChange}
              maxLength="6"
              autoCapitalize="none"
              autoCorrect="none"
              placeholder="room id"
            />
            <input type="submit" value="Join" />
          </form>
        </div>
      );
    }
  }
}

export default EnterForm;