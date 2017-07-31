import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class MessagesList extends Component {
    componentDidUpdate() {
        if(this.props.messages.length > 0){
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        // Scroll to bottom every time we add a new message to the chat box
        const messages = ReactDOM.findDOMNode(this.messages);
        const newMessage = ReactDOM.findDOMNode(this.messages).lastChild;

        const clientHeight = messages.clientHeight;
        const scrollTop = messages.scrollTop;
        const scrollHeight = messages.scrollHeight;

        const newMessageHeight = newMessage.offsetHeight;

        let lastMessageHeight = 0;
        if(newMessage.previousSibling){
            lastMessageHeight = newMessage.previousSibling.offsetHeight;
        }

        if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
            newMessage.scrollIntoView({behavior: 'smooth'});
        }
    };
    render(){
        return(
            <ol id="messages" className="chat__messages" ref={messages => this.messages = messages}>
                {this.props.messages}
            </ol>
        );
    }
}

export default MessagesList;