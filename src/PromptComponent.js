import React, { Component } from 'react';
import './App.css';

class Prompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 10,
      redirect: false,
      players: null
    }
  }
  render() {
    return (
      <div className="Prompt">
        <h1>Prompt Here</h1>
      </div>
    );
  }
}

export default Prompt;
