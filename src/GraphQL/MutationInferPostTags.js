import gql from 'graphql-tag';

export default gql`
mutation InferPostTags(
    $postId: String,
    $S3Bucket: String,
    $S3Filename: String,
) {
    inferPostTags(
        postId: $postId,
        S3Bucket: $S3Bucket,
        S3Filename: $S3Filename,
    ) {
        postId
        tags
    }
}`