import React, { Component } from 'react';
import './App.css';

class EnterForm extends Component {
    createRoom = () => {

    }

    joinRoom = () => {

    }

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
                <button onClick={this.createRoom}>Create</button>
                <button onClick={this.joinRoom}>Join</button>
            </div>
        </form>
      </div>
    );
  }
}

export default EnterForm;