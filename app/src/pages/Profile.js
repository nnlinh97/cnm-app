import React, { Component } from 'react';
import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Content from '../components/Content';

class Profile extends Component {
    componentDidMount() {
        console.log(this.props.match.params.username);
    }
    
    render() {
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

export default Profile;