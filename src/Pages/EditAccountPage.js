import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import EditProfile from '../Components/EditProfile';
import ChangePassword from '../Components/ChangePassword';

const panes = [
    { menuItem: 'Edit Profile', render: () => <EditProfile /> },
    { menuItem: 'Change Password', render: () => <ChangePassword /> },
]

class EditAccountPage extends Component {
    render() {
        return (
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        )
    }
}

export default EditAccountPage;