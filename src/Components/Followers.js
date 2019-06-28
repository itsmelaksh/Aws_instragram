import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { Grid, Segment } from "semantic-ui-react";
import moment from 'moment';

import { QueryGetFollowers, SubscriptionNewFriend, SubscriptionRemoveFriend } from '../GraphQL';
import InitialFetchMessage from '../Components/InitialFetchMessage';
import FriendCard from '../Components/FriendCard';

class Followers extends Component {

    constructor(props) {
		super(props)
        
        this.state = {
            isLoading: false
        }
    }

    // componentWillMount(){
    //     this.props.subscribeToNewFriend()
    //     this.props.subscribeToRemoveFriend()
    // }

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
        const { data } = this.props

        return (
            <div>
                {!data ? <InitialFetchMessage /> : null}

                <Grid columns={3}>
                    <Grid.Row>
                        {data && data.items && data.items.map(({ userInfo: user, createdAt }, index) => {
                            const profilePic = this.getUrl(user.profilePic)
                            const friendSince = moment(parseInt(createdAt, 10));

                            return (
                                <Grid.Column key={user.username}>
                                    <FriendCard profilePic={profilePic} username={user.username} followed={user.followed} friendSince={friendSince.format('DD MMM YYYY')} type="follower" />
                                </Grid.Column>
                            )
                        })}
                    </Grid.Row>
                </Grid>

                {data && (data.items.length === 0) ? <Segment textAlign='center'>You have no follower yet.</Segment> : null}
            </div>
        );
    }
}

export default graphql(
    QueryGetFollowers,
    {
        options: {
            fetchPolicy: 'network-only',
        },
        props: (props) => ({
            data: props.data.getFollowers,
            subscribeToNewFriend: params => {
                props.data.subscribeToMore({
                    document: SubscriptionNewFriend,
                    updateQuery: (prev, { subscriptionData: { data : { newFriend } } }) => {
                        const newObj = {
                            getFollowers: {
                                ...prev.getFollowers,
                                items: [
                                    newFriend,
                                    ...prev.getFollowers.items.filter(user => user.userInfo.username !== newFriend.userInfo.username)
                                ], 
                                __typename: 'FriendRelationConnection'
                            }
                        };
                        return newObj;
                    }
                });
            },
            subscribeToRemoveFriend: params => {
                props.data.subscribeToMore({
                    document: SubscriptionRemoveFriend,
                    updateQuery: (prev, { subscriptionData: { data : { removeFriend } } }) => {
                        const newObj = {
                            getFollowers: {
                                ...prev.getFollowers,
                                items: [
                                    ...prev.getFollowers.items.filter(user => user.userInfo.username !== removeFriend.userInfo.username)
                                ], 
                                __typename: 'FriendRelationConnection'
                            }
                        };
                        return newObj;
                    }
                });
            },
        })
    }
)(Followers);