import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';

import RoundWinner from '../../components/RoundWinnerComponent';
import RoundCounter from '../../components/RoundCounterComponent';
import ScoreBoard from '../../components/ScoreBoardComponent';

class RoundEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      count: 10,
      redirect: false,
      players: []
    }
    // this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const roomID = this.props.match.params.id;
    // let timer;
    // if (this.state.count !== 0) {
    //   let timer = setTimeout(this.tick, 1000);
    //   this.setState({timer});
    // } else {
    //   timer = clearInterval(this.tick);
    //   this.setState({timer});
    // }
    axios.get(`/api/rooms/${roomID}/scores`)
      .then(response => {
        this.setState({ players: response.data })
      })
  }

  // componentWillUnmount() {
  //   clearInterval(this.state.timer);
  // }

  // stopTimer() {
  //   let timer = clearInterval(this.state.timer);
  //   this.setState({timer})
  // }

  // tick() {
  //   this.setState({
  //     count: this.state.count - 1
  //   })
  // }


  render() {
    return (
      <div className="RoundEnd">
        <RoundWinner userName={this.props.location.state.winner} />
        {this.state.count}
        {
          this.state.players
            ? <ScoreBoard players={this.state.players} />
            : null
        }
      </div>
    );
  }
}

export default RoundEnd;
