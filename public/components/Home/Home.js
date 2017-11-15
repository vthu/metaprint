import React from 'react';
import axios from 'axios';
import { setTimeout } from 'timers';

class Home extends React.PureComponent {
  state = {
    isLoaded: false
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
        this.setState({
          isLoaded: true,
          name: user.name,
          profilePic: user.picture.data.url,
          id: user.id
        });
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
      </div>
    );
  }
}

export default Home;