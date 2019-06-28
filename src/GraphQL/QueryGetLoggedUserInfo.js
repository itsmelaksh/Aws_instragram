import gql from 'graphql-tag'

export default gql`
query {
    getLoggedUserInfo {
        username
        name
        bio
        email
        phoneNumber
        gender
        country
        createdAt
        profilePic {
            bucket
            region
            key
        }
        followingCount
        followersCount
        postsCount
    }
}`