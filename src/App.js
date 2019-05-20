import React, { Component } from 'react';
import { useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

//Get configs
import config from './config';

//AppSync and Apollo libraries
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';


//Amplify
import Amplify, { Auth } from 'aws-amplify';

// Components
import Router from './Router';

// Amplify init
Amplify.configure(config);



// AppSync client instantiation
const client = new AWSAppSyncClient({
  disableOffline: true,
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,

    // API_KEY
    apiKey: 'some_key',

    // AWS_IAM
    credentials: () => Auth.currentCredentials(),

    // COGNITO USER POOLS
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
});

class App extends Component {

  async componentWillMount() {
    client.initQueryManager();
    await client.resetStore();
  }

  render() {
    return (
      <Router />
    );
  }
}

export default () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

/*
class App extends Component {
  render() {
    return (
        <div>
          <Router />
        </div>
    );
    //React.DOM.h1("hello");
  }
}

export default App;
*/
