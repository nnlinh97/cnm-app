import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Content from '../components/Content';
import * as Actions from '../actions/request';

class Profile extends Component {
    componentDidMount() {
        this.props.getProfile();
        this.props.getListPosts();
    }
    
    render() {
        console.log(this.props.posts);
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
        profile: state.profile,
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getProfile: () => dispatch(Actions.getProfile()),
        getListPosts: () => dispatch(Actions.getListPosts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);