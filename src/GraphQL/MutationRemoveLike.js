import gql from 'graphql-tag';

export default gql`
mutation RemoveLike($postId: String!) {
    removeLike(postId:$postId) {
      username
      postId
    }
}`