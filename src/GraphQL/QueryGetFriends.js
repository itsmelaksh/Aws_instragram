import gql from 'graphql-tag'

export default gql`
query {
    getFriends {
      items {
        friendInfo {
          username
          profilePic {
            bucket
            region
            key
          }
          followed
        }
        createdAt
      }
    }
}`