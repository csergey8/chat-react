import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';
import WhosOnlineList from './WhosOnlineList';

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: []
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.sendTypingEvent =  this.sendTypingEvent.bind(this);
    }

    sendTypingEvent() {
        console.log(this.state.currentUser);
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom })
            .catch(err => console.log('error', err));
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
    }

    componentDidMount() {
        console.log(this.props.currentUsername + '!!!!');
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:fb42d51f-260c-47be-a0b8-05d73e4aae3a',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://127.0.0.1:3001/authenticate'
            })
        })
        console.log(chatManager);
        chatManager
            .connect()
            .then(currentUser => {
                console.log(currentUser);
                this.setState({ currentUser });
                return currentUser.subscribeToRoom({
                    roomId: 6895567,
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                ),
                            })
                        },
                        onUserCameOnLine: () => this.forceUpdate(),
                        onUserWentOffLine: () => this.forceUpdate(),
                        onUserJoined: () => this.forceUpdate()
                    }
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(err => console.log('error 2222', err));
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
                        <WhosOnlineList
                            currentUser={this.state.currentUser}
                            users={this.state.currentRoom.users}
                        />
                    </aside>
                    <section style={styles.chatListContainer}>
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatList}
                        />
                        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                        <SendMessageForm 
                        onSubmit={this.sendMessage}
                        onChange={this.sendTypingEvent}
                        />
                    </section>
                </div>
            </div>
        );
    }
}

export default ChatScreen;