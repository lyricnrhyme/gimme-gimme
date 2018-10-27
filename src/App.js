import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

class App extends Component {

  componentDidMount() {
    axios.get('http://localhost:8989/')
      .then(result => {
        console.log(result.data);
        // io('http://localhost:8989/');
      })
  }

  render() {
    return (
      null
    );
  }
}

export default App;
