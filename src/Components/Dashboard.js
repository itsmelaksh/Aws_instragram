import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import { Auth } from 'aws-amplify';

import TopPosts from './TopPosts';
import TopUsers from './TopUsers';
import UserInsights from './UserInsights';

class Dashboard extends Component {
    state = {
        username: '',
        activeItem:'user_insights'
    }

    componentDidMount() {
        Auth.currentUserInfo()
            .then(data => {
                this.setState({
                    username: data.username
                })
            })
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    getInsightComp(compName) {
        const icomps = {
            user_insights: <UserInsights />,
            top_users: <TopUsers/>,
            top_posts: <TopPosts/>,
        }
        return icomps[compName];
    }

    render() {

        const { activeItem } = this.state

        return (
            <div>
                <div>
                    <h1>Welcome to Insights, {this.state.username}</h1>
                </div>

            <Menu>
                <Menu.Item
                  name='user_insights'
                  active={activeItem === 'user_insights'}
                  onClick={this.handleItemClick}>
                  Your Insights
                </Menu.Item>
                <Menu.Item
                  name='top_posts'
                  active={activeItem === 'top_posts'}
                  onClick={this.handleItemClick}>
                  Popular Posts
                </Menu.Item>
                <Menu.Item
                  name='top_users'
                  active={activeItem === 'top_users'}
                  onClick={this.handleItemClick}>
                  Popular Users
                </Menu.Item>
            </Menu>
            <div>{this.getInsightComp(this.state.activeItem)}</div>
            </div>
        )
    }
}


Dashboard = withRouter(Dashboard)
export {
    Dashboard
}
