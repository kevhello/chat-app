import React, {Component} from 'react';

class ChatFooter extends Component {
    state = {
        inputMessage: '',
    };

    onInputChange = (e) => {
        this.setState({inputMessage: e.target.value});
    };

    onFormSubmit = (e) => {
        e.preventDefault();

        this.props.socket.emit('createMessage', {
            from: 'User',
            text: this.state.inputMessage,
        }, () => {

        });
        this.setState({inputMessage: ''});
    };

    render(){
        return(
            <div className="chat__footer">
                <form id="message-form" onSubmit={this.props.onFormSubmit}>
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
                    onClick={this.props.onLocationSend}
                    disabled={this.props.disableLocBtn}
                >
                    {this.props.disableLocBtn ?
                        'Sending location...' :
                        'Send location'}
                </button>
            </div>
        );
    }
}

export default ChatFooter;