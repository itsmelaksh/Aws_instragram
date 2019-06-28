import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { Segment } from "semantic-ui-react";

import { QueryGetUserPosts, SubscriptionNewPost } from '../GraphQL';
import Post from '../Components/Post';
import LoadingPostNotification from '../Components/LoadingPostNotification';
import InitialFetchMessage from '../Components/InitialFetchMessage';

class UserPosts extends Component {

    defaultState = {
        isLoading: false
    }

    constructor(props) {
		super(props)
        this.handleScroll = this.handleScroll.bind(this)
        
        this.state = this.defaultState
    }

    componentWillMount(){
        this.props.subscribeToNewPost()
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
	}

    componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll)
    }

    componentWillUpdate(nextProps, nextState) {
        if(!this.props.posts && nextProps.posts) {
            if(nextProps.posts.items.length < 10 && nextProps.posts.nextToken != null){
                this.getNextPage(nextProps.posts.nextToken)
            }
        }else if(!this.props.posts && !nextProps.posts){
            this.props.refetch()
        }
    }

    getNextPage = (nextToken) => {
        if (nextToken) {
            this.setState({
                isLoading: true
            })
            this.props.onScroll(nextToken).then(
                ({data: { getUserPosts } }) => {
                    this.setState({
                        isLoading: false
                    })

                    if (getUserPosts.items.length < 5 && getUserPosts.nextToken != null) {
                        this.getNextPage(getUserPosts.nextToken)
                    }else if(getUserPosts.nextToken != null) {
                        window.addEventListener("scroll", this.handleScroll)
                    }
                }
            )
        }
    }

    handleScroll(e) {
        const rootEl = document.querySelector('#root')
		if ((window.innerHeight + window.scrollY) >= (rootEl.offsetHeight-3000)) {
            window.removeEventListener("scroll", this.handleScroll)
            if(this.props.posts && this.props.posts.nextToken)
                this.getNextPage(this.props.posts.nextToken)
            else
                window.addEventListener("scroll", this.handleScroll)
	    }
	}

    render() {
        const { posts } = this.props
        return (
            <div>
                <LoadingPostNotification isVisible={this.state.isLoading} />

                {!posts ? <InitialFetchMessage /> : null}
                
                {posts && posts.items && posts.items.map(post => {
                    return (
                        <Post key={post.id} {...post} />
                    )
                })}
                
                {posts && !posts.nextToken ? <Segment textAlign='center'>No more post</Segment> : null}
            </div>
        );
    }

}

export default graphql(
    QueryGetUserPosts,
    {
        options: {
            fetchPolicy: 'no-cache',
        },
        props: (props) => ({
            posts: props.data.getUserPosts,
            refetch: () => (props.data.refetch()),
            subscribeToNewPost: params => {
                props.data.subscribeToMore({
                    document: SubscriptionNewPost,
                    updateQuery: (prev, { subscriptionData: { data : { newPost } } }) => {
                        const newObj = {
                            getUserPosts: {
                                ...prev.getUserPosts,
                                items: [
                                    newPost, 
                                    ...prev.getUserPosts.items.filter(post => post.id !== newPost.id)
                                ], 
                                __typename: 'PostConnection',
                                nextToken: prev.getUserPosts.nextToken
                            }
                        };
                        return newObj;
                    }
                });
            },
            onScroll: nextToken => {
                return props.data.fetchMore({
                    variables: {
                        nextToken
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        const newObj = {
                            getUserPosts: {
                                ...prev.getUserPosts,
                                items: [
                                    ...prev.getUserPosts.items,
                                    ...fetchMoreResult.getUserPosts.items
                                ], 
                                __typename: 'PostConnection',
                                nextToken: fetchMoreResult.getUserPosts.nextToken
                            }
                        };

                        return newObj
                    }
                })
            }
        })
    }
)(UserPosts);