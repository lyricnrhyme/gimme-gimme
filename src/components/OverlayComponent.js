import React, { Component } from 'react';
import './OverlayComponent.css';

class Overlay extends Component {
  render() {
    return (
      <div id="overlay">
        <div id="displayMessage">
          For mobile phones only :(
        </div>
      </div>
    );
  }
}

export default Overlay;
