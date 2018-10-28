import React from 'react';
import './styles.css';

function Prompt(props) {
  return (
    <div className="Prompt">
      <div className="prompt-container">
        <div>
          Gimme gimme ...
          <span>{props.prompt}</span>
        </div>
      </div>
    </div>
  );
}

export default Prompt;
