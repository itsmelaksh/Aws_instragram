import React from 'react'
import logo from '../assets/suw-logo.png'
import { Auth } from 'aws-amplify'
import { withRouter, Link } from 'react-router-dom'
import { Container,
    Image,
    Menu,
    Dropdown,
    Icon } from 'semantic-ui-react'

import SearchUsers from "./SearchUsers"
import TopNavMenu from "./TopNavMenu"

const TopNav = ({ history }) => (
    <Menu borderless fixed='top'>
        <Container>
            <Menu.Item as={ Link } to='/' header>
                <Image
                size='small'
                src={logo}
                centered
                />
            </Menu.Item>
            <Menu.Item as={ Link } to='/dashboard'>Insights</Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    <SearchUsers />
                </Menu.Item>
                <Dropdown item trigger={<TopNavMenu />}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={ Link } to='/profile'><Icon name='user' /> My profile</Dropdown.Item>
                        <Dropdown.Item as={ Link } to='/account/edit'><Icon name='settings' /> Account Settings</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                        Auth.signOut()
                            .then(() => {
                                history.push('/signin')
                            })
                            .catch((err) => console.log('error signing out...', err))
                    }}><Icon name="sign out" /> Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Container>
    </Menu>
)

export default withRouter(TopNav);
