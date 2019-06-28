import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { Grid, Segment } from "semantic-ui-react";
import moment from 'moment';

import { QueryGetFriends, SubscriptionNewFriend, SubscriptionRemoveFriend } from '../GraphQL';
import InitialFetchMessage from '../Components/InitialFetchMessage';
import FriendCard from '../Components/FriendCard';

class Following extends Component {

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
        const { following } = this.props
        return (
            <div>
                {!following ? <InitialFetchMessage /> : null}

                <Grid columns={3}>
                    <Grid.Row>
                        {following && following.items && following.items.map(({ friendInfo: user, createdAt }, index) => {
                            const profilePic = this.getUrl(user.profilePic)
                            const friendSince = moment(parseInt(createdAt, 10));

                            return (
                                <Grid.Column key={user.username}>
                                    <FriendCard profilePic={profilePic} username={user.username} followed={user.followed} friendSince={friendSince.format('DD MMM YYYY')} type="following" />
                                </Grid.Column>
                            )
                        })}
                    </Grid.Row>
                </Grid>

                {following && (following.items.length === 0) ? <Segment textAlign='center'>You have not followed anyone yet.</Segment> : null}
            </div>
        );
    }
}

export default graphql(
    QueryGetFriends,
    {
        options: {
            fetchPolicy: 'network-only',
        },
        props: (props) => ({
            following: props.data.getFriends,
            subscribeToNewFriend: params => {
                props.data.subscribeToMore({
                    document: SubscriptionNewFriend,
                    updateQuery: (prev, { subscriptionData: { data : { newFriend } } }) => {
                        const newObj = {
                            getFriends: {
                                ...prev.getFriends,
                                items: [
                                    newFriend,
                                    ...prev.getFriends.items.filter(user => user.friendInfo.username !== newFriend.friendInfo.username)
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
                            getFriends: {
                                ...prev.getFriends,
                                items: [
                                    ...prev.getFriends.items.filter(user => user.friendInfo.username !== removeFriend.friendInfo.username)
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
)(Following);