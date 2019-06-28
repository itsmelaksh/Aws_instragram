import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { MutationAddPost, MutationInferPostTags, QueryGetFeeds } from "../GraphQL";
import { v4 as uuid } from 'uuid';

import { Form, Icon, Card, Image, Dimmer } from 'semantic-ui-react'

//Get configs
import config from '../config';
import AddPostButton from './AddPostButton';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        caption: '',
        file: undefined,
        imagePreviewUrl: 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png',
        lastUpdate: new Date().toISOString(),
        active: false
    });

    handleCaptionChange = (event, { value }) => {
        this.setState({
            caption: value
        });
    }

    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if(file) {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
    
            reader.readAsDataURL(file)
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        const bucket = config.aws_user_files_s3_bucket
        const region = config.aws_user_files_s3_bucket_region

        const { caption, file: selectedFile } = this.state;

        let file;

        if (selectedFile) {
            const { name: fileName, type: mimeType } = selectedFile;
            const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(fileName);

            const key = `${uuid()}${extension && '.'}${extension}`;

            file = {
                bucket,
                key,
                region,
                mimeType,
                localUri: selectedFile,
            };
        }

        this.setState(this.getInitialState(), () => {
            this.props.addPost({ caption, file })
                .then(({ data }) => {
                    this.props.inferPostTags({
                        'postId': data.addPost.id,
                        'S3Bucket': data.addPost.file.bucket,
                        'S3Filename': data.addPost.file.key
                    })
                });
        });

        this.handleClose();
    }

    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })
    handleToggle = () => this.setState({ active: !this.state.active })

    render() {
        const { caption, file, imagePreviewUrl, lastUpdate, active } = this.state
        const isSubmitEnabled = caption !== '' && file !== undefined
        const imgSrc = imagePreviewUrl

        return (
            <div>
                <Dimmer
                    active={active}
                    onClickOutside={this.handleClose}
                    page
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate3d(-50%,-50%,0)',
                        width: '100%',
                        maxWidth: '400px'
                    }}>
                        <Card fluid>
                            <div style={{ maxHeight:'400px', overflow:'hidden' }}>
                                <Image fluid src={imgSrc} />
                            </div>
                            <Card.Content>
                                <Card.Description>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.TextArea style={{
                                            width: '100%',
                                            border: 'none',
                                            outline: '0',
                                            resize: 'none'
                                        }} placeholder='Type image caption' rows={2} value={caption} onChange={this.handleCaptionChange} />
                                        <Form.Input key={lastUpdate} label="File to upload" labelPosition="left" type="file" onChange={this.handleImageChange} />
                                        <Form.Group>
                                            <Form.Button icon labelPosition="right" color="red" onClick={this.handleClose}><Icon name="close" />Cancel</Form.Button>
                                            <Form.Button icon labelPosition="right" type="submit" style={{ backgroundColor:'#3d71c6', color:'#fff' }} disabled={!isSubmitEnabled}><Icon name="upload" />Add Post</Form.Button>
                                        </Form.Group>
                                    </Form>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                </Dimmer>

                <AddPostButton onClick={this.handleToggle} />
            </div>
        );
    }

}

export default compose( 
    graphql(
        MutationAddPost,
        {
            options: {
                refetchQueries: [{ query: QueryGetFeeds }],
                update: (proxy, { data: { addPost } }) => {
                    const query = QueryGetFeeds;
                    const data = proxy.readQuery({ 
                        query,
                        variables: {
                            nextToken: null
                        }
                    });

                    data.getFeeds.posts.items = [
                        addPost,
                        ...data.getFeeds.posts.items.filter((post) => post.id !== addPost.id)
                    ];
                    proxy.writeQuery({ query, data });
                }
            },
            props: ({ ownProps, mutate }) => ({
                ...ownProps,
                addPost: post => mutate({
                    variables: post,
                    optimisticResponse: () => ({
                        addPost: {
                            ...post,
                            id: uuid(),
                            username: 'temp',
                            profilePic: null,
                            createdAt: new Date().toISOString(),
                            __typename: 'Post',
                            file: null,
                            liked: false,
                            likes: 0,
                            tags: ''
                        }
                    }),
                }),
            }),
        }
    ),
    graphql(
        MutationInferPostTags,
        {
            options: {
                refetchQueries: [{ query: QueryGetFeeds }],
                update: (proxy, { data: { inferPostTags } }) => {
                    const query = QueryGetFeeds;
                    const data = proxy.readQuery({ 
                        query,
                        variables: {
                            nextToken: null
                        }
                    });

                    for (const el of data.getFeeds.posts.items) {
                        if(el.id === inferPostTags.postId){
                            el.tags = inferPostTags.tags
                            break
                        }
                    }
                    
                    proxy.writeQuery({ query, data });
                }
            },
            props: (props) => ({
                inferPostTags: (args) => {
                    props.mutate({
                        variables: {...args}
                    })
                }
            })
        }
    )
)(AddPost);
