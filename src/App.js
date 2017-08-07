import React, { Component } from 'react';
import './styles/temp/styles.css'
import ChatMain from './components/ChatMain';
import JoinPage from './components/JoinPage';


class App extends Component {
  state = {
      displayName: '',
      roomName: '',
      shouldRenderChat: false,
  };

  onSubmitDisplayRoom = (displayName, roomName) => {
      this.setState({displayName, roomName, shouldRenderChat: true});
  };

  render() {
    return (
        this.state.shouldRenderChat ?
            <ChatMain
                displayName={this.state.displayName}
                roomName={this.state.roomName}
                socket={this.socket}
            />
            :
            <JoinPage
                onSubmitDisplayRoom={this.onSubmitDisplayRoom}
            />
    );
  }
}

export default App;