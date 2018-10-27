import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
// import io from 'socket.io-client';
import Prompt from '../containers/Prompt';
import Counter from './CounterComponent';
import Camera from './CameraComponent';

class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: null,
      roomId: null
    }
  }

  componentDidMount() {
    console.log(this.props);
    let roomId = this.props.match.params.id;
    this.setState({ roomId: roomId })
    axios.get(`/api/rooms/${roomId}/images`)
      .then(response => {
        this.setState({ prompt: response.data })
      })
  }

  render() {
    return (
      <div className="GamePlay">
        <div className='PromptCounter'>
          {
            this.state.prompt
              ? <Prompt prompt={this.state.prompt} />
              : null
          }
          <Counter />
        </div>
        {
          this.state.roomId && this.state.prompt
            ? <Camera
              roomId={this.state.roomId}
              prompt={this.state.prompt}
            />
            : null
        }
      </div>
    );
  }
}

export default GamePlay;
