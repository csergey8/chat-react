import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatScreen';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    console.log('fetching');
    fetch('http://127.0.0.1:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(res => {
        console.log('YES')
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      .catch(err => console.log('error', err))
  }


  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
    return <UsernameForm onSubmit={this.onUsernameSubmitted} />;
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
};

export default App;
