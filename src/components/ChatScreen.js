import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './MessageList';

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: []
        }
    }

    componentDidMount() {
        const chatManager = new Chatkit({
            instanceLocator: 'v1:us1:fb42d51f-260c-47be-a0b8-05d73e4aae3a',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        });

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser });
                return currentUser.subscribeToRoom({
                    roomId: 6895567,
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        }
                    }
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(err => console.log('error', err));
    }



    render() {
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
            },
            chatContainer: {
                display: 'flex',
                flex: '1'
            },
            whosOnlineListContainer: {
                width: '300px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: '#fff'
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column'
            }
        }

        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                        <h2>Who's online PLACEHOLDER</h2>
                    </aside>
                    <section style={styles.chatListContainer}>
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatList}
                        />
                    </section>
                </div>
            </div>
        );
    }
}

export default ChatScreen;