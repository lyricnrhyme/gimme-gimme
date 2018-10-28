import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css';

class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null
    }
  }

  handleCapture = e => {
    const file = e.target.files[0];
    this.setState({ photo: file })
  }

  submitPhoto = e => {
    e.preventDefault();
    if (this.state.photo) {
      const form = new FormData();
      form.append('photo', this.state.photo);
      form.append('prompt', this.props.prompt);
      form.append('player', this.props.user)

      axios.post(`/api/rooms/${this.props.roomId}/images`, form)
        .then(response => {
          if (response.data.success) {
            io().emit('WIN_ROUND', {
              roomID: this.props.roomId,
              userName: this.props.user
            })
          }
        })
    }
  }

  render() {
    return (
      <div className="Camera">
        <form>
          <input
            type='file'
            accept='image/*'
            capture
            onChange={this.handleCapture}
          />
          <button onClick={this.submitPhoto}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Camera;
