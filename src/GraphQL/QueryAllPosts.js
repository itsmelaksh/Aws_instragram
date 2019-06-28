import gql from "graphql-tag";

export default gql`
query {
    allPosts(limit: 5) {
        items {
            id
            username
            caption
            createdAt
            file {
                bucket
                region
                key
            }
        }
        nextToken
    }
}`