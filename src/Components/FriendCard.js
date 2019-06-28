import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import posed from "react-pose";
import styled from "styled-components";
import { withApollo } from 'react-apollo';

import { MutationRemoveFriend, MutationAddFriend } from '../GraphQL';

const UnfollowButton = posed.div({
    idle: {
        color: '#db2828',
        backgroundColor: '#fff'
    },
    hovered: {
        color: '#fff',
        backgroundColor: '#db2828'
    }
})

const StyledUnfollowButton = styled(UnfollowButton)`
    border: 0.5px solid #db2828;
    font-size: 1rem;
    text-align: center;
    padding: 8px 21px;
    border-radius: 5px;
    cursor: pointer;
`

const FollowButton = posed.div({
    idle: {
        color: '#2185d0',
        backgroundColor: '#fff'
    },
    hovered: {
        color: '#fff',
        backgroundColor: '#2185d0'
    }
})

const StyledFollowButton = styled(FollowButton)`
    border: 0.5px solid #2185d0;
    font-size: 1rem;
    text-align: center;
    padding: 8px 21px;
    border-radius: 5px;
    cursor: pointer;
`

class FriendCard extends Component {

    constructor(props) {
		super(props)
        
        this.state = {
            isLoading: false,
            followed: false
        }
    }

    resetComponent = () => this.props.client.resetStore()

    componentDidMount(){
        this.setState({
            ...this.props
        })
    }

    handleRemoveFriend = () => {
        const { username } = this.props

        this.setState({ isLoading: true })
        this.props.client.mutate({
            mutation: MutationRemoveFriend,
            variables: {
                friendUsername: username
            },
        }).then((data) => {
            this.resetComponent()
        }).finally(() => {
            this.setState({
                isLoading: false,
                followed: false
            })
        })
    }

    handleAddFriend = () => {
        const { username } = this.props

        this.setState({ isLoading: true })
        this.props.client.mutate({
            mutation: MutationAddFriend,
            variables: {
                friendUsername: username
            },
        }).then((data) => {
            this.resetComponent()
        }).finally(() => {
            this.setState({
                isLoading: false,
                followed: true
            })
        })
    }

    render() {
        const { username, profilePic, friendSince, followed, type } = this.state

        return (
            <Card fluid style={{ marginBottom:'20px' }}>
                <Image src={profilePic} />
                <Card.Content style={{ fontSize:'0.9em' }}>
                    <Card.Header>
                        {username}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {type === "follower" ? "Follower" : "Following"} since {friendSince}
                        </span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                {followed ? 
                    <StyledUnfollowButton pose={this.state.hovering ? "hovered" : "idle"}
                                          onMouseEnter={() => this.setState({ hovering: true })}
                                          onMouseLeave={() => this.setState({ hovering: false })}
                                          onClick={this.handleRemoveFriend}>Unfollow</StyledUnfollowButton> : 
                    <StyledFollowButton pose={this.state.hovering ? "hovered" : "idle"}
                                          onMouseEnter={() => this.setState({ hovering: true })}
                                          onMouseLeave={() => this.setState({ hovering: false })}
                                          onClick={this.handleAddFriend}>Follow</StyledFollowButton>}
                </Card.Content>
            </Card>
        );
    }
}

export default withApollo(FriendCard);