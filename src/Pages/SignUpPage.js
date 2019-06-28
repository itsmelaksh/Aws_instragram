import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment, Image } from "semantic-ui-react";
import logo from '../assets/suw-logo.png';
import laptop from '../assets/Sharing.png';

import VerificationForm from "../Components/VerificationForm";
import FormMessage from '../Components/FormMessage';

const SignUpForm = ({ onClick, onChange, failed, errorMessage }) => (
    <section>
        <Form size='large'>
            <Segment>
                { failed ? <FormMessage negative header="Unsuccessful!" body={errorMessage} /> : null }
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    onChange={evt => onChange('username', evt.target.value)}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={evt => onChange('password', evt.target.value)}
                />
                <Form.Input
                    fluid
                    icon='mail outline'
                    iconPosition='left'
                    placeholder='Email'
                    onChange={evt => onChange('email', evt.target.value)}
                />
                <Form.Input
                    fluid
                    icon='phone'
                    iconPosition='left'
                    placeholder='Phone Number'
                    onChange={evt => onChange('phone_number', evt.target.value)}
                />

                <Button style={{ backgroundColor:'#3d71c6', color:'#fff' }} fluid size='large' onClick={onClick}>Sign up</Button>
            </Segment>
        </Form>
    </section>
);

class SignUpPage extends Component {
    defaultState = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: '',
        showConfirmation: false,
        failed: false,
        errorMessage: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.defaultState
        };
    }

    componentWillMount() {
        const { history } = this.props;

        Auth.currentAuthenticatedUser()
            .then(data => {
                history.push('/');
            })
            .catch((() => null))
    }

    error = (err) => {
        if(err.message) {
            this.setState({
                failed: true,
                errorMessage: err.message
            })
        }else{
            this.setState({
                failed: true,
                errorMessage: err
            })
        }
    }

    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    signUp = () => {
        const { username, password, email, phone_number } = this.state

        if(username === '') {
            this.error("Username cannot be empty")
        }else if(password === '') {
            this.error("Password cannot be empty")
        }else if(email === '') {
            this.error("Email cannot be empty")
        }else if(phone_number === '') {
            this.error("Phone number cannot be empty")
        }else{
            Auth.signUp({
                username,
                password,
                attributes: {
                  email,
                  phone_number
                }
            })
            .then(() => {
                  // console.log('successful sign up!')
                  this.setState({ showConfirmation: true, failed: false })
            })
            .catch(err => this.error(err))
        }
    }

    confirmSignUp = () => {
        const { history } = this.props;

        Auth.confirmSignUp(this.state.username, this.state.authCode)
            .then(() => history.push('/'))
            .catch(err => this.error(err))
    }

    resendVerificationCode = () => {
        Auth.resendSignUp(this.state.username)
            .catch(err => this.error(err))
    }

    render() {
        const { showConfirmation, failed, errorMessage } = this.state;
        return (
            <div className='login-form'>
                <style>{`
            body > div,
            body > div > div,
            body > div > div > div,
            body > div > div > div > div.login-form {
                height: 100%;
            }
        `}</style>

                <Grid
                    textAlign='center'
                    style={{ height: '100%', maxWidth: '800px', marginLeft:'auto', marginRight:'auto' }}
                    verticalAlign='middle'
                    columns={2}
                >
                    <Grid.Column>
                        <Image src={logo} size='medium' centered style={{ marginBottom: '40px' }} />
                        <Image src={laptop} size='medium' centered />
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h2' style={{ color:'#3d71c6', fontWeight: '400' }} textAlign='center'>
                            Sign up new account
                </Header>
                        {!showConfirmation ? <SignUpForm onClick={this.signUp} 
                                                         onChange={this.onChange}
                                                         failed={failed} 
                                                         errorMessage={errorMessage} /> : <VerificationForm onClick={this.confirmSignUp} 
                                                                                                            onResendClick={this.resendVerificationCode}
                                                                                                            onChange={this.onChange} 
                                                                                                            failed={failed} 
                                                                                                            errorMessage={errorMessage} />}

                        <Message>
                            Have an account? <Link to="/signin"> Sign in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default withRouter(SignUpPage);
