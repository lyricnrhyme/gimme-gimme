import React, { Component } from 'react';
import './styles.css';

import Prompt from '../containers/Prompt';
import Counter from './CounterComponent';
import Camera from './CameraComponent';

class GamePlay extends Component {
  render() {
    return (
      <div className="GamePlay">
        <div className='PromptCounter'>
          <Prompt/>
          <Counter/>
        </div>
        <Camera/>
      </div>
    );
  }
}

export default GamePlay;
