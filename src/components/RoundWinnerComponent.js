import React, { Component } from 'react';
import './styles.css';

function RoundWinner(props) {
  console.log(props);
  return (
    <div className="RoundWinner">
      <div className="round-winner">{props.userName} won this round!</div>
    </div>
  );
}

export default RoundWinner;
