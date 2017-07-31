import React, {Component} from 'react';

import MessagesList from './MessagesList';
import ChatFooter from './ChatFooter';
const moment = require('moment');

const io = require('socket.io-client');
const socket = io();

class ChatMain extends Component {

    state = {
        messagesList: [],
        disableLocBtn: false,
    };

    componentDidMount(){
        // When the client connects
        socket.on('connect', () => {
            console.log('Connected to server');

        });

        // Fires when the connection drops
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('newMessage', (message) => {
            const formattedTime = moment(message.createdAt).format('h:mm a');
            const userMessage = {
                from: message.from,
                text: message.text,
                type: 'message',
                createdAt: formattedTime,
            };

            this.setState({
                messagesList: [...this.state.messagesList, userMessage]
            });


        });

        socket.on('newLocationMessage', (message) => {
            const formattedTime = moment(message.createdAt).format('h:mm a');
            const geoMessage = {
                from: message.from,
                url: message.url,
                type: 'geoMessage',
                createdAt: formattedTime,
            };

            this.setState({
                messagesList: [...this.state.messagesList, geoMessage]
            });

        });

    }

    onLocationSend = (e) => {
        // Check if user has access to geolocation API
        if (!navigator.geolocation){
            // TODO: Replace alert with modal
            return alert('Geolocation not supported by your browser');
        }

        // This prevents the user from spamming the location button
        this.setState({disableLocBtn: true});

        // Starts the process, actively get the coordinates based off the browser
        // Function: getCurrentPosition
        // 1st arg: success callback, w/ location info
        // 2nd arg: error handler
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({disableLocBtn: false});
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }, () => {
            this.setState({disableLocBtn: false});
            alert('Unable to fetch location.');
        })
    };

    render(){
        const messages = this.state.messagesList.map((message, i) => {
            if(message.type === 'message'){
                return (
                    <li key={i} className="message">
                        <div className="message__title">
                            <h4>{message.from}</h4>
                            <span>{message.createdAt}</span>
                        </div>
                        <div className="message__body">
                            <p>{message.text}</p>
                        </div>
                    </li>
                );
            } else if (message.type === 'geoMessage'){
                return (
                    <li key={i} className="message">
                        <div className="message__title">
                            <h4>{message.from}</h4>
                            <span>{message.createdAt}</span>
                        </div>
                        <div className="message__body">
                            <p>
                                <a target="_blank" href={message.url}>My current location</a>
                            </p>
                        </div>
                    </li>
                );
            } else {
                return null;
            }
        });

        return(
            <div className="chat__main">
                <MessagesList messages={messages}/>
                <ChatFooter
                    onFormSubmit={this.onFormSubmit}
                    onLocationSend={this.onLocationSend}
                    disableLocBtn={this.disableLocBtn}
                />
            </div>
        );

    }
}

export default ChatMain;