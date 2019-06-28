import React from 'react'
import logo from '../assets/suw-trans.png'
import { Container,  
         Image,  
         Segment } from 'semantic-ui-react';

const Footer = () => (
    <Segment
        inverted
        vertical
        style={{ margin: '0em', height: '106px', padding: '2em 0em' }}
    >
        <Container textAlign='center'>
            <Image
                centered
                size='mini'
                src={logo}
            />
            <p style={{ color:'#999' }}>no copyright</p>
        </Container>
    </Segment>
)

export default Footer
