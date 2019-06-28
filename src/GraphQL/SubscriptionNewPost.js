import  gql from "graphql-tag";

export default gql`
subscription {
    newPost {
        __typename
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
}
`;