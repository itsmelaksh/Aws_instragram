import React from 'react'
import { Container } from 'semantic-ui-react';

import AddPost from "../Components/AddPost";
import TopNav from '../Components/TopNav';
import Footer from '../Components/Footer';

const Layout = props => (
    <div>
        <TopNav />
        
        <Container style={{ padding: '7.5em 0em', minHeight: 'calc(100vh - 106px)' }}>
            {props.children}
        </Container>

        <AddPost />
        <Footer />
    </div>
);

export default Layout