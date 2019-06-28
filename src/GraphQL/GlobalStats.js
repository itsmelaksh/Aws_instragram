import gql from "graphql-tag";

export default gql`
query {
    getGlobalStats {
        username
    	followers_count
        friends_count
      	posts_count
    }
}`
