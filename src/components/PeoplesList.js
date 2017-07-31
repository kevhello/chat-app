import React, {Component} from 'react';

class PeoplesList extends Component {
    render(){

        return(
            <div className="chat__sidebar">
                <h3>People</h3>
                <div id="users"></div>
            </div>
        );
    }
}

export default PeoplesList;