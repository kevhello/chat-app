import React, {Component} from 'react';

class PeoplesList extends Component {
    render(){
        const usersList = this.props.usersList.map( (user,i) =>
            <li key={i} className="chat chat__users-list-item" >{user}</li>
        );

        return(
            <div className="chat chat__sidebar">
                <h3 className="chat chat__header">Chatters</h3>
                <h2 className="chat chat__header">Room Name: <br/> {this.props.roomName}</h2>
                <div id="users">
                    <ol>
                        {usersList}
                    </ol>
                </div>
            </div>
        );
    }
}

export default PeoplesList;