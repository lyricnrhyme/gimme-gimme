import React from 'react';
import Player from './PlayerComponent';
import './styles.css';

function ScoreBoard(props) {
  return (
    props.players.map(player => {
      return (
        <Player player={player} />
      )
    })
  )
}

export default ScoreBoard;
