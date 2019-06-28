import gql from 'graphql-tag';

export default gql`
mutation AddLike($postId: String!) {
    addLike(postId:$postId) {
      username
      postId
    }
}`