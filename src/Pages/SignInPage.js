import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment, Image } from "semantic-ui-react";
import logo from '../assets/suw-logo.png';
import laptop from '../assets/Sharing.png';

import VerificationForm from "../Components/VerificationForm";
import FormMessage from '../Components/FormMessage';

const SignInForm = ({ onClick, onChange, success, failed, errorMessage }) => (
    <section>
        <Form size='large'>
            <Segment>
                { success ? <FormMessage positive header="Successful!" body="Signing you in..." /> : null }
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

                <Button style={{ backgroundColor:'#3d71c6', color:'#fff' }} fluid size='large' onClick={onClick}>Sign in</Button>
            </Segment>
        </Form>
    </section>
);

class SignInPage extends Component {

    defaultState = {
        username: '',
        password: '',
        user: {},
        authCode: '',
        showConfirmation: false,
        success: false,
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
        Auth.currentAuthenticatedUser()
            .then(data => {
                window.location.href = "/"
            })
            .catch((() => null))
    }

    onChange = (key, value) => {
        this.setState({ [key]: value })
    }

    success = () => {
        this.setState({
            failed: false,
            success: true
        })
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

    signIn = () => {
        const { username, password } = this.state;

        Auth.signIn(username, password)
            .then(user => {
                this.success()
                setTimeout(() => {
                    if(user.challengeName === "SMS_MFA") {
                        this.setState({ user, showConfirmation: true })
                    } else {
                        window.location.href = "/"
                    }
                }, 500)
            })
            .catch(err => this.error(err))
    }

    confirmSignIn = () => {
        Auth.confirmSignIn(this.state.user, this.state.authCode)
            .then(userData => {
                window.location.href = "/"
            })
            .catch(err => console.log('error confirming sign in!: ', err))
    }

    render() {
        const { showConfirmation, success, failed, errorMessage } = this.state;
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
                            Log-in to your account
                        </Header>
                        {!showConfirmation ? <SignInForm onClick={this.signIn} 
                                                         onChange={this.onChange} 
                                                         success={success} 
                                                         failed={failed} 
                                                         errorMessage={errorMessage} /> : <VerificationForm onClick={this.confirmSignIn} onChange={this.onChange} />}

                        <Message>
                            Don't have an account? <Link to="/signup"> Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignInPage;
