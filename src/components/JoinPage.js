import React, {Component} from 'react';
import {isRealString} from '../server/utils/validation';
const io = require('socket.io-client');

class JoinPage extends Component {
    state = {
        inputDisplay: '',
        inputRoom: '',
        rooms: [],
    };

    componentDidMount(){
        const socket = io();

        socket.on('connect', () => {

        });

        socket.on('updateRoomList', (rooms) => {
            this.setState(()=> {
                if(rooms.rooms){
                    const roomNames = rooms.rooms.filter((room) => room !== null);
                    return {rooms: roomNames};
                } else {
                    return {rooms: []};
                }
            });
        });
    }

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

    onClickRoom = (e) => {
        e.preventDefault();
        this.setState({inputRoom: e.target.value});
    };

    render(){
        let rooms = null;
        if(this.state.rooms.length > 0)
            rooms = this.state.rooms.map( room =>
            <option value={room} key={room}>{room}</option>
        );

        return(
                <div className="centered-form">
                    <div className="centered-form__form">
                            <form onSubmit={this.onSubmit}>
                            <div className="form-field title">
                                <h3>Join a Chat!</h3>
                            </div>
                            <div className="form-field">
                                <label>Display name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-field__input"
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
                                    className="form-field__input"
                                    value={this.state.inputRoom}
                                    onChange={e => this.setState({inputRoom: e.target.value})}
                                    required
                                />
                            </div>
                            <button className="button button__centered" onSubmit={this.onSubmit}>Join</button>
                            <select className="dropdown" name="rooms" onChange={this.onClickRoom}>
                                <option value="" selected>Active rooms</option>
                                {rooms}
                            </select>
                        </form>
                    </div>
                </div>
        );
    }
}

export default JoinPage;