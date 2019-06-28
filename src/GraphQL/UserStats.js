import gql from "graphql-tag";

export default gql`
query {
    getUserStats {
        username
		followers_count
		friends_count
		posts {
            caption
            createdAt
            id
            likes
			liked
			tags
        }
    }
}`
