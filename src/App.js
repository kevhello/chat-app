import React, { Component } from 'react';
import './App.css';
import './styles/styles.css';
import PeoplesList from './components/PeoplesList';
const moment = require('moment');

const io = require('socket.io-client');
const socket = io();


class App extends Component {
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
            time: formattedTime,
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
            time: formattedTime,
        };

        this.setState({
            messagesList: [...this.state.messagesList, geoMessage]
        });
    });

  }

  state = {
      inputMessage: '',
      messagesList: [],
      disableLocBtn: false,
  };

  onInputChange = (e) => {
      this.setState({inputMessage: e.target.value});
  };

  onFormSubmit = (e) => {
      e.preventDefault();

      socket.emit('createMessage', {
          from: 'User',
          text: this.state.inputMessage,
      }, () => {

      });

      this.setState({inputMessage: ''});

  };

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

  render() {
      const messages = this.state.messagesList.map((message, i) => {
          if(message.type === 'message'){
              return (<li key={i}>{`${message.from} ${message.time}: ${message.text}`}</li>);
          } else if (message.type === 'geoMessage'){
              return (
                  <li key={i}>
                      {`${message.from} ${message.time}: `}
                      <a target="_blank" href={message.url}>My current location</a>
                  </li>);
          }
      });

    return (
      <div className="chat">
          <PeoplesList/>
          <div className="chat__main">
              <ol id="messages" className="chat__messages">
                  {messages}
              </ol>

              <div className="chat__footer">
                  <form id="message-form" onSubmit={this.onFormSubmit}>
                      <input
                          name="message"
                          value={this.state.inputMessage}
                          type="text"
                          placeholder="Enter message"
                          onChange={this.onInputChange}
                          autoFocus
                          autoComplete="off"
                      />
                      <button onClick={this.onFormSubmit}>Send</button>
                  </form>
                  <button
                      id="send-location"
                      onClick={this.onLocationSend}
                      disabled={this.state.disableLocBtn}
                  >
                      {this.state.disableLocBtn ?
                          'Sending location...' :
                          'Send location'}
                  </button>
              </div>
          </div>
      </div>
    );
  }
}

export default App;