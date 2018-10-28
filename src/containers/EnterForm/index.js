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
<<<<<<< HEAD
      return (
        <div className="EnterForm">
          <form onSubmit={this.createRoom}>
            <label>To Create Room, Enter Name:</label>
            <input
              type="text"
              name="nameInput"
              onChange={this.handleChange}
            />
            <input type="submit" value="Create" />
          </form>
          <form onSubmit={this.joinRoom} id="joinForm">
            <div>or</div>
            <div>Join Existing Room</div>
            <div className="error-message">{this.state.errorMessage}</div>
            <label>Name:</label>
            <input
              type="text"
              name="nameInput"
              onChange={this.handleChange}
            />
            <label>Room:</label>
            <input
              type="text"
              id="room-input"
              name="roomInput"
              onChange={this.handleChange}
              maxLength="6"
              autoCapitalize="none"
              autoCorrect="none"
            />
            <input type="submit" value="Join" />
          </form>
        </div>
      );
=======
    return (
      <div className="EnterForm">
        <form onSubmit={this.createRoom}>
          <label>To Create Room, Enter Name:</label>
          <input
            type="text"
            name="nameInput"
            onChange={this.handleChange}
          />
          <input type="submit" value="Create" />
        </form>
        <form onSubmit={this.joinRoom} className="joinForm">
          <div>or</div>
          <div>Join Existing Room</div>
          <label>Name:</label>
          <input
            type="text"
            name="nameInput"
            onChange={this.handleChange}
          />
          <label>Room:</label>
          <input
            type="text"
            id="room-input"
            name="roomInput"
            onChange={this.handleChange}
            maxLength="6"
            autoCapitalize="none"
            autoCorrect="none"
          />
          <input type="submit" value="Join" />
        </form>
      </div>
    );
>>>>>>> development
    }
  }
}

export default EnterForm;