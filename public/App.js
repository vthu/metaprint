import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome/Welcome.js';
import Home from './components/Home/Home.js';

class App extends React.PureComponent {
  state = {
    active: 'Welcome',
    accessToken: null
  };

  componentWillMount() {
    const accessToken = window.localStorage.getItem('accessToken');
    if(accessToken) {
      this.setState({ active: 'Home', accessToken  })
    } 
  }

  render() {
    switch(this.state.active) {
      case 'Welcome': 
        return (
          <div style={{ width: 300, height: 500 }}>
            <Welcome />
          </div>
        );
      case 'Home':
        return (
          <div style={{ width: 300, height: 500 }}>
            <Home accessToken={this.state.accessToken} />
          </div>
        );
      default:
        return null;
    }
  }
};



ReactDOM.render(<App />, document.getElementById('root'));

//For Tracking
function onFacebookLogin() {
  var successURL = 'www.facebook.com/connect/login_success.html';
  if (!localStorage.getItem('accessToken')) {
    chrome.tabs.query({ }, function(tabs) { // get all tabs from every window
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url.indexOf(successURL) !== -1) {
          // below you get string like this: access_token=...&expires_in=...
          var params = tabs[i].url.split('#')[1];

          // in my extension I have used mootools method: parseQueryString. The following code is just an example ;)
          var accessToken = params.split('&')[0];
          accessToken = accessToken.split('=')[1];

          localStorage.setItem('accessToken', accessToken);
          chrome.tabs.remove(tabs[i].id);
        }
      }
    });
  }
}
window.chrome.tabs.onUpdated.addListener(onFacebookLogin);