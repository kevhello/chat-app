import React, { Component } from 'react';
import './App.css';
import './styles/styles.css';
import PeoplesList from './components/PeoplesList';
import ChatMain from './components/ChatMain';

class App extends Component {

  render() {
    return (
      <div className="chat">
          <PeoplesList/>
          <ChatMain />
      </div>
    );
  }
}

export default App;