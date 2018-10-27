import React, { Component } from 'react';
import './styles.css';

class Camera extends Component {
  constructor() {
    super()
    this.state = {
      photo: null
    }
  }

  handleCapture = e => {
    console.log(e.target);
  }

  submitPhoto = e => {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <div className="Camera">
        <form>
          <input
            type='file'
            accept='image/*'
            capture="environment"
            onChange={this.handleCapture}
          />
          <button onClick={this.submitPhoto}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Camera;
