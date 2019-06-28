import gql from "graphql-tag";

export default gql`
query GetUserPosts ($nextToken: String) {
    getUserPosts(limit:10, nextToken:$nextToken) {
        items {
            id
            username
            profilePic {
                bucket
                region
                key
            }
            caption
            createdAt
            likes
            liked
            file {
                bucket
                region
                key
            }
            tags
        }
        nextToken
    }
}`