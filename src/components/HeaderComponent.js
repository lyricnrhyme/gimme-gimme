import React, { Component } from 'react';
import './HeaderComponent.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className='Rules'><button>How to Play</button></div>
        <div>
        <h1>
          <span>G</span>
          <span>I</span>
          <span>M</span>
          <span>M</span>
          <span>E</span>
          <br/>
          <span>G</span>
          <span>I</span>
          <span>M</span>
          <span>M</span>
          <span>E</span>
        </h1>
        </div>
      </div>
    );
  }
}

export default Header;
