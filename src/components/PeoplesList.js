import React, {Component} from 'react';

class PeoplesList extends Component {
    render(){
        const usersList = this.props.usersList.map( (user,i) =>
            <li key={i} >{user}</li>
        );

        return(
            <div className="chat__sidebar">
                <h3>People</h3>
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