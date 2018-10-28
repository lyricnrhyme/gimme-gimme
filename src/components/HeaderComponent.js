import React, { Component } from 'react';
import './HeaderComponent.css';
import gimme from '../assets/gimme.png'

class Header extends Component {
  render() {
    console.log('gimme', gimme)
    return (
      <div className="Header">
        {/* <img src={gimme}/>   */}
        {/* <h1>Gimme Gimme</h1> */}
        {/* <button> +HELP </button> */}
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
    );
  }
}

export default Header;
