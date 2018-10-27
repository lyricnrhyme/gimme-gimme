import React from 'react';
import './styles.css';

function Prompt(props) {
  console.log(props);
  return (
    <div className="Prompt">
      <div className="prompt-container">
        <div>
          Gimme gimme something...
          <span>{props.prompt}</span>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
