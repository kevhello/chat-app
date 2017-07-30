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


        socket.emit('createMessage', {
            from: 'Kev',
            text: 'Yup'
        });
    });

    // Fires when the connection drops
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('newMessage', (message) => {
        console.log('newMessage', message);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
