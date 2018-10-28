import React, { Component } from 'react';
import './styles.css';

function RoundWinner(props) {
  return (
    <div className="RoundWinner">
      <div className="round-winner">{props.userName} won this round!</div>
      <div className="photo-container">
        <img src={props.photo} alt="" />
      </div>
    </div>
  );
}

export default RoundWinner;
