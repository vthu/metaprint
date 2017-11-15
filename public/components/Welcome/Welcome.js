import React from 'react';

class Welcome extends React.PureComponent {
  
  loginWithFacebook = () => {
    const url = 'https://www.facebook.com/dialog/oauth?client_id=281043775749725&response_type=token&scope=public_profile,email,user_friends&redirect_uri=http://www.facebook.com/connect/login_success.html';
    //window.open('https://www.facebook.com/dialog/oauth?client_id=281043775749725&response_type=token&scope=public_profile,email,user_friends&redirect_uri=http://www.facebook.com/connect/login_success.html');
    window.chrome.windows.create({
      // Just use the full URL if you need to open an external page
      url: url,
      type: "panel",
      width: 500,
      height: 500,
      top: 250,
      left: 500
    }, function(window) {

    });
    //To Fix:
    //window.localStorage.setItem('accessToken', 'EAADZCm5prfl0BAKsLP2r3e7gg7YkfxiubMQxCXyNDAXDGZCOCBY0phZAwlpjuPFZC4VuPetmBOGC7BruvytKkVgqK0h63pNflUUuRLMxL8HDxBHbIRGWAolJ0HYkBLEEyyJe2NksATzEEsbgAMT5rXNsQZBthZABmzWmsjK7uG9xGzS6uZCuWyjPVZCyQgaFQuoZD');
  } 

  render() {
    return (
      <div className="welcome-container">
        <div>
          <img className="logo" src="/.build/assets/foot.png" />
        </div>
        <div>
          <h1>Mantis</h1>
        </div>
        <div className="quote">
          <p>Measure the impact of your actions on environment & get rewarded for positive impact.</p>
        </div>
        <div className="btn-container">
          <button onClick={this.loginWithFacebook} className="loginBtn loginBtn--facebook">Join With Facebook</button>
        </div>
        <strong>Or</strong>
        <div className="btn-container">
          <button className="loginBtn loginBtn--anonymously">Join Anonymously</button>
        </div>
      </div>
    );
  }
}

export default Welcome;