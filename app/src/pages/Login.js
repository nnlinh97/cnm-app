import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Login extends Component {

    clickToTwitter = () => {
        this.props.history.push('/nnlinh97');
    }
    render() {
        return (
            <div>
                <button  onClick={this.clickToTwitter}>redirect to twitter</button>
            </div>
        );
    }
}

export default withRouter(Login);