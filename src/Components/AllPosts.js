import React, { Component } from "react";
import { graphql } from 'react-apollo';

import { QueryAllPosts, QueryGetFeeds, SubscriptionNewPost } from '../GraphQL';
import Post from '../Components/Post';

class AllPosts extends Component {

    componentWillMount(){
        this.props.subscribeToNewPost();
    }

    getUrl = ({ file }) => {
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
        const { feeds } = this.props

        return (
            <div>
            {feeds && feeds.posts.items && feeds.posts.items.map(post => {
                const imageUrl = this.getUrl(post)
                return (
                    <Post key={post.id}
                        imageUrl={imageUrl}
                        owner={post.username}
                        content={post.caption}
                    />       
                )
            })}
            </div>
        );
    }

}

export default graphql(
    QueryGetFeeds,
    {
        options: {
            fetchPolicy: 'cache-and-network',
        },
        props: (props) => ({
            feeds: props.data.getFeeds,
            subscribeToNewPost: params => {
                props.data.subscribeToMore({
                    document: SubscriptionNewPost,
                    updateQuery: (prev, { subscriptionData: { data : { newPost } } }) => {
                        const newObj = {
                            ...prev,
                            allPosts: { 
                                items: [
                                    newPost, 
                                    ...prev.allPosts.items.filter(post => post.id !== newPost.id)
                                ], 
                                __typename: 'PostConnection',
                                nextToken: prev.allPosts.nextToken
                            }
                        };
                        return newObj;
                    }
                });
            },
        })
    }
)(AllPosts);
