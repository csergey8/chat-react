import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: '',
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
          currentUsername: username
        })
      })
      .catch(err => console.log('error', err))
  }


  render() {
    return <UsernameForm onSubmit={this.onUsernameSubmitted} />
  }
};

export default App;
