import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatsScreen';

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
    fetch('http://localhost:3001/users', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(res => {
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      .catch(err => console.log('error', err))
  }


  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
    return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentScreen} />
    }
  }
};

export default App;
