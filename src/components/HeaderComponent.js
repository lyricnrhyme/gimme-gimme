import React, { Component } from 'react';
import './HeaderComponent.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    backgroundColor: 'rgba(255,255,255,0)',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border: 'none'
  }
};

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  voteForMoar = e => {
    e.preventDefault();
    window.open('https://www.nodeknockout.com/entries/113-gimme-moar/vote', '_blank');
  }


  render() {
    return (
      <div className="Header">
        <div id='Rules'>
          <button onClick={this.voteForMoar}>Vote for us!</button>
          <button onClick={this.openModal}>How to Play</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
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
            <button onClick={this.closeModal}>close</button>
        </div>
        </Modal>
        <div>
        <h1>
          <span>G</span>
          <span>I</span>
          <span>M</span>
          <span>M</span>
          <span>E</span>
          <br/>
          <span>G</span>
          <span>I</span>
          <span>M</span>
          <span>M</span>
          <span>E</span>
        </h1>
        </div>
      </div>
    );
  }
}

export default Header;
