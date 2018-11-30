import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Content from '../components/Content';
import * as Actions from '../actions/request';

class Profile extends Component {
    componentDidMount() {
        console.log(this.props.match.params.username);
        this.props.getProfile();
    }
    
    render() {
        console.log(this.props.profile);
        return (
            <div>
                <Header/>
                <CoverImage/>
                <MenuTop/>
                <Content/>
            </div>
        );
    }
}

// export default Profile;
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getProfile: () => dispatch(Actions.getProfile())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);