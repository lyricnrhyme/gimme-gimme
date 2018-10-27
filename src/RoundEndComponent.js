import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import RoundWinner from './RoundWinnerComponent';
import RoundCounter from './RoundCounterComponent';
import ScoreBoard from './ScoreBoardComponent';

class RoundEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 10,
      redirect: false
    }
    this.tick = this.tick.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    let timer;
    if (this.state.count !== 0) {
      let timer = setTimeout(this.tick, 1000);
      this.setState({timer});
    } else {
      timer = clearInterval(this.tick);
      this.setState({timer});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  stopTimer() {
    let timer = clearInterval(this.state.timer);
    this.setState({timer})
  }

  tick() {
    this.setState({
      count: this.state.count - 1
    })
  }


  render() {

    return (
      <div className="RoundEnd">
        <RoundWinner/>
        {this.state.count}
        <ScoreBoard/>
      </div>
    );
  }
}

export default RoundEnd;
