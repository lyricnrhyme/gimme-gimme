import React, { Component } from 'react';
import './styles.css';

class SoloMode extends Component {
  constructor(props) {
    super(props)
    this.state={
      timer: null,
      count: 10,
      redirect: false
    }
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  tick = () => {
    if (this.state.count === 0) {
      this.setState({redirect: true})
      clearInterval(this.state.timer);
    } else {
      this.setState({count: this.state.count - 1})
    }
  }

  render() {
    if (this.state.redirect) {

    } else {
      return (
        <div className="SoloMode">
        <br/><br/>
          <div className='Sorry'>
            <p>
              We've noticed you've decided to go solo on your playthrough. Unfortunately we need one more player for this to actually work. While you make more friends, please enjoy this playlist of dog videos we've made for you.
            </p>
          </div>
        </div>
      );
    }
  }
}

export default SoloMode;