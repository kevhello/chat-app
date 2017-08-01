import React, {Component} from 'react';
import {isRealString} from '../server/utils/validation';

class JoinPage extends Component {
    state = {
        inputDisplay: '',
        inputRoom: '',
    };

    onSubmit = (e) => {
        e.preventDefault();
        const inputDisplay = this.state.inputDisplay;
        const inputRoom = this.state.inputRoom;
        if(isRealString(inputDisplay) && isRealString(inputRoom)){
            this.props.onSubmitDisplayRoom(inputDisplay, inputRoom);
        } else {
            alert("Invalid display and/or room name");
        }
    };

    render(){
        return(
                <div className="centered-form">
                    <div className="centered-form__form">
                            <form onSubmit={this.onSubmit}>
                            <div className="form-field">
                                <h3>Join a Chat!</h3>
                            </div>
                            <div className="form-field">
                                <label>Display name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.inputDisplay}
                                    autoFocus
                                    onChange={e => this.setState({inputDisplay: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Room name</label>
                                <input
                                    type="text"
                                    name="room"
                                    value={this.state.inputRoom}
                                    onChange={e => this.setState({inputRoom: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <button onSubmit={this.onSubmit}>Join</button>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}

export default JoinPage;