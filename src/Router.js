import React, { Component } from 'react';
import {
    withRouter,
    Switch,
    Route,
    Redirect,
    BrowserRouter as Router
} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Container } from 'semantic-ui-react';

import AddPost from "./Components/AddPost";
import TopNav from './Components/TopNav';
import Footer from './Components/Footer';

import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import EditAccountPage from './Pages/EditAccountPage';

import {
    Dashboard
} from './Components/Dashboard';

class PrivateRoute extends Component {
    state = {
        loaded: false,
        isAuthenticated: false
    }

    authenticate() {
        Auth.currentAuthenticatedUser()
            .then(() => {
                this.setState({ loaded: true, isAuthenticated: true });
            })
            .catch(() => this.props.history.push('/signin'))
    }

    componentDidMount() {
        this.authenticate();
        this.unlisten = this.props.history.listen(() => {
            Auth.currentAuthenticatedUser()
                // .then(user => console.log('user: ', user))
                .catch(() => {
                    if (this.state.isAuthenticated) this.setState({ isAuthenticated: false })
                })
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { component: Component, ...rest } = this.props
        const { loaded, isAuthenticated } = this.state
        if (!loaded) return null
        return (
            <Route
                {...rest}
                render={props => {
                    return isAuthenticated ? (
                        <div>
                            <TopNav />

                            <Container style={{ padding: '7.5em 0em', minHeight: 'calc(100vh - 106px)' }}>
                                <Component {...props} />
                            </Container>

                            <AddPost />
                            <Footer />
                        </div>
                    ) : (
                        <Redirect to={{ pathname: "/signin", }} />
                    )
                }}
            />
        )
    }
}

PrivateRoute = withRouter(PrivateRoute)

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/signin' component={SignInPage} />
            <Route path='/signup' component={SignUpPage} />
            <PrivateRoute exact path='/' component={HomePage} />
            <PrivateRoute path='/profile' component={ProfilePage} />
            <PrivateRoute path='/account/edit' component={EditAccountPage} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
        </Switch>
    </Router>
)

export default Routes;
