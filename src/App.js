import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        const userMessage = {
            from: message.from,
            text: message.text,
            type: 'message'
        };

        this.setState({
            messagesList: [...this.state.messagesList, userMessage]
        });
    });

    socket.on('newLocationMessage', (message) => {
        const geoMessage = {
            from: message.from,
            url: message.url,
            type: 'geoMessage'
        };

        this.setState({
            messagesList: [...this.state.messagesList, geoMessage]
        });
    });

  }

  state = {
      inputMessage: '',
      messagesList: [],
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

      // Starts the process, actively get the coordinates based off the browser
      // Function: getCurrentPosition
      // 1st arg: success callback, w/ location info
      // 2nd arg: error handler
      navigator.geolocation.getCurrentPosition(position => {
          socket.emit('createLocationMessage', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
          });
      }, () => {
          alert('Unable to fetch location.');
      })
  };

  render() {
      const messages = this.state.messagesList.map((message, i) => {
          if(message.type === 'message'){
              return (<li key={i}>{`${message.from}: ${message.text}`}</li>);
          } else if (message.type === 'geoMessage'){
              return (
                  <li key={i}>
                      {`${message.from}: `}
                      <a target="_blank" href={message.url}>My current location</a>
                  </li>);
          }
      });

    return (
      <div className="App">
          <ol id="messages">
              {messages}
          </ol>

        <form id="message-form" onSubmit={this.onFormSubmit}>
            <input
                name="message"
                value={this.state.inputMessage}
                type="text"
                placeholder="Enter message"
                onChange={this.onInputChange}
            />
            <button onClick={this.onFormSubmit}>Send</button>
        </form>
          <button
              id="send-location"
              onClick={this.onLocationSend}
          >Send Location</button>
      </div>
    );
  }
}

export default App;