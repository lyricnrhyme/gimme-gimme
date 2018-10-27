import React, { Component } from 'react';
import './styles.css';
import { Redirect } from 'react-router-dom';

import Prompt from '../Prompt';
import Camera from '../../components/CameraComponent';

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 60,
      redirect: false
    }
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
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
        <Redirect to={`/rooms/${this.props.match.params.id}/scores`}/>
      )
    }
    return (
      <div className="GamePlay">
        <div className='PromptCounter'>
          <Prompt/>
          {this.state.count}
        </div>
        <Camera/>
      </div>
    );
  }
}

export default GamePlay;
