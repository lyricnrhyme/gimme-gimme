import React, { Component } from 'react';
import './App.css';

import RoundWinner from './RoundWinnerComponent';
import RoundCounter from './RoundCounterComponent';
import ScoreBoard from './ScoreBoardComponent';

class RoundEnd extends Component {
  render() {
    return (
      <div className="RoundEnd">
        <RoundWinner/>
        <RoundCounter/>
        <ScoreBoard/>
      </div>
    );
  }
}

export default RoundEnd;
