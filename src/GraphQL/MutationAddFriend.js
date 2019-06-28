import gql from 'graphql-tag';

export default gql`
mutation AddFriend($friendUsername: String!) {
    addFriend(friendUsername:$friendUsername) {
      username
      friendUsername
    }
}`