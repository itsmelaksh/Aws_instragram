import gql from 'graphql-tag'

export default gql`
query {
    getFollowers {
      items {
        userInfo {
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