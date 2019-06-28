import React, { Component } from 'react'
import { Grid, Header, Divider, Icon, Segment, Form, Input, Button } from 'semantic-ui-react'
import { Auth } from 'aws-amplify'

import FormMessage from './FormMessage'

const firstColWidth = 3
const secondColWidth = 13

class ChangePassword extends Component {

    defaultState = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        success: false,
        failed: false,
        errorMessage: ''
    }

    constructor(props) {
        super(props)
        this.state = this.defaultState
    }

    componentWillUnmount() {
		clearTimeout(this.timer)
    }

    handleChange = (event, { id, value }) => {
        if(this.state.failed) {
            this.setState({
                failed: false,
                errorMessage: ''
            })
        }

        this.setState({
            [id]: value
        })
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

    handleSubmit = () => {
        const { oldPassword, newPassword } = this.state

        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, oldPassword, newPassword);
            })
            .then(data => this.success())
            .catch(err => this.error(err));
    }

    render() {
        const { oldPassword, newPassword, confirmPassword, success, failed, errorMessage } = this.state

        return (
            <Segment padded="very">
                <Header as='h2'>
                    <Icon name='lock' />
                    <Header.Content>
                        Password Settings
                        <Header.Subheader>
                            Manage your password
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider />
                { success ? <FormMessage positive header="Successful!" body="Your password is succesfully changed." /> : null }
                { failed ? <FormMessage negative header="Unsuccessful!" body={errorMessage} /> : null }
                <br />

                <Form size='large'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Old Password</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Input id='oldPassword' type='password' placeholder='Old Password' value={oldPassword} onChange={this.handleChange} style={{ width:'300px '}} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>New Password</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Input id='newPassword' type='password' placeholder='New Password' value={newPassword} onChange={this.handleChange} style={{ width:'300px '}} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row style={{ paddingBottom:'0px' }}>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                                <label>Confirm New Password</label>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Input id='confirmPassword' type='password' placeholder='Confirm New Password' value={confirmPassword} onChange={this.handleChange} style={{ width:'300px '}} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row style={{ padding:'0px' }}>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right' />
                            <Grid.Column width={secondColWidth}>
                                { newPassword !== confirmPassword ? <p style={{ fontSize:'13px', paddingLeft:'5px', paddingTop:'5px', color:'red' }}>Password does not match!</p> : null }
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row style={{ paddingTop:'28px' }}>
                            <Grid.Column width={firstColWidth} verticalAlign='middle' textAlign='right'>
                            </Grid.Column>
                            <Grid.Column width={secondColWidth}>
                                <Button primary onClick={this.handleSubmit} disabled={newPassword === confirmPassword && newPassword !== '' && oldPassword !== '' ? false : true}>Change Password</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        )
    }
}

export default ChangePassword