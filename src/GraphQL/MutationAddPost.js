import gql from "graphql-tag";

export default gql`
mutation ($caption: String, $file: S3ObjectInput){
    addPost(
        caption: $caption,
        file: $file
    ) {
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
}`