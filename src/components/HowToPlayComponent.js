import React from 'react';
import './styles.css';

function HowToPlay(props) {
  return (
    <div>
        <br/><br/>
        <div className="HowToPlay">
            <h1>How To Play</h1>
            <hr/>
            <h3>Gimme Gimme is a game where you must race to take a photo of an item based on given keywords. First person to submit the right image wins!</h3>
            <ul>
                <li>- Gameplays consist of three rounds</li>
                <li>- You can create a room or join a room. If you choose to create a room, remember to share the room code with your friends!</li>
                <li>- Upload your most accurate photo based on the prompt</li>
                <li>- The round ends when the first peron submits the correct photo, points are tallied at the end of each round</li>
            </ul>
        </div>
    </div>
  );
}

export default HowToPlay;
