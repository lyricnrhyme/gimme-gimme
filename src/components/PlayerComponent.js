import React from 'react';
import './styles.css';

function Player(props) {
  return (
    <div className="Player">
      {
        props.player.name
          ? <div className="player-name">{props.player.name}</div>
          : <div className="player-name">{props.player}</div>
      }
      {/* {
        props.player.score
          ? <div className="player-score">{props.player.score}</div>
          : null
      } */}
    </div>
  );
}

export default Player;
