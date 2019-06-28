import gql from "graphql-tag";

export default gql`
query GetFeeds ($nextToken: String){
    getFeeds(limit:10, nextToken: $nextToken) {
        username
        followingIds
        posts {
            items{
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
    }
}`