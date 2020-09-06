import EverdonorAPI from 'api-client/EverdonorAPI';
import { Component } from "react";

class RegisteredUsers extends Component {

    state = {
        users: []
    }

    constructor() {
        super();
        EverdonorAPI.getUsers('/users')
            .then(resData => this.setState(
                {
                    users: resData,
                }
            ))

        // document.addEventListener("keydown", this.handleKeyPress, false);
    }

    render() {
        return (
            <div>{this.state.users.map(user => <h2 key={user.id}>{user.name}</h2>)}</div>
        )
    }
}

export default RegisteredUsers