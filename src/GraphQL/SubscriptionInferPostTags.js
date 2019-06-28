import  gql from "graphql-tag";

export default gql`
subscription {
    newTags {
        postId
        tags
    }
}`;