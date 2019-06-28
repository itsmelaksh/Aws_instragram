import gql from 'graphql-tag'

export default gql`
query {
    getLoggedUserInfo {
        username
        profilePic {
            bucket
            region
            key
        }
    }
}`