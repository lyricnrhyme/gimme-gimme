import React, { Component } from 'react';
import './App.css';
import Player from './PlayerComponent';import Counter from './CounterComponent';

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 60
    }
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    return (
      <div className="PlayerList">
        <div className='CodeCounter'>
        <h1>Put Code Here</h1>
        {/* <Counter seconds={this.state.seconds}/> */}
        {this.state.count}
        </div>
        <h2>Players</h2>
        <Player/>
      </div>
    );
  }
}

export default PlayerList;
