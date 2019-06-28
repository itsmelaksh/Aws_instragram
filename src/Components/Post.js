import React, { Component } from 'react';
import { Card, Image, Icon, Feed, Label } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import moment from 'moment';

import { MutationAddLike, MutationRemoveLike } from '../GraphQL';

class Post extends Component {

    defaultState = {
        likes: 0,
        liked: false,
        isLoading: false
    }

    constructor(props) {
        super(props)
        this.state = this.defaultState;
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

    componentDidMount() {
        this.setState({
            likes: this.props.likes,
            liked: this.props.liked ? true : false
        })
    }

    toggleLike = (postId) => {
        this.setState({ isLoading: true })

        const { likes, liked } = this.state

        if (liked) {
            this.props.client.mutate({
                mutation: MutationRemoveLike,
                variables: {
                    postId: postId
                },
            }).then((data) => {
                this.setState({
                    likes: likes > 0 ? likes - 1 : likes,
                    liked: !liked,
                    isLoading: false
                })
            })
        } else {
            this.props.client.mutate({
                mutation: MutationAddLike,
                variables: {
                    postId: postId
                },
            }).then((data) => {
                this.setState({
                    likes: likes + 1,
                    liked: !liked,
                    isLoading: false
                })
            })
        }
    }

    render() {
        const { id, file, username, profilePic, caption, createdAt, tags } = this.props
        const { liked, likes, isLoading } = this.state

        const imageUrl = this.getUrl(file)
        const currDate = new Date();
        const createdTime = moment(parseInt(createdAt, 10));
        const dateDiff = currDate.getTime() - parseInt(createdAt, 10)
        const diffDays = Math.ceil(dateDiff / (1000 * 3600 * 24)); 
        const timeInfo = diffDays > 1 ? `${diffDays} days ago` : `Today at ${createdTime.format("HH:mm")}`

        const profilePicSrc = profilePic ? this.getUrl(profilePic) : "https://react.semantic-ui.com/assets/images/avatar/large/jenny.jpg"

        return (
            <Card fluid>
                <Card.Content style={{ borderBottom: '1px solid #ccc' }}>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label image={profilePicSrc} />
                            <Feed.Content>
                                <Feed.Date style={{ fontSize:'13px', lineHeight:'16px' }}>
                                    {timeInfo}
                                </Feed.Date>
                                <Feed.Summary style={{ height: '19px' }}>
                                    {username}
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
                <Image src={imageUrl} fluid />
                <Card.Content extra style={{ fontSize:'12px' }}>
                    <div style={{ display:'inline-block', margin:'4px' }}>
                        {liked ? <Icon link name='heart' size='large' color='red' onClick={() => isLoading ? null : this.toggleLike(id)} /> :
                            <Icon link name='empty heart' size='large' onClick={() => isLoading ? null : this.toggleLike(id)} />}

                        {likes} likes
                    </div>
                    <div style={{ float: 'right' }}>
                        <Label.Group color='blue'>
                            {tags ? tags.split(',').map((tag, index) => <Label style={{ marginBottom: '0px' }} key={index}><Icon name='tag' />{tag}</Label>) : null}
                        </Label.Group>
                    </div>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        {caption}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default withApollo(Post);