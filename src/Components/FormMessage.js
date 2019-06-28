import React from 'react'
import { Message } from 'semantic-ui-react'

const FormMessage = ({ header, body, positive=false, negative=false }) => (
    <Message positive={positive} negative={negative}>
        <Message.Header>{header}</Message.Header>
        <p>{body}</p>
    </Message>
)

export default FormMessage