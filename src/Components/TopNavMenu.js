import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Image } from 'semantic-ui-react';

import { QueryGetLoggedUserInfoTopNav } from '../GraphQL';

class TopNavMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            profilePic: null
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            ...newProps
        })
    }

    getUrl = (file) => {
        try {
            if (file) {
                const { bucket, region, key } = file;
                const url = `https://s3-${region}.amazonaws.com/${bucket}/${key}`;

                return url;
            }

            return null;
        } catch (err) {
            console.error(err);
        }
    }

    render() {

        const { username, profilePic } = this.state
        const imageUrl = profilePic ? this.getUrl(profilePic) : null

        return (
            <span>
                { imageUrl ? <Image avatar src={imageUrl} /> : null } {username}
            </span>
        )
    }
}

export default graphql(
    QueryGetLoggedUserInfoTopNav,
    {
        options: {
            fetchPolicy: 'cache-and-network',
        },
        props: (props) => {
            return {
                ...props.data.getLoggedUserInfo
            }
        }
    }
)(TopNavMenu);