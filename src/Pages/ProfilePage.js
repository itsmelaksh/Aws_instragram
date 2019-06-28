import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Container, Grid, Image, Button, Icon, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { QueryGetLoggedUserInfo } from '../GraphQL';
import UserPosts from '../Components/UserPosts';
import Following from '../Components/Following';
import Followers from '../Components/Followers';

const panes = [
    { menuItem: 'My Posts', render: () => <UserPosts /> },
    { menuItem: 'Followers', render: () => <Followers /> },
    { menuItem: 'Following', render: () => <Following /> },
]

class ProfilePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            name: '',
            bio: '',
            email: '',
            phoneNumber: '',
            gender: '',
            country: '',
            profilePic: null,
            followingCount: 0,
            followersCount: 0,
            postsCount: 0
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

        const { username, bio, profilePic, createdAt, followingCount, followersCount, postsCount } = this.state

        const imageUrl = profilePic ? this.getUrl(profilePic) : null
        const joinedTime = createdAt ? moment(parseInt(createdAt, 10)).format("DD MMMM YYYY") : null

        return (
            <Container text>
                <Grid columns={2}>
                    <Grid.Column width={4}>
                        <Image circular src={imageUrl} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <div style={{ padding:'10px' }}>
                            <div style={{ fontSize:'1.5em', marginBottom:'8px' }}>
                                {username} &nbsp;
                                <Button icon labelPosition='left' as={ Link } to='/account/edit' ><Icon name='settings' />Account Settings</Button>
                            </div>
                            <div style={{ color: 'rgba(0,0,0,.4)', marginBottom:'5px', fontSize: '1em' }}>Joined since {joinedTime}</div>
                            <div style={{ marginBottom:'15px' }}>
                                <div style={{ display:'inline', marginRight: '1em' }}><b>{postsCount}</b> posts</div>
                                <div style={{ display:'inline', marginRight: '1em' }}><b>{followersCount}</b> followers</div>
                                <div style={{ display:'inline' }}><b>{followingCount}</b> following</div>
                            </div>
                            <div>
                                {bio}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
                <br />

                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Container>
        )
    }
}

export default graphql(
    QueryGetLoggedUserInfo,
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
)(ProfilePage);