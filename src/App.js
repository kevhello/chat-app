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
        console.log('newMessage', message);
        const newMessagesList = [...this.state.messagesList, message];
        this.setState({messagesList: newMessagesList});
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

  render() {
      const messages = this.state.messagesList.map((message, i) =>
          <li key={i}>{`${message.from}: ${message.text}`}</li>
      );

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
      </div>
    );
  }
}

export default App;