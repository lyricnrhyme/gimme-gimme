import React from 'react';
import Player from './PlayerComponent';
import './styles.css';

function ScoreBoard(props) {
  return (
    props.players.map((player, idx) => {
      return (
        <Player player={player} key={idx} />
      )
    })
  )
}

export default ScoreBoard;
