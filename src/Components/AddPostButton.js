import React from 'react';
import { Button, Icon } from "semantic-ui-react";

const AddPostButton = ({ onClick }) => (
    <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999'
      }}>
        <Button circular style={{ backgroundColor:'#3d71c6' }} onClick={() => onClick()}>
        <Icon.Group size='large'>
          <Icon name='camera' style={{ color:'#fff' }} />
          <Icon corner name='add' color='green' />
        </Icon.Group>
        </Button>
      </div>
)

export default AddPostButton;