import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import './styles.css';

class EnterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      createNameInput: '',
      joinNameInput: '',
      roomInput: '',
      roomId: '',
      redirect: false
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
    axios.post('/rooms', { player: this.state.createNameInput })
      .then(response => {
        this.socket = io();
        this.setState({ roomId: response.data })
        this.setState({ redirect: true })
      })
  }

  joinRoom = e => {
    e.preventDefault();
    axios.post(`/rooms/${this.state.roomInput}`, { player: this.state.joinNameInput })
      .then(response => {
        this.setState({ roomId: response.data })
        this.setState({ redirect: true })
      })
  }

  render() {
    if (this.state.redirect && this.state.roomId.length > 0) {
      return (
        <Redirect to={`/rooms/${this.state.roomId}`} />
      )
    }
    return (
      <div className="EnterForm">
        <form>
          <label>To Create Room, Enter Name:</label>
          <input
            type="text"
            name="createNameInput"
            onChange={this.handleChange}
          />
            <button onClick={this.createRoom}>Create</button>
          <div>or</div>
          <div>Join Existing Room</div>
          <label>Name:</label>
          <input
            type="text"
            name="joinNameInput"
            onChange={this.handleChange}
          />
          <label>Room:</label>
          <input
            type="text"
            id="room-input"
            name="roomInput"
            onChange={this.handleChange}
            maxLength="6"
          />
          <button onClick={this.joinRoom}>Join</button>
        </form>
      </div>
    );
  }
}

export default EnterForm;