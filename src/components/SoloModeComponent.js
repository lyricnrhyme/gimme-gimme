import React, { Component } from 'react';
import './styles.css';

class SoloMode extends Component {
  constructor(props) {
    super(props)
    this.state={
      timer: null,
      count: 12,
    }
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  tick = () => {
    if (this.state.count === 0) {
      clearInterval(this.state.timer);
    } else {
      this.setState({count: this.state.count - 1})
    }
  }

  render() {
    if (this.state.count === 0) {
      return (
        <div>
          <br/><br/>
          <div className='Doge'>
          <iframe width='100%' height='300' title="doge" src="https://www.youtube.com/embed/5dbG4wqN0rQ" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>
          <br/>
          <a href='/'>
          <div className='BackButton'>
          <div className='Text'>Back</div>
          </div>
          </a>
          </div>
        </div>
      )
    }
      return (
        <div className="SoloMode">
        <br/><br/>
          <div className='Sorry'>
            <p>
              We've noticed you've decided to go solo on your playthrough. Unfortunately we need one more player for this to actually work. While you make more friends, please enjoy this dog video.
              <br/>
              {this.state.count}
            </p>
          </div>
        </div>
      );
    }
  }

export default SoloMode;