import gql from 'graphql-tag';

export default gql`
mutation RemoveFriend($friendUsername: String!) {
    removeFriend(friendUsername:$friendUsername) {
      username
      friendUsername
    }
}`