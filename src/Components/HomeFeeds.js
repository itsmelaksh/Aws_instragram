import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { Segment } from "semantic-ui-react";

import { QueryGetFeeds, SubscriptionNewPost, SubscriptionInferPostTags } from '../GraphQL';
import Post from '../Components/Post';
import InitialFetchMessage from '../Components/InitialFetchMessage';
import LoadingPostNotification from '../Components/LoadingPostNotification';

class HomeFeeds extends Component {

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
        this.props.subscribeToAutoTagging()
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
	}

    componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll)
    };

    componentWillUpdate(nextProps, nextState) {
        if(!this.props.feeds && nextProps.feeds) {
            if(nextProps.feeds.posts.items.length < 10 && nextProps.feeds.posts.nextToken != null){
                this.getNextPage(nextProps.feeds.posts.nextToken)
            }
        }else if(!this.props.feeds && !nextProps.feeds){
            this.props.refetch()
        }
    }

    getNextPage = (nextToken) => {
        if (nextToken) {
            this.setState({
                isLoading: true
            })
            this.props.onScroll(nextToken).then(
                ({data: { getFeeds } }) => {
                    this.setState({
                        isLoading: false
                    })
                    if (getFeeds.posts.items.length < 5 && getFeeds.posts.nextToken != null) {
                        this.getNextPage(getFeeds.posts.nextToken)
                    }else if(getFeeds.posts.nextToken != null) {
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
            if(this.props.feeds && this.props.feeds.posts.nextToken)
                this.getNextPage(this.props.feeds.posts.nextToken)
            else
                window.addEventListener("scroll", this.handleScroll)
	    }
	}

    render() {
        const { feeds } = this.props
        return (
            <div>

                {!feeds ? <InitialFetchMessage /> : null}

                <LoadingPostNotification isVisible={this.state.isLoading} />
                {feeds && feeds.posts.items && feeds.posts.items.map(post => {
                    return (
                        <Post key={post.id} {...post} />
                    )
                })}

                {feeds && !feeds.posts.nextToken ? <Segment textAlign='center' color='red'>No more post</Segment> : null}
            </div>
        );
    }

}

export default graphql(
    QueryGetFeeds,
    {
        options: {
            fetchPolicy: 'no-cache',
        },
        props: (props) => ({
            feeds: props.data.getFeeds,
            refetch: () => (props.data.refetch()),
            subscribeToNewPost: params => {
                props.data.subscribeToMore({
                    document: SubscriptionNewPost,
                    updateQuery: (prev, { subscriptionData: { data : { newPost } } }) => {
                        if((prev.getFeeds.followingIds.indexOf(newPost.username) > 0) || (prev.getFeeds.username === newPost.username)) {
                            const newObj = {
                                getFeeds: {
                                    ...prev.getFeeds,
                                    posts: { 
                                        items: [
                                            newPost, 
                                            ...prev.getFeeds.posts.items.filter(post => post.id !== newPost.id)
                                        ], 
                                        __typename: 'PostConnection',
                                        nextToken: prev.getFeeds.posts.nextToken
                                    }
                                }
                            };
                            return newObj;
                        }

                        return prev;
                    }
                });
            },
            subscribeToAutoTagging: params => {
                props.data.subscribeToMore({
                    document: SubscriptionInferPostTags,
                    updateQuery: (prev, { subscriptionData: { data : { newTags } } }) => {

                        const tempPost = prev.getFeeds.posts.items.filter(post => post.id === newTags.postId)
                        if(tempPost.length > 0){
                            const newPost = {
                                ...tempPost[0],
                                tags: newTags.tags
                            }
    
                            const newObj = {
                                getFeeds: {
                                    ...prev.getFeeds,
                                    posts: { 
                                        items: [
                                            newPost, 
                                            ...prev.getFeeds.posts.items.filter(post => post.id !== newPost.id)
                                        ], 
                                        __typename: 'PostConnection',
                                        nextToken: prev.getFeeds.posts.nextToken
                                    }
                                }
                            };
                            
                            return newObj;
                        }

                        return prev;
                    }
                })
            },
            onScroll: nextToken => {
                return props.data.fetchMore({
                    variables: {
                        nextToken
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        const newObj = {
                            getFeeds: {
                                ...prev.getFeeds,
                                posts: { 
                                    items: [
                                        ...prev.getFeeds.posts.items,
                                        ...fetchMoreResult.getFeeds.posts.items
                                    ], 
                                    __typename: 'PostConnection',
                                    nextToken: fetchMoreResult.getFeeds.posts.nextToken
                                }
                            }
                        };

                        return newObj
                    }
                })
            }
        })
    }
)(HomeFeeds);
