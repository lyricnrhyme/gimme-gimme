import React, { Component } from 'react';
import './App.css';

class Camera extends Component {
  render() {
    return (
      <div className="Camera">
        <form>
            <input type='file' accept='capture'/>
        </form>
      </div>
    );
  }
}

export default Camera;
