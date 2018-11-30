import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Followers extends Component {
    render() {
        return (
            <div>
                {this.props.match.params.username}
            </div>
        );
    }
}

export default withRouter(Followers);