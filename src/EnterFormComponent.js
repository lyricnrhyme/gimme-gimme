import React, { Component } from 'react';
import './App.css';

class EnterForm extends Component {
  render() {
    return (
      <div className="EnterForm">
        <form>
            <label>
                Enter code:
                <br/>
                <input name='code' type='text'/>
            </label>
            <br/><br/>
            <label>
                Enter username:
                <br/>
                <input name='username' type='text'/>
            </label>
            <div className='CreateJoin'>
                <button>Create</button>
                <button>Join</button>
            </div>
        </form>
      </div>
    );
  }
}

export default EnterForm;