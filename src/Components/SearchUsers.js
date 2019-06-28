import _ from 'lodash'
import React, { Component } from "react";
import { withApollo } from 'react-apollo';
import { Search, Label, Image } from 'semantic-ui-react';

import { QuerySearchUsers, MutationRemoveFriend, MutationAddFriend } from '../GraphQL';

const resultRenderer = ({ data, handlers }) => {
    return (
        <div>
            <Image size="mini" style={{height:'100%', float:'left', marginRight:'1em' }} src={data.profilePic} />
            <div>
                <div style={{marginBottom: '5px'}}>{data.username}</div>
                {data.followed === 1 ? <Label as='a' size='small' color='red' onClick={() => handlers.removeFriend(data.username, true)}>Unfollow</Label> : 
                <Label as='a' size='small' color='blue' onClick={() => handlers.addFriend(data.username, true)}>Follow</Label>}
            </div>
        </div>
    )
}

class SearchUsers extends Component {

    componentWillMount() {
        this.resetComponent()
    }

    runQuery = (search) => (
        this.props.client.query({
            query: QuerySearchUsers,
            variables: {
                search: search
            },
        })
    )

    resetComponent = () => {
        this.props.client.resetStore()
        this.setState({ isLoading: false, results: [], value: '' })
    }

    handleSearchChange = (event, { value }) => {
        this.setState({ isLoading: true, value })

        if (value.length > 0) {
            this.runQuery(value)
                .then(({ data }) => {
                    this.setState({
                        isLoading: false,
                        results: data.searchUsers.items
                    })
                })
        } else {
            setTimeout(() => {
                if (this.state.value.length < 1) return this.resetComponent()
            }, 300)
        }
    }

    handleRemoveFriend = (username, custom) => {
        if(custom === true) {
            this.setState({ isLoading: true })
            const { value } = this.state;

            this.props.client.mutate({
                mutation: MutationRemoveFriend,
                variables: {
                    friendUsername: username
                },
            }).then((data) => {
                this.props.client.resetStore()
            }).finally(() => {
                this.runQuery(value)
                    .then(({ data }) => {
                        this.setState({
                            isLoading: false,
                            results: data.searchUsers.items
                        })
                    })
            })
        }
    }

    handleAddFriend = (username, custom) => {
        if(custom === true) {
            this.setState({ isLoading: true })
            const { value } = this.state;

            this.props.client.mutate({
                mutation: MutationAddFriend,
                variables: {
                    friendUsername: username
                },
            }).then((data) => {
                this.props.client.resetStore()
            }).finally(() => {
                this.runQuery(value)
                    .then(({ data }) => {
                        this.setState({
                            isLoading: false,
                            results: data.searchUsers.items
                        })
                    })
            })
        }
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
        const { isLoading, value, results } = this.state
        let i;
        const res = [];
        for (i = 0; i < results.length; i++) {
            const profilePic = results[i].profilePic ? this.getUrl(results[i].profilePic) : null
            res.push({
                data: {
                    username: results[i].username,
                    followed: results[i].followed ? 1 : 0,
                    profilePic: profilePic,
                },
                key: results[i].username,
                handlers: {
                    removeFriend: this.handleRemoveFriend,
                    addFriend: this.handleAddFriend
                }
            })
        }

        return (
            <Search
                loading={isLoading}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={res}
                resultRenderer={resultRenderer}
                value={value}
                placeholder="Search people"
            />
        )
    }
}

export default withApollo(SearchUsers);