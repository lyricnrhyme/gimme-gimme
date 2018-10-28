import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import RoundWinner from '../../components/RoundWinnerComponent';
import RoundCounter from '../../components/RoundCounterComponent';
import ScoreBoard from '../../components/ScoreBoardComponent';

class RoundEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 15,
      redirect: false
    }
    this.tick = this.tick.bind(this);
<<<<<<< HEAD
    this.stopTimer = this.stopTimer.bind(this);
=======
>>>>>>> development
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    if (this.state.count === 0) {
      this.setState({
        timer: null
      })
      this.stopTimer();
      this.setState({
        redirect: true
      })
    }
    this.setState({
      count: this.state.count - 1
    })
  }

  stopTimer() {
    let timer = clearInterval(this.state.timer);
    this.setState({timer})
  }


  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={`/rooms/${this.props.match.params.id}/images`} />
      )
    }
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
