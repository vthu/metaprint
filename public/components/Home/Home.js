import React from 'react';
import axios from 'axios';
import { setTimeout } from 'timers';

class Home extends React.PureComponent {
  state = {
    isLoaded: false,
    carbonScore: 0
  }

  componentWillMount() {
    const accessToken = this.props.accessToken;
    //axios.defaults.headers.common['Authorization'] = accessToken;
    this.loadUserInfo(accessToken);
  }

  loadUserInfo = (accessToken) => {
    axios
      .get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture`)
      .then((result) => {
        const user = result.data;
        let scores = {
          carbonScore: 0,
          greenScore: 0,
          pointsEarned: 0
        }
        if ( window.localStorage.getItem('showCredits')) {
          scores = {
            carbonScore: 20,
            greenScore: 0,
            pointsEarned: 0
          }
        }
        this.setState({
          isLoaded: true,
          name: user.name,
          profilePic: user.picture.data.url,
          id: user.id,
          ...scores
        });
        window.localStorage.setItem('showCredits', true);
      })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="home-container">
          <img className="loading-icon" src="/.build/assets/loading.gif" />
        </div>
      )
    }
    return (
      <div className="home-container">
        <img src={this.state.profilePic} />
        <h2>{this.state.name}</h2>
        <h3>Carbon Score: {this.state.carbonScore}</h3>
        <hr/>
        <h3>Green Score: {this.state.greenScore}</h3>
        <hr />
        <h3>Points Earned: {this.state.pointsEarned}</h3>
        <hr />
      </div>
    );
  }
}

export default Home;