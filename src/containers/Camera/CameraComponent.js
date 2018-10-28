import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css';

class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      badImage: false,
      isDisabled: false,
      submitted: false
    }
  }

  handleCapture = e => {
    const file = e.target.files[0];
    this.setState({ photo: file , isDisabled: false, badImage:false})
  }

  submitPhoto = e => {
    e.preventDefault();
    this.setState({
      submitted: true
    })

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
          } else {
            this.setState({
              submitted: false,
              badImage: true,
              isDisabled: true
            })
          }
        })
    }
  }

  render() {
    return (
      <div className="Camera">
        {
          this.state.badImage
            ? <span id="camera-message">Not what I wanted! Show me something else!</span>
            : null
        }
        {
          this.state.submitted
            ? <span id="camera-message">Processing your image...</span>
            : null
        }
        <form>
          <input className="uploadFile"
            type='file'
            accept='image/*'
            capture
            onChange={this.handleCapture}
          />
          <br/>
          <button type="submit" onClick={this.submitPhoto} disabled={this.state.isDisabled} >Submit</button>
        </form>
      </div>
    );
  }
}

export default Camera;
