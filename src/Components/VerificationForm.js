import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import FormMessage from './FormMessage';

const VerificationForm = ({ onClick, onResendClick, onChange, success=false, failed=false, errorMessage='' }) => (
    <section>
        <Form size='large'>
            <Segment>
                <FormMessage header="Verification" body="Verification code will be send to your email shortly." />
                { failed ? <FormMessage negative header="Unsuccessful!" body={errorMessage} /> : null }
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Verification Code'
                    onChange={evt => onChange('authCode', evt.target.value)}
                />

                <Button color='teal' fluid size='large' style={{ marginBottom:'5px' }} onClick={onResendClick}>Resend Code</Button>
                <Button style={{ backgroundColor:'#3d71c6', color:'#fff' }} fluid size='large' onClick={onClick}>Verify</Button>
            </Segment>
        </Form>
    </section>
)

export default VerificationForm;