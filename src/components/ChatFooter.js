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
            text: this.state.inputMessage,
        }, () => {
            this.setState({inputMessage: ''});
        });
    };

    render(){
        return(
            <div className="chat__footer">
                <form className="chat chat__footer-form" onSubmit={this.props.onFormSubmit}>
                    <input
                        className="chat chat__footer-messagebox"
                        name="message"
                        value={this.state.inputMessage}
                        type="text"
                        placeholder="Enter message"
                        onChange={this.onInputChange}
                        autoFocus
                        autoComplete="off"
                    />
                    <button
                        className="button button__overlay"
                        onClick={this.onFormSubmit}
                    >Send</button>
                </form>
                <button
                    id="send-location"
                    className="button button__overlay"
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