import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }

    componentDidMount() {
        const chatManager = new Chatkit({
            instanceLocator: 'v1:us1:fb42d51f-260c-47be-a0b8-05d73e4aae3a',
            userId: this.props.currentUser,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        });

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser });
            })
            .catch(err => console.log('error', err));
    }



    render() {
        return (
            <div>
                <h1>Chat</h1>
            </div>
        );
    }
}

export default ChatScreen;