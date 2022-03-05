import React, { Component} from 'react';


export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip : 2,
            guestCanPause: false,
            isHost: false,
        };
        // Get room code from URL
        this.roomCode = this.props.roomCode;
    }
    render() {
        return <div>
            <div>
                <h3>{this.roomCode}</h3>
            </div>
            <p>Votes: {this.state.votesToSkip}</p>
            <p>Guest Can Pause: {this.state.guestCanPause}</p>
            <p>Host: {this.state.isHost}</p>

        </div>
    }
}

