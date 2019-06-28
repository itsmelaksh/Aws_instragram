import gql from "graphql-tag";

export default gql`
query {
    getGlobalStats {
        username
        posts {
            likes
            tags
            caption
        }
    }
}`
