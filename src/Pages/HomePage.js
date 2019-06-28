import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import HomeFeeds from '../Components/HomeFeeds';

class HomePage extends Component {
  render() {
    return (
      <Container text>
          <HomeFeeds />
      </Container>
    )
  }
}

export default HomePage;
