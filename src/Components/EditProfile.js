import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { QueryGetLoggedUserInfo, MutationUpdateUser } from '../GraphQL'
import { v4 as uuid } from 'uuid'

import { Grid, Header, Divider, Icon, Segment, Form, Input, TextArea, Select, Dropdown, Button, Image } from 'semantic-ui-react'

import config from '../config'
import { countryOptions } from '../utils'
import FormMessage from './FormMessage'

const firstColWidth = 3
const secondColWidth = 13

const genderOptions = [
    { key: 'n', text: 'Not Specified', value: 'not-specified' },
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

class EditProfile extends Component {

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
            imagePreviewUrl: null,
            success: false,
            failed: false,
            errorMessage: ''
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            username: newProps.username || '',
            name: newProps.name || '',
            bio: newProps.bio || '',
            email: newProps.email || '',
            phoneNumber: newProps.phoneNumber || '',
            gender: newProps.gender || '',
            country: newProps.country || '',
            profilePic: newProps.profilePic,
        })
    }

    componentWillUnmount() {
		clearTimeout(this.timer)
    }

    success = () => {
        this.setState({
            ...this.defaultState,
            success: true
        })

        this.timer = setTimeout(() => this.setState({ success: false }), 5000)
    }

    error = (err) => {
        this.setState({
            failed: true,
            errorMessage: err.message
        })
    }

    handleChange = (e, { id, value }) => {
        this.setState({
            [id]: value
        });
    }

    handleSave = () => {

        const bucket = config.aws_user_files_s3_bucket
        const region = config.aws_user_files_s3_bucket_region

        const { username, name, bio, email, phoneNumber, gender, country, profilePic: temp, imagePreviewUrl } = this.state;

        let profilePic

        if (imagePreviewUrl) {
            const { name: fileName, type: mimeType } = temp;
            const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(fileName);

            const key = `${uuid()}${extension && '.'}${extension}`;

            profilePic = {
                bucket,
                key,
                region,
                mimeType,
                localUri: temp,
            };
        } else {
            profilePic = {
                bucket: temp.bucket,
                key: temp.key,
                region: temp.region
            }
        }

        const profile = {}
        profile.username = username

        if(name && name !== '')
            profile.name = name

        if(bio && bio !== '')
            profile.bio = bio
        
        if(email && email !== '')
            profile.email = email

        if(phoneNumber && phoneNumber !== '')
            profile.phoneNumber = phoneNumber

        if(gender && gender !== '')
            profile.gender = gender

        if(country && country !== '')
            profile.country = country

        if(profilePic && profilePic !== '')
            profile.profilePic = profilePic

        this.props.onEdit({
            ...profile
        }).then(data => this.success())
          .catch(err => this.error(err));;
    }

    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if(file) {
            reader.onloadend = () => {
                this.setState({
                    profilePic: file,
                    imagePreviewUrl: reader.result
                });
            }
    
            reader.readAsDataURL(file)
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
        const { username, name, bio, email, phoneNumber, gender, country, profilePic, imagePreviewUrl, success, failed, errorMessage } = this.state

        let imageUrl = null
        if (imagePreviewUrl) {
            imageUrl = imagePreviewUrl
        } else if (profilePic) {
            imageUrl = this.getUrl(profilePic)
        }

        return (
            <Segment padded="very">
                <Header as='h2'>
                    <Icon name='settings' />
                    <Header.Content>
                        Account Settings
                        <Header.Subheader>
                            Manage your preferences
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider />
                { success ? <FormMessage positive header="Successful!" body="Profile data is succesfully updated." /> : null }
                { failed ? <FormMessage negative header="Unsuccessful!" body={errorMessage} /> : null }
                <br />
        
                <Form size='large'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                { imageUrl ? <Image circular src={imageUrl} size='medium' style={{ marginLeft:'auto', marginRight:'auto' }} /> : null}
                                <br />
                                <Form.Input type="file" onChange={this.handleImageChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Username</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <label><b>{username}</b></label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Name</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Input id='name' placeholder='Name' style={{ width:'300px '}} value={name} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
        
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} textAlign='right'>
                                <label>Bio</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <TextArea id='bio' autoHeight placeholder='Tell the world about yourself' rows={2} value={bio} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
        
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Email<sup style={{ color:'red' }}>*</sup></label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Input id='email' placeholder='Email' style={{ width:'300px '}} value={email} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
        
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Phone Number<sup style={{ color:'red' }}>*</sup></label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Input id='phoneNumber' placeholder='Phone Number' style={{ width:'300px '}} value={phoneNumber} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
        
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Gender</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Select id='gender' placeholder='Gender' options={genderOptions} value={gender} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
        
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Country</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Dropdown id='country' placeholder='Select Country' search selection options={countryOptions} value={country} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Button primary onClick={this.handleSave} disabled={email && phoneNumber ? false : true}>Save</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        )
    }
}

export default compose(
    graphql(
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
    ),
    graphql(MutationUpdateUser, {
        props: (props) => ({
            onEdit: (user) => (
                props.mutate({
                    variables: { ...user }
                })
            )
        })
    })
)(EditProfile);
